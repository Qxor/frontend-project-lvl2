import * as original from './formatters/original';
import plain from './formatters/plain';
import json from './formatters/json';
import pretty from './formatters/pretty';

export default (data, format, type) => {
  if (format === 'plain') {
    return plain(data);
  }

  if (format === 'json') {
    return json(data);
  }

  if (format === 'pretty') {
    return pretty(data);
  }

  switch (type) {
    case '.ini':
      return original.INI(data);
    case '.yml':
      return original.YAML(data);
    default:
      return original.JSON(data);
  }
};
