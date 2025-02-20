const { makeBadge } = require('badge-maker');
const path = require('path');
const fs = require('fs');
const ReportGenerator = require('lighthouse/report/generator/report-generator');
const { promisify } = require('util');
const { exec } = require('child_process');
const R = require('ramda');
const { statusMessage, urlEscaper } = require('./util');
const { getAverageScore, getSquashedScore, percentageToColor, proceed } = require('./calculations');

// Buffer size for stdout, must be big enough to handle lighthouse CLI output
const maxBuffer = 1024 * 50000;

const metricsToSvg = async (lighthouseMetrics, badgeStyle, precedingLabel, outputPath) => {
  if ( badgeStyle == "pagespeed" ) {
    const pagespeed_svg = proceed(`${lighthouseMetrics['lighthouse performance']}`, `${lighthouseMetrics['lighthouse accessibility']}`, `${lighthouseMetrics['lighthouse best-practices']}`, `${lighthouseMetrics['lighthouse seo']}`, `${lighthouseMetrics['lighthouse pwa']}`);
    const filepath = path.join(outputPath, `pagespeed.svg`);
    fs.writeFile(filepath, pagespeed_svg, (error) => statusMessage(
      `Saved pagespeed_svg to ${filepath}\n`,
      `Failed to save pagespeed_svg to ${outputPath}`,
      error,
    ));
    return false;
    
  } else {
    R.keys(lighthouseMetrics).map((lighthouseMetricKey) => {
      const filepath = path.join(outputPath, `${lighthouseMetricKey.replace(/ /g, '_')}.svg`);
      const badgeColor = percentageToColor(lighthouseMetrics[lighthouseMetricKey]);
      const badgeLabel = precedingLabel + lighthouseMetricKey.charAt(11).toUpperCase() + lighthouseMetricKey.slice(12);

      const svg = makeBadge({
	label: badgeLabel,
	message: `${lighthouseMetrics[lighthouseMetricKey]}%`,
	color: badgeColor,
	style: badgeStyle,
      });

      fs.writeFile(filepath, svg, (error) => statusMessage(
	`Saved svg to ${filepath}\n`,
	`Failed to save svg to ${outputPath}`,
	error,
      ));

      return true;
    });
  }
};

const htmlReportsToFile = async (htmlReports, outputPath) => htmlReports.map((report) => {
  const url = R.head(R.keys(report));
  if (report[url]) {
    const filepath = path.join(outputPath, `${urlEscaper(url)}.html`);
    fs.writeFile(filepath, report[url], (error) => statusMessage(
      `Saved report to ${filepath}\n`,
      `Failed to save report to ${outputPath}`,
      error,
    ));
  }
  return false;
});

const generateArtifacts = async ({ reports, svg, outputPath }) => {
  await Promise.all([
    htmlReportsToFile(reports, outputPath),
    metricsToSvg(svg.results, svg.style, svg.precedingLabel, outputPath),
  ]);
};

const processRawLighthouseResult = async (data, url, shouldSaveReport) => {
  const htmlReport = shouldSaveReport ? ReportGenerator.generateReportHtml(data) : false;
  const { categories } = data;
  const scores = R.keys(categories).map((category) => (
    { [`lighthouse ${category.toLowerCase()}`]: categories[category].score * 100 }
  ));
  const lighthouseMetrics = Object.assign({}, ...scores);
  return { metrics: lighthouseMetrics, report: { [url]: htmlReport } };
};

const calculateLighthouseMetrics = async (url, shouldSaveReport, additionalParams = '') => {
  const lighthouseBinary = path.join(__dirname, '..', 'node_modules', '.bin', 'lighthouse');
  const params = `--chrome-flags='--headless --no-sandbox --disable-gpu --disable-dev-shm-usage --no-default-browser-check --no-first-run --disable-default-apps' --output=json --output-path=stdout --quiet ${additionalParams}`;
  const lighthouseCommand = `${lighthouseBinary} ${params} ${url}`;
  const execPromise = promisify(exec);
  const { stdout } = await execPromise(`${lighthouseCommand}`, { maxBuffer });
  return processRawLighthouseResult(JSON.parse(stdout), url, shouldSaveReport);
};

const processParameters = async (args, func) => {
  const outputPath = args.output_path || process.cwd();

  fs.mkdir(outputPath, { recursive: true }, (err) => {
    if (err) throw err;
  });

  const additionalParams = process.env.LIGHTHOUSE_BADGES_PARAMS || '';
  const results = await Promise.all(args.urls.map(
    (url) => func(url, args.save_report, additionalParams),
  ));

  const metrics = R.pluck('metrics', results);
  const reports = R.pluck('report', results);

  const metricsResults = ( args.single_badge && ( args.badge_style != "pagespeed" ) )
    ? await getSquashedScore(metrics)
    : await getAverageScore(metrics);

  await generateArtifacts({
    reports,
    svg: { results: metricsResults, style: args.badge_style, precedingLabel: args.preceding_label },
    outputPath,
  });
};

module.exports = {
  metricsToSvg,
  htmlReportsToFile,
  processRawLighthouseResult,
  calculateLighthouseMetrics,
  processParameters,
};
