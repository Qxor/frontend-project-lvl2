import _ from 'lodash';

const stringifyObject = (obj, spaces = 4) => {
  const tab = ' '.repeat(spaces);
  const braceTab = ' '.repeat(spaces - 4);

  const result = Object.keys(obj)
    .reduce((acc, key) => {
      const value = obj[key];

      return typeof value === 'object'
        ? [...acc, `${tab}${key}: ${stringifyObject(value, spaces + 4)}`]
        : [...acc, `${tab}${key}: ${value}`];
    }, '');

  return _.flatten(['{', result, `${braceTab}}`]).join('\n');
};

const renderValue = (value, spaces) => (typeof value === 'object' ? stringifyObject(value, spaces + 6) : value);
const renderTab = spaces => ' '.repeat(spaces);

const nodesRenders = {
  added: (name, value, spaces) => `${renderTab(spaces)}+ ${name}: ${renderValue(value, spaces)}`,
  removed: (name, value, spaces) => `${renderTab(spaces)}- ${name}: ${renderValue(value, spaces)}`,
  updated: (name, value, spaces) => [`${renderTab(spaces)}- ${name}: ${renderValue(value.old, spaces)}`, `${renderTab(spaces)}+ ${name}: ${renderValue(value.new, spaces)}`],
  unchanged: (name, value, spaces) => `${renderTab(spaces)}  ${name}: ${renderValue(value, spaces)}`,
  nested: (name, children, spaces, fn) => `${renderTab(spaces)}  ${name}: ${fn(children, spaces + 4)}`,
};

const renderPretty = (ast, spaces = 2) => {
  const braceTab = ' '.repeat(spaces - 2);

  const result = ast.map((node) => {
    const {
      name,
      type,
      children,
      value,
    } = node;

    const render = nodesRenders[type];
    return type === 'nested'
      ? render(name, children, spaces, renderPretty)
      : render(name, value, spaces);
  });

  return _.flattenDeep(['{', result, `${braceTab}}`]).join('\n');
};

export default ast => renderPretty(ast);
