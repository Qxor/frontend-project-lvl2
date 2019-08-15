import _ from 'lodash';

const keyTypes = [
  {
    type: 'nested',
    check: (first, second, key) => (first[key] instanceof Object && second[key] instanceof Object)
      && !(first[key] instanceof Array && second[key] instanceof Array),
    process: (first, second, fn) => fn(first, second),
  },
  {
    type: 'unchanged',
    check: (first, second, key) => (_.has(first, key) && _.has(second, key)
      && (first[key] === second[key])),
    process: first => first,
  },
  {
    type: 'updated',
    check: (first, second, key) => (_.has(first, key) && _.has(second, key)
      && (first[key] !== second[key])),
    process: (first, second) => ({ old: first, new: second }),
  },
  {
    type: 'removed',
    check: (first, second, key) => (_.has(first, key) && !_.has(second, key)),
    process: first => first,
  },
  {
    type: 'added',
    check: (first, second, key) => (!_.has(first, key) && _.has(second, key)),
    process: (first, second) => second,
  },
];

const buildAST = (firstConfig = {}, secondConfig = {}) => {
  const configsKeys = _.union(Object.keys(firstConfig), Object.keys(secondConfig)).sort();
  return configsKeys.map((key) => {
    const { type, process } = _.find(keyTypes, item => item.check(firstConfig, secondConfig, key));
    const value = process(firstConfig[key], secondConfig[key], buildAST);
    return type === 'nested' ? { name: key, type, children: value } : { name: key, type, value };
  });
};

export default buildAST;
