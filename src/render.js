import * as pretty from './formatters/pretty';
import plain from './formatters/plain';

export default (data, formating, type) => {
  if (formating === 'plain') {
    return plain(data);
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
