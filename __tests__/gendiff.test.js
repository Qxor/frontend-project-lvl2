import gendiff from '../src/index';
import fs from 'fs';

const before = `${__dirname}/__fixtures__/before.json`;
const after = `${__dirname}/__fixtures__/after.json`;
const expected = JSON.parse(fs.readFileSync(`${__dirname}/__fixtures__/resultOfMerge.json`, 'utf8'));

test('Compare two .json files. Result = AST', () => {
  expect(gendiff(before, after)).toStrictEqual(expected);
});

/*
const expectedTest1 = fs.readFileSync(`${__dirname}/__fixtures__/results/test1.txt`, 'utf8');
test.each([
    [
      `${__dirname}/__fixtures__/0.1.x/test1/before.json`, 
      `${__dirname}/__fixtures__/0.1.x/test1/after.json`
    ],
    [
      `${__dirname}/__fixtures__/0.2.x/test1/before.yml`, 
      `${__dirname}/__fixtures__/0.2.x/test1/after.yml`
    ],
    [
      `${__dirname}/__fixtures__/0.3.x/test1/before.ini`, 
      `${__dirname}/__fixtures__/0.3.x/test1/after.ini`
    ]
  ])('compare two flat files, v.1', (before, after) => {
    expect(gendiff(before, after)).toBe(expectedTest1);
  },
);

const expectedTest2 = fs.readFileSync(`${__dirname}/__fixtures__/results/test2.txt`, 'utf8');
test.each([
    [
      `${__dirname}/__fixtures__/0.1.x/test2/before.json`, 
      `${__dirname}/__fixtures__/0.1.x/test2/after.json`
    ],
    [
      `${__dirname}/__fixtures__/0.2.x/test2/before.yml`, 
      `${__dirname}/__fixtures__/0.2.x/test2/after.yml`
    ],
    [
      `${__dirname}/__fixtures__/0.3.x/test2/before.ini`, 
      `${__dirname}/__fixtures__/0.3.x/test2/after.ini`
    ]
  ])('compare two flat files, v.2', (before, after) => {
    expect(gendiff(before, after)).toBe(expectedTest2);
  },
);

const expectedTest3 = fs.readFileSync(`${__dirname}/__fixtures__/results/test3.txt`, 'utf8');
test.each([
    [
      `${__dirname}/__fixtures__/0.1.x/test3/before.json`, 
      `${__dirname}/__fixtures__/0.1.x/test3/after.json`
    ],
    [
      `${__dirname}/__fixtures__/0.2.x/test3/before.yml`, 
      `${__dirname}/__fixtures__/0.2.x/test3/after.yml`
    ],
    [
      `${__dirname}/__fixtures__/0.3.x/test3/before.ini`, 
      `${__dirname}/__fixtures__/0.3.x/test3/after.ini`
    ]
  ])('compare two flat yaml files, both are equal', (before, after) => {
    expect(gendiff(before, after)).toBe(expectedTest3);
  },
);
*/
