const { ArgumentParser, ONE_OR_MORE } = require('argparse');
const { version } = require('../package.json');

const parser = new ArgumentParser({
  add_help: true,
  description: 'Generate badges based on lighthouse performance.',
});

const requiredArgs = parser.add_argument_group({ title: 'Required arguments' });

parser.add_argument('-v', '--version', {
  action: 'version',
  version,
});

parser.add_argument('-s', '--single-badge', {
  action: 'store_true',
  required: false,
  help: 'Output only one single badge averaging all lighthouse categories\' scores ',
});

parser.add_argument('-b', '--badge-style', {
  action: 'store',
  required: false,
  choices: ['flat', 'flat-square', 'plastic', 'for-the-badge', 'pagespeed', 'social'],
  default: 'flat',
  help: 'Define look and feel for the badge',
});

parser.add_argument('-l', '--preceding-label', {
  action: 'store',
  required: false,
  help: 'Define which label should precede category labels e.g. "" for nothing',
  default: 'Lighthouse '
});

parser.add_argument('-o', '--output-path', {
  action: 'store',
  required: false,
  help: 'Define output path for artifacts',
});

parser.add_argument('-r', '--save-report', {
  action: 'store_true',
  required: false,
  help: 'Save lighthouse report as html for every supplied url',
});

requiredArgs.add_argument('-u', '--urls', {
  action: 'store',
  required: true,
  nargs: ONE_OR_MORE,
  help: 'The lighthouse badge(s) will contain the respective average score(s) of all the urls supplied, combined',
});

module.exports = {
  parser,
};
