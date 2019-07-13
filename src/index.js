import parse from './parsers';
import merge from './merge';


export default (first, second) => {
  const before = parse(first);
  const after = parse(second);

  const result = merge(before, after);
  console.log(result[0].value);
  return result;
};
