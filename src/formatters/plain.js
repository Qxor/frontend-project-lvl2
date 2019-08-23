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

const renderName = (name, ancestry) => (ancestry ? `${ancestry}.${name}` : name);

const renderValue = (value) => {
  const { render } = _.find(valueRenders, item => item.check(value));
  return render(value);
};

const nodesRenders = {
  added: ({ name, value }, ancestry) => `Property '${renderName(name, ancestry)}' was added with value: ${renderValue(value)}`,
  removed: ({ name }, ancestry) => `Property '${renderName(name, ancestry)}' was removed`,
  updated: ({ name, oldValue, newValue }, ancestry) => `Property '${renderName(name, ancestry)}' was updated. From ${renderValue(oldValue)} to ${renderValue(newValue)}`,
  unchanged: () => null,
  nested: ({ name, children }, ancestry, fn) => fn(children, renderName(name, ancestry)),
};

const renderPlain = (ast, ancestry = '') => {
  const result = ast.map((node) => {
    const { type } = node;
    const render = nodesRenders[type];

    return render(node, ancestry, renderPlain);
  });

  return _.compact(result).join('\n');
};

export default ast => renderPlain(ast);
