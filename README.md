# gendiff

[![Maintainability](https://api.codeclimate.com/v1/badges/c8eb65b21d63eec8b91a/maintainability)](https://codeclimate.com/github/Qxor/frontend-project-lvl2/maintainability)
[![Build Status](https://travis-ci.com/Qxor/frontend-project-lvl2.svg?branch=master)](https://travis-ci.com/Qxor/frontend-project-lvl2)

**gendiff** will help you to compare two configuration files and shows a difference.
Opportunities:
* Multi-format support: json, yaml, ini
* Generating a report in the form of plain text, pretty or json

## Installation
  ```sh
  $ npm install gendiff -g
  ```

## Usage
  ```sh
  gendiff [options] <firstConfig> <secondConfig>
  ```
Following options are supported:
  ```sh
  -h, --help           output usage information
  -V, --version        output the version number
  -f, --format [type]  Output format
  ```
Example of usage:
  ```sh
  $ gendiff --format plain first-config.ini second-config.ini

  Setting "common.setting2" deleted.
  Setting "common.setting4" added with value "blah blah".
  Setting "group1.baz" changed from "bas" to "bars".
  Section "group2" deleted.
  ```

![](https://cloclo21.datacloudmail.ru/weblink/view/FBC4/3QA5k3XeU?etag=FBAA6AEEF87E7CED74B14E6B88F142C3E48BA74D&key=212123d36eceba1e1a10e7eff2529b45e85a3201)

## API
**diff (pathFile1, pathFile2, { format })**
```
import gendiff from 'gendiff'

const result = gendiff.diff(`~/Documents/before.json`, `~/Documents/after.json`, { format: 'pretty' });
```

**defineParser (type, func)**
```
import gendiff from 'gendiff'
import parseINI from 'ini'

gendiff.defineParser('ini', parseINI);

const result = gendiff.diff(`~/Documents/before.ini`, `~/Documents/after.ini`, { format: 'pretty' });
```

**defineRender (name, func)**
```
import gendiff from 'gendiff'
import renderTable from 'render'

gendiff.defineParser('table', renderTable);

const result = gendiff.diff(`~/Documents/before.json`, `~/Documents/after.json`, { format: 'table' });
```