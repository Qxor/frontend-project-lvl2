const stringify = obj => Object.keys(obj).reduce((acc, key) => acc.concat(`  ${key} = ${obj[key]}`), '');

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

const renderINI = (data, group = '') => {
  const result = data.reduce((acc, obj) => {
    const state = getStateView(obj.state);

    if (obj.value instanceof Array) {
      return group
        ? acc.concat(`\n\n${state} [${group}.${obj.key}]${renderINI(obj.value, `${group}.${obj.key}`)}`)
        : acc.concat(`\n\n${state} [${obj.key}]${renderINI(obj.value, `${obj.key}`)}`);
    }
    if (typeof obj.value === 'object') {
      return group
        ? acc.concat(`\n\n${state} [${group}.${obj.key}]\n${stringify(obj.value)}`)
        : acc.concat(`\n\n${state} [${obj.key}]\n${stringify(obj.value)}`);
    }
    return acc.concat(`\n${state} ${obj.key} = ${obj.value}`);
  }, '');

  return result;
};

export default data => renderINI(data).slice(2);
