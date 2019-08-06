import plain from './plain';
import pretty from './pretty';

const formatters = {
  pretty,
  plain,
  json: JSON.stringify,
};

export const defineFormatter = (name, func) => {
  formatters[name] = func;
};

export const render = (ast, format) => formatters[format](ast);
