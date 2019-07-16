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

// ---JSON

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

// ---YAML

const stringifyYAML = (obj, spacesCount) => {
  const space = ' '.repeat(spacesCount);
  return Object.keys(obj).reduce((acc, key) => acc.concat(`\n${space}${key}: ${obj[key]}`), '');
};


const yamlRender = (data, spacesCount = 0) => {
  const space = ' '.repeat(spacesCount);

  const result = data.reduce((acc, obj) => {
    const state = getStateView(obj.state);

    if (obj.value instanceof Array) {
      return acc.concat(`\n${space}${state} ${obj.key}:${yamlRender(obj.value, spacesCount + 2)}`);
    }
    return typeof obj.value === 'object'
      ? acc.concat(`\n${space}${state} ${obj.key}:${stringifyYAML(obj.value, spacesCount + 4)}`)
      : acc.concat(`\n${space}${state} ${obj.key}: ${obj.value}`);
  }, '');

  return result;
};

// ---INI

const stringifyINI = obj => Object.keys(obj).reduce((acc, key) => acc.concat(`  ${key} = ${obj[key]}`), '');


const sort = (arr) => {
  const part = arr.reduce((acc, rec) => (
    typeof rec.value === 'object'
      ? acc
      : [...acc, rec]
  ), []);

  const part2 = arr.reduce((acc, rec) => (
    typeof rec.value === 'object'
      ? [...acc, rec]
      : acc
  ), []);

  return [...part, ...part2];
};

const renderINI = (data, group = '') => (
  sort(data)
    .reduce((acc, obj) => {
      const state = getStateView(obj.state);

      if (obj.value instanceof Array) {
        return group
          ? acc.concat(`\n\n${state} [${group}.${obj.key}]${renderINI(obj.value, `${group}.${obj.key}`)}`)
          : acc.concat(`\n\n${state} [${obj.key}]${renderINI(obj.value, `${obj.key}`)}`);
      }
      if (typeof obj.value === 'object') {
        return group
          ? acc.concat(`\n\n${state} [${group}.${obj.key}]\n${stringifyINI(obj.value)}`)
          : acc.concat(`\n\n${state} [${obj.key}]\n${stringifyINI(obj.value)}`);
      }
      return acc.concat(`\n${state} ${obj.key} = ${obj.value}`);
    }, '')
);


export const JSON = data => `{${renderJSON(data)}\n}`;
export const YAML = data => yamlRender(data).slice(1);
export const INI = data => renderINI(data).slice(2);
