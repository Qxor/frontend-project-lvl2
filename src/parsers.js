import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const parseJSON = filePath => JSON.parse(fs.readFileSync(filePath, 'utf8'));

const parseYAML = filePath => yaml.safeLoad(fs.readFileSync(filePath, 'utf8'));

export default (filePath) => {
  if (path.extname(filePath) === '.json') {
    return parseJSON(filePath);
  }
  return parseYAML(filePath);
};
