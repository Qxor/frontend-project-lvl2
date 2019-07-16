import path from 'path';
import parse from './parsers';
import merge from './merge';
import render from './render';

const defineFormatOutput = (file1, file2) => {
  const format1 = path.extname(file1);
  const format2 = path.extname(file2);

  return format1 === format2 ? format1 : '.json';
};

export default (first, second, formating) => {
  const before = parse(first);
  const after = parse(second);

  const merged = merge(before, after);

  return render(merged, formating, defineFormatOutput(first, second));
};
