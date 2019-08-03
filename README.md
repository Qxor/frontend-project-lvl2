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

![](https://cloclo22.datacloudmail.ru/weblink/view/3xvM/5mNaNmD6Z?etag=3EAA89AE00B708BDF981B494D4FCE155B0D94490&key=f2652e2462a549aa2d436281761adf20f31c0836)

## API
**diff (pathFile1, pathFile2, { format })**
```
import gendiff from 'gendiff'

const result = gendiff.diff('~/Documents/before.json', '~/Documents/after.json', 'pretty');
```

**defineParser (type, func)**
```
import gendiff from 'gendiff'
import parseINI from 'ini'

gendiff.defineParser('ini', parseINI);

const result = gendiff.diff('~/Documents/before.ini', '~/Documents/after.ini', 'plain');
```

**defineRender (name, func)**
```
import gendiff from 'gendiff'
import renderTable from 'render'

gendiff.defineParser('table', renderTable);

const result = gendiff.diff('~/Documents/before.json', '~/Documents/after.json', 'table');
```