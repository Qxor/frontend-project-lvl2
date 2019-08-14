#!/usr/bin/env node
import program from 'commander';
import genDiff from '..';


program
  .version('0.7.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format', 'pretty')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstFilePath, secondFilePath, formatter) => {
    const filesDifference = genDiff(firstFilePath, secondFilePath, formatter.format);

    console.log(filesDifference);
  });

program.parse(process.argv);
