import plain from './formatters/plain';
import pretty from './formatters/pretty';

const formatters = {
  pretty,
  plain,
  json: JSON.stringify,
};

export const defineFormatter = (name, func) => {
  formatters[name] = func;
};

export const render = (ast, format) => formatters[format](ast);
