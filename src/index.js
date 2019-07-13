import parse from './parsers';
import merge from './merge';
// import renderJSON from './renders/jsonRender';
import renderYAML from './renders/yamlRender';


export default (first, second) => {
  const before = parse(first);
  const after = parse(second);

  const merged = merge(before, after);

  const result = renderYAML(merged);
  console.log(result);
  return result;
};
