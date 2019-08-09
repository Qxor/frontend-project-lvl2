import fs from 'fs';
import gendiff from '../src';

const formats = ['pretty', 'plain', 'json'];

const getFilesPaths = dataType => (
  [
    `${__dirname}/__fixtures__/${dataType}/before.${dataType}`,
    `${__dirname}/__fixtures__/${dataType}/after.${dataType}`,
  ]
);

const getExpectedText = format => fs.readFileSync(`${__dirname}/__fixtures__/outputResults/${format}.txt`, 'utf8');

formats.forEach(format => (
  test.each([
    getFilesPaths('json'),
    getFilesPaths('yml'),
    getFilesPaths('ini'),
  ])(`Output = ${format}\nFiles:\n> %s\n> %s\n---\n`, (before, after) => (
    expect(gendiff(before, after, format)).toEqual(getExpectedText(format))
  ))
));
