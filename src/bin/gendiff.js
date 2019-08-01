#!/usr/bin/env node
import program from 'commander';
import { diff } from '..';

program
  .version('0.6.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format', 'pretty')
  .arguments('<firstConfig> <secondConfig>')
  .action(diff);

program.parse(process.argv);
