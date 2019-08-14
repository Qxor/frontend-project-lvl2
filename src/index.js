import fs from 'fs';
import path from 'path';
import parse from './parsers';
import buildDiff from './ast';
import toString from './formatters';

export default (firstFilePath, secondFilePath, formatter = 'pretty') => {
  const contentBefore = fs.readFileSync(firstFilePath, 'utf8');
  const contentAfter = fs.readFileSync(secondFilePath, 'utf8');

  const contentFormat = path.extname(firstFilePath).slice(1);

  const objBefore = parse(contentBefore, contentFormat);
  const objAfter = parse(contentAfter, contentFormat);

  const diff = buildDiff(objBefore, objAfter);

  return toString(diff, formatter);
};
