#!/usr/bin/env node
import program from 'commander';
import gendiff from '..';

program
  .version('0.5.2')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format', 'pretty')
  .arguments('<firstConfig> <secondConfig>')
  .action(gendiff.diff);

program.parse(process.argv);
