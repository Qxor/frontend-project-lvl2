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

test('Compare two .json files. Result = AST', () => {
  expect(merge(parse(beforeJSON), parse(afterJSON))).toEqual(expectedAST);
});

const expectedPrettyText = fs.readFileSync(`${__dirname}/__fixtures__/outputResults/pretty.txt`, 'utf8');

test('Compare two .json files. Output = pretty', () => {
  expect(gendiff.diff(beforeJSON, afterJSON, { format: 'pretty' })).toEqual(expectedPrettyText);
});

test('Compare two .yml files. Output = pretty', () => {
  expect(gendiff.diff(beforeYAML, afterYAML, { format: 'pretty' })).toEqual(expectedPrettyText);
});

test('Compare two .ini files. Output = pretty', () => {
  expect(gendiff.diff(beforeINI, afterINI, { format: 'pretty' })).toEqual(expectedPrettyText);
});

const expectedPlainText = fs.readFileSync(`${__dirname}/__fixtures__/outputResults/plain.txt`, 'utf8');

test('Compare two .json files. Output = plain text', () => {
  expect(gendiff.diff(beforeJSON, afterJSON, { format: 'plain' })).toEqual(expectedPlainText);
});

const expectedJSONText = fs.readFileSync(`${__dirname}/__fixtures__/outputResults/json.txt`, 'utf8');

test('Compare two .json files. Output = json', () => {
  expect(gendiff.diff(beforeJSON, afterJSON, { format: 'json' })).toEqual(expectedJSONText);
});