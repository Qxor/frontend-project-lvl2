import _ from 'lodash';

const stringifyObject = (obj, spaces = 4) => {
  const tab = ' '.repeat(spaces);
  const braceTab = ' '.repeat(spaces - 4);

  const result = Object.keys(obj)
    .map((key) => {
      const value = obj[key];

      return typeof value === 'object'
        ? `${tab}${key}: ${stringifyObject(value, spaces + 4)}`
        : `${tab}${key}: ${value}`;
    });

  return _.flatten(['{', result, `${braceTab}}`]).join('\n');
};

const renderValue = (value, spaces) => (typeof value === 'object' ? stringifyObject(value, spaces + 6) : value);
const renderTab = spaces => ' '.repeat(spaces);

const nodesRenders = {
  added: ({ name, value }, spaces) => `${renderTab(spaces)}+ ${name}: ${renderValue(value, spaces)}`,
  removed: ({ name, value }, spaces) => `${renderTab(spaces)}- ${name}: ${renderValue(value, spaces)}`,
  updated: ({ name, oldValue, newValue }, spaces) => [`${renderTab(spaces)}- ${name}: ${renderValue(oldValue, spaces)}`, `${renderTab(spaces)}+ ${name}: ${renderValue(newValue, spaces)}`],
  unchanged: ({ name, value }, spaces) => `${renderTab(spaces)}  ${name}: ${renderValue(value, spaces)}`,
  nested: ({ name, children }, spaces, fn) => `${renderTab(spaces)}  ${name}: ${fn(children, spaces + 4)}`,
};

const renderPretty = (ast, spaces = 2) => {
  const braceTab = ' '.repeat(spaces - 2);

  const result = ast.map((node) => {
    const { type } = node;
    const render = nodesRenders[type];

    return render(node, spaces, renderPretty);
  });

  return _.flattenDeep(['{', result, `${braceTab}}`]).join('\n');
};

export default ast => renderPretty(ast);
