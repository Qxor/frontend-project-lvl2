import yaml from 'js-yaml';
import ini from './ini';

const parsers = {
  json: JSON.parse,
  ini,
  yml: yaml.safeLoad,
  yaml: yaml.safeLoad,
};

export const defineParser = (type, func) => {
  parsers[type] = func;
};

export const parse = (data, type) => parsers[type](data);
