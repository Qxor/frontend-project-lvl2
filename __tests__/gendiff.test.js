import gendiff from '../src/index';
import fs from 'fs';

const before = `${__dirname}/__fixtures__/0.1.x/before.json`;
const after = `${__dirname}/__fixtures__/0.1.x/after.json`;
const result = fs.readFileSync(`${__dirname}/__fixtures__/0.1.x/result.txt`, 'utf8');

test('compare file1 and file2', () => {
  expect(gendiff(before, after)).toBe(result);
});