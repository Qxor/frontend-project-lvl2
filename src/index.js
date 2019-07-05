import fs from 'fs';
import _ from 'lodash';

export default (first, second) => {
  const before = JSON.parse(fs.readFileSync(first, 'utf8'));
  const after = JSON.parse(fs.readFileSync(second, 'utf8'));

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

  const result = `{\n   ${full.join('\n   ')}\n}`;

  console.log(result);
  return result;
};
