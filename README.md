[![Build Status](https://github.com/emazzotta/lighthouse-badges/workflows/build/badge.svg)](https://github.com/emazzotta/lighthouse-badges/actions)
[![Code Coverage](https://codecov.io/gh/emazzotta/lighthouse-badges/branch/master/graph/badge.svg)](https://github.com/emazzotta/lighthouse-badges/actions)
<a title="Explore it" target="_blank" href="https://snyk.io/test/github/myactionway/lighthouse-badges"><img loading="eager" alt="&nbsp;vulnerabilities pending...&nbsp;"  src="https://img.shields.io/snyk/vulnerabilities/github/myactionway/lighthouse-badges?cacheSeconds=maxAge&logo=snyk" /></a>
<a title="Check it out" target="_blank" href="https://github.com/GoogleChrome/lighthouse"><img src="https://img.shields.io/github/package-json/dependency-version/myactionway/lighthouse-badges/lighthouse?logo=lighthouse" /></a>
[![NPM downloads](https://img.shields.io/npm/dt/lighthouse-badges?color=blue)](https://www.npmjs.org/package/lighthouse-badges)
[![NPM version](https://img.shields.io/npm/v/lighthouse-badges.svg)](https://www.npmjs.org/package/lighthouse-badges)
[![License](http://img.shields.io/:license-mit-blue.svg?style=flat)](https://emanuelemazzotta.com/mit-license) 

# Lighthouse Badges

[![Lighthouse](./assets/img/lighthouse.svg)](https://github.com/GoogleChrome/lighthouse)

This package allows you to easily create Lighthouse badges for all Lighthouse categories.  
Ever wanted to brag about your sites's awesome Lighthouse performance? Then this is the package for you!  

## Examples

### Plastic Badges

[![Lighthouse Performance Badge](./assets/img/scores/lighthouse_performance.svg)](https://github.com/emazzotta/lighthouse-badges)
[![Lighthouse Accessibility Badge](./assets/img/scores/lighthouse_accessibility.svg)](https://github.com/emazzotta/lighthouse-badges)
[![Lighthouse Best Practices Badge](./assets/img/scores/lighthouse_best-practices.svg)](https://github.com/emazzotta/lighthouse-badges)
[![Lighthouse SEO Badge](./assets/img/scores/lighthouse_seo.svg)](https://github.com/emazzotta/lighthouse-badges)
[![Lighthouse PWA Badge](./assets/img/scores/lighthouse_pwa.svg)](https://github.com/emazzotta/lighthouse-badges)

### Single Plastic Badge

[![Lighthouse](./assets/img/scores/lighthouse.svg)](https://github.com/emazzotta/lighthouse-badges)

### Pagespeed Badge | New

[![PageSpeed](./assets/img/scores/pagespeed.svg)](https://github.com/sitdisch/lighthouse-badges)

In this forked version, I, [Sitdisch](https://github.com/sitdisch "Visit me"), added this pagespeed badge. The inserted code is based on the magnificent work of [Ankur Parihar](https://github.com/ankurparihar/readme-pagespeed-insights "Go there") [License: [Apache-2.0](https://github.com/ankurparihar/readme-pagespeed-insights/blob/master/LICENSE "Go there"); Copyright (c) 2021 Ankur Parihar].

## Usage

### Help

```txt
usage: lighthouse-badges [-h] [-v] [-s] [-r]
                         [-b {flat,flat-square,plastic,for-the-badge,pagespeed,social}]
                         [-l "PRECEDING_LABEL "]
                         [-o OUTPUT_PATH]
                         [-u URLS ...]


Generate badges based on lighthouse performance.

Optional arguments:
 -h, --help             Show this help message and exit.
 -v, --version          Show program's version number and exit.
 -s, --single-badge     Output only one single badge averaging all lighthouse
                        categories' scores; not possible for the pagespeed badge
 -b, --badge-style      Define look and feel for the badge.
                        Options: flat, flat-square, plastic, for-the-badge,
                        pagespeed, social [default: flat]
 -l, --preceding-label  Define which label should precede category labels
                        e.g. "" for nothing [default: "Lighthouse "]
 -o, --output-path      Define output path for artifacts
 -r, --save-report      Save lighthouse report as html for every supplied url

Required arguments:
  -u, --urls            The lighthouse badge(s) will contain the respective
                        average score(s) of all the urls supplied, combined
```

Additionally you can pass parameters to the lighthouse process directly via environment variable:

```bash
# This will pass '--preset=desktop' to the lighthouse process
export LIGHTHOUSE_BADGES_PARAMS="--preset=desktop"
lighthouse-badges --urls https://www.youtube.com/
```

### Run

Hint: Only node >= 12 is supported.

#### Option 1: npm
```bash
npm i -g lighthouse-badges
lighthouse-badges --urls https://www.youtube.com/ https://www.youtube.com/feed/trending -o test_results
```

#### Option 2: npx
```bash
npx lighthouse-badges --urls https://www.youtube.com/ https://www.youtube.com/feed/trending -o test_results
```

#### Option 3: Docker
```bash
# Warning, the docker version may alter the lighthouse results
docker run --rm \
    -v $PWD/test_results:/home/chrome/reports \
    emazzotta/lighthouse-badges \
    /bin/sh -c "lighthouse-badges --urls https://www.youtube.com/ https://www.youtube.com/feed/trending"
```

## Contributing

See [contribution guideline](./CONTRIBUTING.md)

## Sponsors

Sponsored by [JetBrains](https://www.jetbrains.com/?from=Lighthouse-Badges)

<a href="https://www.jetbrains.com/?from=Lighthouse-Badges">
  <img alt="Jetbrains Logo" src="./assets/img/jetbrains.svg" height="100">
</a>

## Author

[Emanuele Mazzotta](mailto:hello@mazzotta.me)
