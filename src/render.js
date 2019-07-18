import * as pretty from './formatters/pretty';
import plain from './formatters/plain';
import json from './formatters/json';

export default (data, format, type) => {
  if (format === 'plain') {
    return plain(data);
  }

  if (format === 'json') {
    return json(data);
  }

  switch (type) {
    case '.ini':
      return pretty.INI(data);
    case '.yml':
      return pretty.YAML(data);
    default:
      return pretty.JSON(data);
  }
};
