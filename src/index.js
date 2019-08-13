import parse from './parsers';
import buildDiff from './ast';
import toString from './formatters';

export default (contentBefore, contentAfter, contentFormat, formatter = 'pretty') => {
  const objBefore = parse(contentBefore, contentFormat);
  const objAfter = parse(contentAfter, contentFormat);

  const diff = buildDiff(objBefore, objAfter);

  return toString(diff, formatter);
};
