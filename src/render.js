import plain from './formatters/plain';
import pretty from './formatters/pretty';

const renders = {
  pretty,
  plain,
  json: JSON.stringify,
};

export const defineRender = (name, func) => {
  renders[name] = func;
};

export const render = (ast, format) => renders[format](ast);
