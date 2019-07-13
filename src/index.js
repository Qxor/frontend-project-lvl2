import parse from './parsers';
import merge from './merge';
import renderJSON from './renders/jsonRender';


export default (first, second) => {
  const before = parse(first);
  const after = parse(second);

  const merged = merge(before, after);

  return renderJSON(merged);
};
