import plain from './formatters/plain';
import json from './formatters/json';
import pretty from './formatters/pretty';

const renders = {
  pretty,
  plain,
  json,
};

export const defineRender = (name, func) => {
  renders[name] = func;
};

export const render = (ast, format) => renders[format](ast);
