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

![](https://cloclo19.datacloudmail.ru/weblink/view/4Mr1/4vxYMW1CQ?etag=A6B54DB01EFA5E13FE85981589D23EB5CB96FDEA&key=80d573bb6d7bba6e3e163d3b5f39b88e4c56a1cd)
