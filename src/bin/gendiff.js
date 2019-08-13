#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import program from 'commander';
import gendiff from '..';


program
  .version('0.7.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format', 'pretty')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstFilePath, secondFilePath, formatter) => {
    const firstFileContent = fs.readFileSync(firstFilePath, 'utf8');
    const secondFileContent = fs.readFileSync(secondFilePath, 'utf8');

    const contentFormat = path.extname(firstFilePath).slice(1);

    const result = gendiff(firstFileContent, secondFileContent, contentFormat, formatter.format);
    console.log(result);
  });

program.parse(process.argv);
