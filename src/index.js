import parse from './parsers';
import merge from './merge';
// import renderJSON from './renders/jsonRender';
// import renderYAML from './renders/yamlRender';
import renderINI from './renders/iniRendrer';


export default (first, second) => {
  const before = parse(first);
  const after = parse(second);

  const merged = merge(before, after);

  const result = renderINI(merged);
  console.log(result);
  return result;
};
