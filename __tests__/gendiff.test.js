import gendiff from '../src/index';
import fs from 'fs';
import merge from '../src/merge';
import parse from '../src/parsers';

const beforeJSON = `${__dirname}/__fixtures__/json/before.json`;
const afterJSON = `${__dirname}/__fixtures__/json/after.json`;
const expectedJSON = fs.readFileSync(`${__dirname}/__fixtures__/outputResults/jsonOriginal.txt`, 'utf8');

test('Compare two .json files', () => {
  expect(gendiff(beforeJSON, afterJSON, { format: '' })).toEqual(expectedJSON);
});

const beforeYAML = `${__dirname}/__fixtures__/yaml/before.yml`;
const afterYAML = `${__dirname}/__fixtures__/yaml/after.yml`;
const expectedYAML = fs.readFileSync(`${__dirname}/__fixtures__/outputResults/yamlOriginal.txt`, 'utf8');

test('Compare two .yaml files', () => {
  expect(gendiff(beforeYAML, afterYAML, { format: '' })).toEqual(expectedYAML);
});

const beforeINI = `${__dirname}/__fixtures__/ini/before.ini`;
const afterINI = `${__dirname}/__fixtures__/ini/after.ini`;
const expectedINI = fs.readFileSync(`${__dirname}/__fixtures__/outputResults/iniOriginal.txt`, 'utf8');
const expectedAST = JSON.parse(fs.readFileSync(`${__dirname}/__fixtures__/outputResults/ast.json`, 'utf8'));

test('Compare two .ini files', () => {
  expect(gendiff(beforeINI, afterINI, { format: '' })).toEqual(expectedINI);
});
test('Compare two .ini files. Result = AST', () => {
  expect(merge(parse(beforeINI), parse(afterINI))).toEqual(expectedAST);
});


const expectedPlainText = fs.readFileSync(`${__dirname}/__fixtures__/outputResults/plain.txt`, 'utf8');

test('Compare two .ini files. Output = plain text', () => {
  expect(gendiff(beforeINI, afterINI, { format: 'plain' })).toEqual(expectedPlainText);
});
