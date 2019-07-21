import gendiff from '../src/index';
import fs from 'fs';
import merge from '../src/merge';
import { parse } from '../src/parsers';

const beforeJSON = `${__dirname}/__fixtures__/json/before.json`;
const afterJSON = `${__dirname}/__fixtures__/json/after.json`;

const beforeYAML = `${__dirname}/__fixtures__/yaml/before.yml`;
const afterYAML = `${__dirname}/__fixtures__/yaml/after.yml`;

const beforeINI = `${__dirname}/__fixtures__/ini/before.ini`;
const afterINI = `${__dirname}/__fixtures__/ini/after.ini`;

const expectedAST = JSON.parse(fs.readFileSync(`${__dirname}/__fixtures__/outputResults/ast.json`, 'utf8'));
const expectedPrettyText = fs.readFileSync(`${__dirname}/__fixtures__/outputResults/pretty.txt`, 'utf8');
const expectedPlainText = fs.readFileSync(`${__dirname}/__fixtures__/outputResults/plain.txt`, 'utf8');
const expectedJSONText = fs.readFileSync(`${__dirname}/__fixtures__/outputResults/json.txt`, 'utf8');

test('Compare two .json files. Result = AST', () => {
  expect(merge(parse(beforeJSON), parse(afterJSON))).toEqual(expectedAST);
});


test.each([
  [beforeJSON, afterJSON],
  [beforeYAML, afterYAML],
  [beforeINI, afterINI]
])('Output = pretty\nFiles:\n> %s\n> %s\n---\n', (before, after) => (
  expect(gendiff.diff(before, after, { format: 'pretty' })).toEqual(expectedPrettyText)
));

test.each([
  [beforeJSON, afterJSON],
  [beforeYAML, afterYAML],
  [beforeINI, afterINI]
])('Output = plain\nFiles:\n> %s\n> %s\n---\n', (before, after) => (
  expect(gendiff.diff(before, after, { format: 'plain' })).toEqual(expectedPlainText)
));

test.each([
  [beforeJSON, afterJSON],
  [beforeYAML, afterYAML],
  [beforeINI, afterINI]
])('Output = json\nFiles:\n> %s\n> %s\n---\n', (before, after) => (
  expect(gendiff.diff(before, after, { format: 'json' })).toEqual(expectedJSONText)
));