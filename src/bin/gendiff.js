#!/usr/bin/env node
import program from 'commander';
import gendiff from '..';

program
  .version('0.3.4')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .arguments('<firstConfig> <secondConfig>')
  .action(gendiff);

program.parse(process.argv);
