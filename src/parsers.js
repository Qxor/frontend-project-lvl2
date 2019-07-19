import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';

const parsers = {
  json: JSON.parse,
  ini: ini.parse,
  yml: yaml.safeLoad,
};

export const defineParser = (type, func) => {
  parsers[type] = func;
};

export const parse = (filePath) => {
  const data = fs.readFileSync(filePath, 'utf8');
  const type = path.extname(filePath).slice(1);

  return parsers[type](data);
};
