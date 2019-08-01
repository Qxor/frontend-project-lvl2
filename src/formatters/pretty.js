import _ from 'lodash';

const stringifyObject = (obj, spaces = 4) => {
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

const renderValue = (value, spaces) => (typeof value === 'object' ? stringifyObject(value, spaces + 6) : value);
const renderTab = spaces => ' '.repeat(spaces);

const nodesRenders = [
  {
    type: 'added',
    render: (name, value, spaces) => `${renderTab(spaces)}+ ${name}: ${renderValue(value, spaces)}`,
  },
  {
    type: 'removed',
    render: (name, value, spaces) => `${renderTab(spaces)}- ${name}: ${renderValue(value, spaces)}`,
  },
  {
    type: 'updated',
    render: (name, value, spaces) => `${renderTab(spaces)}- ${name}: ${renderValue(value.old, spaces)}\n${renderTab(spaces)}+ ${name}: ${renderValue(value.new, spaces)}`,
  },
  {
    type: 'unchanged',
    render: (name, value, spaces) => `${renderTab(spaces)}  ${name}: ${renderValue(value, spaces)}`,
  },
  {
    type: 'nested',
    render: (name, value, spaces, fn) => `${renderTab(spaces)}  ${name}: ${fn(value, spaces + 4)}`,
  },
];

const renderPretty = (ast, spaces = 2) => {
  const braceTab = ' '.repeat(spaces - 2);

  const result = ast.reduce((acc, node) => {
    const { name, type, value } = node;
    const { render } = _.find(nodesRenders, item => item.type === type);
    return [...acc, render(name, value, spaces, renderPretty)];
  }, []);

  return `{\n${result.join('\n')}\n${braceTab}}`;
};

export default ast => renderPretty(ast);
