import fs from 'fs';
import path from 'path';
import { parse, defineParser } from './parsers';
import buildAST from './ast';
import { render, defineFormatter } from './formatters';

export const readFile = filePath => (
  {
    body: fs.readFileSync(filePath, 'utf8'),
    type: path.extname(filePath).slice(1),
  });

const diff = (firstConfigPath, secondConfigPath, formatter) => {
  const format = typeof formatter === 'object' ? formatter.format : formatter;

  const first = readFile(firstConfigPath);
  const second = readFile(secondConfigPath);

  const firstJSON = parse(first.body, first.type);
  const secondJSON = parse(second.body, second.type);

  const diffAST = buildAST(firstJSON, secondJSON);

  const rendered = render(diffAST, format);

  console.log(rendered);
  return rendered;
};

export {
  diff,
  defineParser,
  defineFormatter,
};
