#!/usr/bin/env node

const CLI = require('clui');
const { processParameters, calculateLighthouseMetrics } = require('./lighthouse-badges');
const { parser } = require('./argparser');

const handleUserInput = async (spinner) => {
  try {
    if (process.env.LIGHTHOUSE_BADGES_PARAMS) {
      process.stdout.write(`LIGHTHOUSE_BADGES_PARAMS: ${process.env.LIGHTHOUSE_BADGES_PARAMS}\n`);
    }
    spinner.start();
    await processParameters(await parser.parse_args(), calculateLighthouseMetrics);
    spinner.stop();
  } catch (err) {
    process.stderr.write(`${err}\n`);
    process.exit(1);
  }
};

// Only self-invoke if not imported but called directly as executable
(() => !module.parent && handleUserInput(new CLI.Spinner('Running Lighthouse, please wait...', ['◜', '◠', '◝', '◞', '◡', '◟'])))();

module.exports = {
  handleUserInput,
};
