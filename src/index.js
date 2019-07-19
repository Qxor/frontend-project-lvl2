import path from 'path';
import { parse, defineParser } from './parsers';
import merge from './merge';
import { render, defineRender } from './renders';

const defineFormatOutput = (file1, file2) => {
  const format1 = path.extname(file1).slice(1);
  const format2 = path.extname(file2).slice(1);

  return format1 === format2 ? format1 : 'json';
};

const diff = (first, second, { format }) => {
  const before = parse(first);
  const after = parse(second);

  const merged = merge(before, after);
  const rendered = render(merged, format, defineFormatOutput(first, second));

  console.log(rendered);
  return rendered;
};

export default {
  diff,
  parse,
  defineParser,
  defineRender,
};
