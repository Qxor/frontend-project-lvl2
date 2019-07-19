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

const stringifyJSON = (obj, spacesCount) => {
  const space = ' '.repeat(spacesCount);
  return Object.keys(obj).reduce((acc, key) => acc.concat(`${space}${key}: ${obj[key]}`), '');
};

const renderJSON = (data, spacesCount = 2) => {
  const space = ' '.repeat(spacesCount);

  const result = data.reduce((acc, obj) => {
    const state = getStateView(obj.state);

    if (obj.value instanceof Array) {
      return acc.concat(`\n${space}${state} ${obj.key}: {${renderJSON(obj.value, spacesCount + 4)}\n${space}  }`);
    }
    return typeof obj.value === 'object'
      ? acc.concat(`\n${space}${state} ${obj.key}: {\n${stringifyJSON(obj.value, spacesCount + 6)}\n${space}  }`)
      : acc.concat(`\n${space}${state} ${obj.key}: ${obj.value}`);
  }, '');

  return result;
};

export default data => `{${renderJSON(data)}\n}`;
