import fs from 'fs';
import path from 'path';
import parseConfigToJSON from './parsers';
import buildConfigsDiff from './ast';
import parseToString from './formatters';

export const readConfig = configPath => (
  {
    body: fs.readFileSync(configPath, 'utf8'),
    type: path.extname(configPath).slice(1),
  });

const gendiff = (firstConfigPath, secondConfigPath, formatter) => {
  const format = typeof formatter === 'object' ? formatter.format : formatter;

  const first = readConfig(firstConfigPath);
  const second = readConfig(secondConfigPath);

  const firstJSON = parseConfigToJSON(first.body, first.type);
  const secondJSON = parseConfigToJSON(second.body, second.type);

  const configsDiff = buildConfigsDiff(firstJSON, secondJSON);

  const configsDiffString = parseToString(configsDiff, format);

  console.log(configsDiffString);
  return configsDiffString;
};

export default gendiff;
