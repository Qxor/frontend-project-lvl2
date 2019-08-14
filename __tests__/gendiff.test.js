import fs from 'fs';
import gendiff from '../src';

const formatters = ['pretty', 'plain', 'json'];

const getFilesPaths = dataType => (
  [
    `${__dirname}/__fixtures__/${dataType}/before.${dataType}`,
    `${__dirname}/__fixtures__/${dataType}/after.${dataType}`,
  ]
);

const getExpectedText = formatter => fs.readFileSync(`${__dirname}/__fixtures__/outputResults/${formatter}.txt`, 'utf8');

formatters.forEach(formatter => (
  test.each([
    getFilesPaths('json'),
    getFilesPaths('yml'),
    getFilesPaths('ini'),
  ])(`Output = ${formatter}\nFiles:\n> %s\n> %s\n---\n`, (firstFilePath, secondFilePath) => {
    expect(gendiff(firstFilePath, secondFilePath, formatter))
      .toEqual(getExpectedText(formatter));
  })
));
