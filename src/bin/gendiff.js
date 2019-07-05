#!/usr/bin/env node
import program from 'commander';

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((first, second) => {
    console.log(`first config = ${first}`);
    console.log(`second config = ${second}`);
  });

program.parse(process.argv);
