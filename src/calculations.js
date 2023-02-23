const R = require('ramda');

const percentageToColor = (percentage) => {
  if (percentage >= 95) return 'brightgreen';
  if (percentage >= 90) return 'green';
  if (percentage >= 75) return 'yellowgreen';
  if (percentage >= 60) return 'yellow';
  if (percentage >= 40) return 'orange';
  return 'red';
};

const getAverageScore = async (metrics) => R.pipe(
  R.head,
  R.keys,
  R.map((category) => (
    { [category]: Math.round(R.sum(R.pluck(category, metrics)) / R.length(metrics)) })),
  R.mergeAll,
)(metrics);

const getSquashedScore = async (metrics) => ({
  lighthouse: R.pipe(
    R.map((metric) => R.sum(R.values(metric))),
    R.sum,
    (x) => (x / (R.length(metrics) * R.length(R.keys(R.head(metrics))))),
    R.curry(Math.round),
  )(metrics),
});

//
// PageSpeed insight functions: guageClass() and proceed()
//
// original repository: readme-pagespeed-insights 
// original author: Ankur Parihar
// original source: https://github.com/ankurparihar/readme-pagespeed-insights
// original license: Apache-2.0
// original copyright (c) 2021 Ankur Parihar

function guageClass(score) {
  if (score >= 90) {
    return 'guage-green'
  }
  else if (score >= 50) {
    return 'guage-orange'
  }
  else if (score >= 0) {
    return 'guage-red'
  }
  return 'guage-undefined'
}

// Function edited by Sitdisch
function proceed(performance, accessibility, best_practices, seo, pwa) {
  let svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="none" width="1000" height="285"><style>.gauge-base{opacity:.1}.gauge-arc{fill:none;animation-delay:250ms;stroke-linecap:round;transform:rotate(-90deg);transform-origin:100px 60px;animation:load-gauge 1s ease forwards}.guage-text{font-size:40px;font-family:monospace;text-align:center}.guage-red{color:#ff4e42;fill:#ff4e42;stroke:#ff4e42}.guage-orange{color:#ffa400;fill:#ffa400;stroke:#ffa400}.guage-green{color:#0cce6b;fill:#0cce6b;stroke:#0cce6b}.guage-undefined{color:#5c5c5c;fill:#5c5c5c;stroke:#5c5c5c}.guage-title{color:#737373;fill:#737373;stroke:none;font-size:26px;line-height:26px;font-family:Roboto,Halvetica,Arial,sans-serif}@keyframes load-gauge{from{stroke-dasharray:0 352.858}}</style><svg class="guage-div guage-perf ${guageClass(performance)}" viewBox="0 0 200 200" width="200" height="200"><circle class="gauge-base" r="56" cx="100" cy="60" stroke-width="8"/><circle class="gauge-arc guage-arc-1" r="56" cx="100" cy="60" stroke-width="8" style="stroke-dasharray:${performance >= 0 ? performance * 351.858 / 100 : 351.858},351.858"/><text class="guage-text" x="100" y="60" alignment-baseline="central" dominant-baseline="central" text-anchor="middle">${performance >= 0 ? performance : 'NA'}</text><text class="guage-title" x="100" y="160" alignment-baseline="central" dominant-baseline="central" text-anchor="middle">Performance</text></svg><svg class="guage-div guage-acc ${guageClass(accessibility)}" viewBox="0 0 200 200" width="200" height="200" x="200"><circle class="gauge-base" r="56" cx="100" cy="60" stroke-width="8"/><circle class="gauge-arc guage-arc-2" r="56" cx="100" cy="60" stroke-width="8" style="stroke-dasharray:${accessibility >= 0 ? accessibility * 351.858 / 100 : 351.858},351.858"/><text class="guage-text" x="100" y="60" alignment-baseline="central" dominant-baseline="central" text-anchor="middle">${accessibility >= 0 ? accessibility : 'NA'}</text><text class="guage-title" x="100" y="160" alignment-baseline="central" dominant-baseline="central" text-anchor="middle">Accessibility</text></svg><svg class="guage-div guage-best ${guageClass(best_practices)}" viewBox="0 0 200 200" width="200" height="200" x="400"><circle class="gauge-base" r="56" cx="100" cy="60" stroke-width="8"/><circle class="gauge-arc guage-arc-3" r="56" cx="100" cy="60" stroke-width="8" style="stroke-dasharray:${best_practices >= 0 ? best_practices * 351.858 / 100 : 351.858},351.858"/><text class="guage-text" x="100" y="60" alignment-baseline="central" dominant-baseline="central" text-anchor="middle">${best_practices >= 0 ? best_practices : 'NA'}</text><text class="guage-title" x="100" y="160" alignment-baseline="central" dominant-baseline="central" text-anchor="middle">Best Practices</text></svg><svg class="guage-div guage-seo ${guageClass(seo)}" viewBox="0 0 200 200" width="200" height="200" x="600"><circle class="gauge-base" r="56" cx="100" cy="60" stroke-width="8"/><circle class="gauge-arc guage-arc-4" r="56" cx="100" cy="60" stroke-width="8" style="stroke-dasharray:${seo >= 0 ? seo * 351.858 / 100 : 351.858},351.858"/><text class="guage-text" x="100" y="60" alignment-baseline="central" dominant-baseline="central" text-anchor="middle">${seo >= 0 ? seo : 'NA'}</text><text class="guage-title" x="100" y="160" alignment-baseline="central" dominant-baseline="central" text-anchor="middle">SEO</text></svg><svg class="guage-div guage-pwa ${guageClass(pwa)}" viewBox="0 0 200 200" width="200" height="200" x="800"><circle class="gauge-base" r="56" cx="100" cy="60" stroke-width="8"/><circle class="gauge-arc guage-arc-4" r="56" cx="100" cy="60" stroke-width="8" style="stroke-dasharray:${pwa >= 0 ? pwa * 351.858 / 100 : 351.858},351.858"/><text class="guage-text" x="100" y="60" alignment-baseline="central" dominant-baseline="central" text-anchor="middle">${pwa >= 0 ? pwa : 'NA'}</text><text class="guage-title" x="100" y="160" alignment-baseline="central" dominant-baseline="central" text-anchor="middle">PWA</text></svg><svg width="604" height="76" x="200" y="210"><path fill="none" id="canvas_background" d="M-1-1h604v80H-1z"/><rect fill-opacity="0" stroke="#616161" stroke-width="2" rx="40" id="svg_2" height="72" width="600" y="2" x="1" fill="#000"/><rect stroke="#000" rx="8" id="svg_3" height="14" width="48" y="30" x="35" stroke-opacity="null" stroke-width="0" fill="#ff4e42"/><rect stroke="#000" rx="6" id="svg_4" height="14" width="48" y="30" x="220" stroke-opacity="null" stroke-width="0" fill="#ffa400"/><rect stroke="#000" rx="6" id="svg_5" height="14" width="48" y="30" x="420" stroke-opacity="null" stroke-width="0" fill="#0cce6b"/><text xml:space="preserve" text-anchor="start" font-family="'Courier New', Courier, monospace" font-size="26" id="svg_6" y="45" x="100" stroke-opacity="null" stroke-width="0" stroke="#000" fill="#737373">0-49</text><text xml:space="preserve" text-anchor="start" font-family="'Courier New', Courier, monospace" font-size="26" id="svg_7" y="45" x="280" stroke-opacity="null" stroke-width="0" stroke="#000" fill="#737373">50-89</text><text xml:space="preserve" text-anchor="start" font-family="'Courier New', Courier, monospace" font-size="26" id="svg_8" y="45" x="480" stroke-opacity="null" stroke-width="0" stroke="#000" fill="#737373">90-100</text></svg></svg>`;
  return svg;
}

module.exports = {
  percentageToColor,
  getAverageScore,
  getSquashedScore,
  proceed,
};
