const getPropertyValue = (property) => {
  const { value } = property;

  if (typeof value !== 'object') {
    if (typeof value === 'string' && value.includes(' ')) {
      return `[${value}]`;
    }
    if (typeof value === 'string') {
      return `'${value}'`;
    }
    return `${value}`;
  }

  const result = Object.keys(value).reduce((acc, key) => {
    if (typeof property[key] !== 'object') {
      return value instanceof String && value.includes(' ')
        ? acc.concat(` ${key}: [${value[key]}],`)
        : acc.concat(` ${key}: ${value[key]},`);
    }
    return acc.concat(getPropertyValue(property[key]));
  }, '');

  return `{ ${result.slice(1, -1)} }`;
};

const getPropertyState = (property, ast) => {
  const { key, state } = property;
  const doubles = ast.filter(p => p.key === key);

  if (doubles.length > 1) {
    if (state !== 'removed') {
      return '';
    }

    const [, propertyDouble] = doubles;

    return `updated. From ${getPropertyValue(property)} to ${getPropertyValue(propertyDouble)}`;
  }

  return state === 'added'
    ? `added with value: ${getPropertyValue(property)}`
    : 'removed';
};

const plain = ast => ast.reduce((acc, property) => {
  const { fullName, value, state } = property;

  if (value instanceof Array) {
    return acc.concat(plain(value));
  }

  if (state === null) {
    return acc;
  }

  return getPropertyState(property, ast) === ''
    ? acc
    : acc.concat(`Property '${fullName}' was ${getPropertyState(property, ast)}\n`);
}, '');

export default ast => plain(ast).trim();
