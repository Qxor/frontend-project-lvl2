import fs from 'fs';
import path from 'path';
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
    const firstFileContent = fs.readFileSync(firstFilePath, 'utf8');
    const secondFileContent = fs.readFileSync(secondFilePath, 'utf8');

    const contentFormat = path.extname(firstFilePath).slice(1);

    expect(gendiff(firstFileContent, secondFileContent, contentFormat, formatter))
      .toEqual(getExpectedText(formatter));
  })
));
