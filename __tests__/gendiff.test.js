/* eslint no-undef: 0 */

import fs from 'fs';
import buildConfigsDiff from '../src/ast';
import parseConfigToJSON from '../src/parsers';
import gendiff, { readConfig } from '../src/index';

const getJSONFilesPaths = () => (
  [
    `${__dirname}/__fixtures__/json/before.json`,
    `${__dirname}/__fixtures__/json/after.json`,
  ]);

const getYAMLFilesPaths = () => (
  [
    `${__dirname}/__fixtures__/yaml/before.yml`,
    `${__dirname}/__fixtures__/yaml/after.yml`,
  ]);

const getINIFilesPaths = () => (
  [
    `${__dirname}/__fixtures__/ini/before.ini`,
    `${__dirname}/__fixtures__/ini/after.ini`,
  ]);

const getExpectedAST = () => JSON.parse(fs.readFileSync(`${__dirname}/__fixtures__/outputResults/ast.json`, 'utf8'));
const getExpectedPrettyText = () => fs.readFileSync(`${__dirname}/__fixtures__/outputResults/pretty.txt`, 'utf8');
const getExpectedPlainText = () => fs.readFileSync(`${__dirname}/__fixtures__/outputResults/plain.txt`, 'utf8');
const getExpectedJSONText = () => fs.readFileSync(`${__dirname}/__fixtures__/outputResults/json.txt`, 'utf8');

test.each([
  getJSONFilesPaths(),
  getYAMLFilesPaths(),
  getINIFilesPaths(),
])('Output = AST\nFiles:\n> %s\n> %s\n---\n', (before, after) => (
  expect(buildConfigsDiff(parseConfigToJSON(readConfig(before).body, readConfig(before).type),
    parseConfigToJSON(readConfig(after).body, readConfig(after).type))).toEqual(getExpectedAST())
));

test.each([
  getJSONFilesPaths(),
  getYAMLFilesPaths(),
  getINIFilesPaths(),
])('Output = pretty\nFiles:\n> %s\n> %s\n---\n', (before, after) => (
  expect(gendiff(before, after, 'pretty')).toEqual(getExpectedPrettyText())
));

test.each([
  getJSONFilesPaths(),
  getYAMLFilesPaths(),
  getINIFilesPaths(),
])('Output = plain\nFiles:\n> %s\n> %s\n---\n', (before, after) => (
  expect(gendiff(before, after, 'plain')).toEqual(getExpectedPlainText())
));

test.each([
  getJSONFilesPaths(),
  getYAMLFilesPaths(),
  getINIFilesPaths(),
])('Output = json\nFiles:\n> %s\n> %s\n---\n', (before, after) => (
  expect(gendiff(before, after, 'json')).toEqual(getExpectedJSONText())
));

test.each([
  getJSONFilesPaths(),
  getYAMLFilesPaths(),
  getINIFilesPaths(),
])('Format = Object. Output = json\nFiles:\n> %s\n> %s\n---\n', (before, after) => (
  expect(gendiff(before, after, { format: 'json' })).toEqual(getExpectedJSONText())
));
