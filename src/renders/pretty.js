export const getStateView = (state) => {
  switch (state) {
    case 'added':
      return '+';
    case 'removed':
      return '-';
    default:
      return ' ';
  }
};

const stringifyObject = (obj, spaces) => {
  const tab = ' '.repeat(spaces);
  const braceTab = ' '.repeat(spaces - 4);

  const result = Object.keys(obj)
    .reduce((acc, key) => {
      const value = obj[key];

      return typeof value === 'object'
        ? acc.concat(`\n${tab}${key}: ${stringifyObject(value, spaces + 4)}`)
        : acc.concat(`\n${tab}${key}: ${value}`);
    }, '');

  return `{${result}\n${braceTab}}`;
};

const renderPretty = (ast, spaces = 2) => {
  const tab = ' '.repeat(spaces);
  const braceTab = ' '.repeat(spaces - 2);

  const result = ast.reduce((acc, property) => {
    const { key, value, state } = property;

    if (value instanceof Array) {
      return acc.concat(`\n${tab}${getStateView(state)} ${key}: ${renderPretty(value, spaces + 4)}`);
    }
    if (typeof value === 'object') {
      return acc.concat(`\n${tab}${getStateView(state)} ${key}: ${stringifyObject(value, spaces + 6)}`);
    }

    return acc.concat(`\n${tab}${getStateView(state)} ${key}: ${value}`);
  }, '');

  return `{${result}\n${braceTab}}`;
};

export default ast => renderPretty(ast);
