import { parse, defineParser } from './parsers';
import merge from './merge';
import { render, defineRender } from './renders';

const diff = (first, second, { format }) => {
  const before = parse(first);
  const after = parse(second);

  const merged = merge(before, after);
  const rendered = render(merged, format);

  console.log(rendered);
  return rendered;
};

export default {
  diff,
  defineParser,
  defineRender,
};
