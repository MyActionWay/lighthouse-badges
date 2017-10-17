[![Build Status](https://travis-ci.org/emazzotta/lighthouse-badges.svg?branch=master)](https://travis-ci.org/emazzotta/lighthouse-badges)
[![Dev Dependencies](https://david-dm.org/emazzotta/lighthouse-badges.svg?style=flat)](https://david-dm.org/emazzotta/lighthouse-badges)
[![Downloads Today](https://img.shields.io/npm/dt/lighthouse-badges.svg?style=flat)](https://badge.fury.io/js/lighthouse-badges)
[![NPM version](https://img.shields.io/npm/v/lighthouse-badges.svg)](https://www.npmjs.org/package/lighthouse-badges)
[![Docker Commit](https://images.microbadger.com/badges/commit/emazzotta/lighthouse-badges.svg)](https://microbadger.com/images/emazzotta/lighthouse-badges)
[![License](http://img.shields.io/:license-mit-blue.svg?style=flat)](https://emanuelemazzotta.com/mit-license) 

# Lighthouse Badges

[![Lighthouse](https://rawgit.com/emazzotta/lighthouse-badges/master/assets/img/lighthouse.svg)](https://github.com/GoogleChrome/lighthouse)

This package allows you to easily create Lighthouse badges for all four Lighthouse categories.  
Ever wanted to brag about your sites's awesome Ligthhouse performance? Then this is the package for you!  

## Example Badges

[![Lighthouse Accessibility Badge](https://rawgit.com/emazzotta/lighthouse-badges/master/assets/examples/Lighthouse_Accessibility.svg)](https://github.com/emazzotta/lighthouse-badges)
[![Lighthouse Best Practices Badge](https://rawgit.com/emazzotta/lighthouse-badges/master/assets/examples/Lighthouse_Best_Practices.svg)](https://github.com/emazzotta/lighthouse-badges)
[![Lighthouse Progressive Web App Badge](https://rawgit.com/emazzotta/lighthouse-badges/master/assets/examples/Lighthouse_Progressive_Web_App.svg)](https://github.com/emazzotta/lighthouse-badges)
[![Lighthouse Performance Badge](https://rawgit.com/emazzotta/lighthouse-badges/master/assets/examples/Lighthouse_Performance.svg)](https://github.com/emazzotta/lighthouse-badges)

## Usage

You have the option to choose between Docker or npm. 

### Help

```bash
usage: lighthouse-badges.js [-h] [-v] [-s] -u URLS [URLS ...]

A simple npm package to generate gh-badges (shields.io) based on lighthouse
performance.

required arguments:
  -u URLS [URLS ...], --urls URLS [URLS ...]
                        the lighthouse badge(s) will contain the respective
                        average score(s) of all the urls supplied, combined

optional arguments:
  -h, --help            Show this help message and exit.
  -v, --version         Show program's version number and exit.
  -s, --single-badge    Only output one single badge averaging the four
                        lighthouse scores
```

### Docker

```bash
# Replace $(pwd) with the badges save path on your host 
docker run \
    -v $(pwd):/badges \
    --cap-add=SYS_ADMIN \
    emazzotta/lighthouse-badges \
    /bin/bash -c "lighthouse-badges --urls https://www.youtube.com/ https://www.youtube.com/feed/trending"
```

### npm 
    
#### Installation

```bash
npm i -g lighthouse-badges
```

#### Usage

```bash
# The badges will be saved in your current directory
lighthouse-badges --urls https://www.youtube.com/ https://www.youtube.com/feed/trending
```

## Author(s)

Emanuele Mazzotta
