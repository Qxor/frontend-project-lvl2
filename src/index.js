import _ from 'lodash';
import parse from './parsers';


export default (first, second) => {
  const before = parse(first);
  const after = parse(second);

  const interim = Object.keys(before).reduce((acc, key) => {
    if (_.has(after, key)) {
      return before[key] === after[key]
        ? [...acc, `  ${key}: ${before[key]}`]
        : [...acc, `+ ${key}: ${after[key]}`, `- ${key}: ${before[key]}`];
    }
    return [...acc, `- ${key}: ${before[key]}`];
  }, []);

  const full = Object.keys(after)
    .reduce((acc, key) => (
      _.has(before, key) ? acc : [...acc, `+ ${key}: ${after[key]}`]
    ), interim);

  const result = `{\n  ${full.join('\n  ')}\n}`;

  console.log(result);
  return result;
};
