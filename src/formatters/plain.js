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
  added: (name, ancestry, value) => `Property '${renderName(name, ancestry)}' was added with value: ${renderValue(value)}`,
  removed: (name, ancestry) => `Property '${renderName(name, ancestry)}' was removed`,
  updated: (name, ancestry, value) => `Property '${renderName(name, ancestry)}' was updated. From ${renderValue(value.old)} to ${renderValue(value.new)}`,
  unchanged: () => null,
  nested: (name, ancestry, value, fn) => fn(value, renderName(name, ancestry)),
};

const renderPlain = (ast, ancestry = '') => {
  const result = ast.reduce((acc, node) => {
    const {
      name,
      type,
      children,
      value,
    } = node;

    const render = nodesRenders[type];
    const rendered = render(name, ancestry, children || value, renderPlain);

    return rendered ? [...acc, rendered] : acc;
  }, []);

  return result.join('\n');
};

export default ast => renderPlain(ast);
