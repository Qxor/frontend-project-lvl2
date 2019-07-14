const stringify = (obj, spacesCount) => {
  const space = ' '.repeat(spacesCount);
  return Object.keys(obj).reduce((acc, key) => acc.concat(`\n${space}${key}: ${obj[key]}`), '');
};

const getStateView = (state) => {
  let str;
  switch (state) {
    case 'added':
      str = '+';
      break;
    case 'removed':
      str = '-';
      break;
    default:
      str = ' ';
  }

  return str;
};

const yamlRender = (data, spacesCount = 0) => {
  const space = ' '.repeat(spacesCount);

  const result = data.reduce((acc, obj) => {
    const state = getStateView(obj.state);

    if (obj.value instanceof Array) {
      return acc.concat(`\n${space}${state} ${obj.key}:${yamlRender(obj.value, spacesCount + 2)}`);
    }
    return typeof obj.value === 'object'
      ? acc.concat(`\n${space}${state} ${obj.key}:${stringify(obj.value, spacesCount + 4)}`)
      : acc.concat(`\n${space}${state} ${obj.key}: ${obj.value}`);
  }, '');

  return result;
};

export default data => yamlRender(data).slice(1);
