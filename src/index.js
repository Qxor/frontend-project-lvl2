import fs from 'fs';
import path from 'path';
import { parse, defineParser } from './parser';
import buildAST from './ast';
import { render, defineRender } from './render';

export const readConfigs = (firstConfigPath, secondConfigPath) => (
  {
    first: fs.readFileSync(firstConfigPath, 'utf8'),
    second: fs.readFileSync(secondConfigPath, 'utf8'),
  }
);

export const getFilesTypes = (firstConfigPath, secondConfigPath) => (
  {
    firstType: path.extname(firstConfigPath).slice(1),
    secondType: path.extname(secondConfigPath).slice(1),
  }
);

const diff = (firstConfigPath, secondConfigPath, { format }) => {
  const { first, second } = readConfigs(firstConfigPath, secondConfigPath);
  const { firstType, secondType } = getFilesTypes(firstConfigPath, secondConfigPath);

  const firstJSON = parse(first, firstType);
  const secondJSON = parse(second, secondType);

  const diffAST = buildAST(firstJSON, secondJSON);

  const rendered = render(diffAST, format);

  console.log(rendered);
  return rendered;
};

export {
  diff,
  defineParser,
  defineRender,
};
