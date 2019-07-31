import yaml from 'js-yaml';
import ini from './parsers/iniParser';

const parsers = {
  json: JSON.parse,
  ini,
  yml: yaml.safeLoad,
  yaml: yaml.safeLoad,
};

export const defineParser = (fileType, func) => {
  parsers[fileType] = func;
};

export const parse = (data, fileType) => parsers[fileType](data);
