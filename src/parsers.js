import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';

export default (filePath) => {
  const data = fs.readFileSync(filePath, 'utf8');

  if (path.extname(filePath) === '.json') {
    return JSON.parse(data);
  }
  if (path.extname(filePath) === '.ini') {
    return ini.parse(data);
  }
  return yaml.safeLoad(data);
};
