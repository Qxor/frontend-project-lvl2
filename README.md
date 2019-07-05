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

![](https://cloclo5.datacloudmail.ru/weblink/view/2qnq/2mB9UYJqR?etag=031E6A642D0E2D85E4677D8B959AB25A0882FC05&key=5caabe8c5d7f171378367c61d32193ae9acc5bc6)
