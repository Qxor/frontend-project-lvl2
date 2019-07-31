// import gendiff from '../src/index';
import fs from 'fs';
import buildAST from '../src/ast';
import { parse } from '../src/parser';
import { getFilesTypes, readConfigs } from '../src/index';

const expectedAST = JSON.parse(fs.readFileSync(`${__dirname}/__fixtures__/outputResults/ast.json`, 'utf8'));

const beforeJSON = `${__dirname}/__fixtures__/json/before.json`;
const afterJSON = `${__dirname}/__fixtures__/json/after.json`;

const beforeYAML = `${__dirname}/__fixtures__/yaml/before.yml`;
const afterYAML = `${__dirname}/__fixtures__/yaml/after.yml`;

const beforeINI = `${__dirname}/__fixtures__/ini/before.ini`;
const afterINI = `${__dirname}/__fixtures__/ini/after.ini`;

// const expectedAST = JSON.parse(fs.readFileSync(`${__dirname}/__fixtures__/outputResults/ast.json`, 'utf8'));
// const expectedPrettyText = fs.readFileSync(`${__dirname}/__fixtures__/outputResults/pretty.txt`, 'utf8');
// const expectedPlainText = fs.readFileSync(`${__dirname}/__fixtures__/outputResults/plain.txt`, 'utf8');
// const expectedJSONText = fs.readFileSync(`${__dirname}/__fixtures__/outputResults/json.txt`, 'utf8');

test.each([
  [beforeJSON, afterJSON],
  [beforeYAML, afterYAML],
  [beforeINI, afterINI]
])('Output = AST\nFiles:\n> %s\n> %s\n---\n', (before, after) => (
  expect(buildAST(parse(readConfigs(before, after).first, getFilesTypes(before, after).firstType),
    parse(readConfigs(before, after).second, getFilesTypes(before, after).secondType))).toEqual(expectedAST)
));

/*
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
*/