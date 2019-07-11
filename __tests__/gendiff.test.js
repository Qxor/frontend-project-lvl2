import gendiff from '../src/index';
import fs from 'fs';

test('compare two flat json files, v.1', () => {
  const before = `${__dirname}/__fixtures__/0.1.x/test1/before.json`;
  const after = `${__dirname}/__fixtures__/0.1.x/test1/after.json`;
  const result = fs.readFileSync(`${__dirname}/__fixtures__/0.1.x/test1/result.txt`, 'utf8');
  expect(gendiff(before, after)).toBe(result);
});

test('compare two flat json files, v.2', () => {
  const before = `${__dirname}/__fixtures__/0.1.x/test2/before.json`;
  const after = `${__dirname}/__fixtures__/0.1.x/test2/after.json`;
  const result = fs.readFileSync(`${__dirname}/__fixtures__/0.1.x/test2/result.txt`, 'utf8');
  expect(gendiff(before, after)).toBe(result);
});

test('compare two flat json files, both are equal', () => {
  const before = `${__dirname}/__fixtures__/0.1.x/test3/before.json`;
  const after = `${__dirname}/__fixtures__/0.1.x/test3/after.json`;
  const result = fs.readFileSync(`${__dirname}/__fixtures__/0.1.x/test3/result.txt`, 'utf8');
  expect(gendiff(before, after)).toBe(result);
});

test('compare two flat yaml files, v.1', () => {
  const before = `${__dirname}/__fixtures__/0.2.x/test1/before.yml`;
  const after = `${__dirname}/__fixtures__/0.2.x/test1/after.yml`;
  const result = fs.readFileSync(`${__dirname}/__fixtures__/0.2.x/test1/result.txt`, 'utf8');
  expect(gendiff(before, after)).toBe(result);
});

test('compare two flat yaml files, v.2', () => {
  const before = `${__dirname}/__fixtures__/0.2.x/test2/before.yml`;
  const after = `${__dirname}/__fixtures__/0.2.x/test2/after.yml`;
  const result = fs.readFileSync(`${__dirname}/__fixtures__/0.2.x/test2/result.txt`, 'utf8');
  expect(gendiff(before, after)).toBe(result);
});

test('compare two flat yaml files, both are equal', () => {
  const before = `${__dirname}/__fixtures__/0.2.x/test3/before.yml`;
  const after = `${__dirname}/__fixtures__/0.2.x/test3/after.yml`;
  const result = fs.readFileSync(`${__dirname}/__fixtures__/0.2.x/test3/result.txt`, 'utf8');
  expect(gendiff(before, after)).toBe(result);
});