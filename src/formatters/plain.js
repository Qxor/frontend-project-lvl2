import _ from 'lodash';

const valueRenders = [
  {
    check: value => typeof value === 'string' && value.includes(' '),
    render: value => `[${value}]`,
  },
  {
    check: value => typeof value === 'string',
    render: value => `'${value}'`,
  },
  {
    check: value => typeof value !== 'string' && typeof value !== 'object',
    render: value => `${value}`,
  },
  {
    check: value => typeof value === 'object',
    render: () => '[complex value]',
  },
];

const renderName = (name, parent) => (parent ? `${parent}.${name}` : name);

const renderValue = (value) => {
  const { render } = _.find(valueRenders, item => item.check(value));
  return render(value);
};

const nodesRenders = {
  added: (name, parent, value) => `Property '${renderName(name, parent)}' was added with value: ${renderValue(value)}`,
  removed: (name, parent) => `Property '${renderName(name, parent)}' was removed`,
  updated: (name, parent, value) => `Property '${renderName(name, parent)}' was updated. From ${renderValue(value.old)} to ${renderValue(value.new)}`,
  unchanged: () => null,
  nested: (name, parent, value, fn) => fn(value, renderName(name, parent)),
};

const renderPlain = (ast, parent = '') => {
  const result = ast.reduce((acc, node) => {
    const { name, type, value } = node;
    const render = nodesRenders[type];

    const rendered = render(name, parent, value, renderPlain);

    return rendered ? [...acc, rendered] : acc;
  }, []);

  return result.join('\n');
};

export default ast => renderPlain(ast);
