import original from './renders/original';
import plain from './renders/plain';
import json from './renders/json';
import pretty from './renders/pretty';

const renders = {
  pretty,
  plain,
  json,
  original,
};

export const defineRender = (name, func) => {
  renders[name] = func;
};

export const render = (data, format, type) => renders[format](data, type);
