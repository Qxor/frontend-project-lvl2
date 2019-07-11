import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

export default (filePath) => {
  if (path.extname(filePath) === '.json') {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  }
  return yaml.safeLoad(fs.readFileSync(filePath, 'utf8'));
};
