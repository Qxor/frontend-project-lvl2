import plain from './renders/plain';
import json from './renders/json';
import pretty from './renders/pretty';

const renders = {
  pretty,
  plain,
  json,
};

export const defineRender = (name, func) => {
  renders[name] = func;
};

export const render = (ast, format) => renders[format](ast);
