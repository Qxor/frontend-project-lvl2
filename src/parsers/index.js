import yaml from 'js-yaml';
import ini from './ini';

const parsers = {
  json: JSON.parse,
  ini,
  yml: yaml.safeLoad,
  yaml: yaml.safeLoad,
};

export default (data, type) => parsers[type](data);
