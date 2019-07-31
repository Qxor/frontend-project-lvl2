const stringifyObject = (obj) => {
  const result = Object.keys(obj).reduce((acc, key) => {
    if (typeof obj[key] === 'object') {
      return acc.concat(`"${key}":${stringifyObject(obj[key])},`);
    }

    return typeof obj[key] === 'boolean'
      ? acc.concat(`"${key}":${obj[key]},`)
      : acc.concat(`"${key}":"${obj[key]}",`);
  }, '');

  return `{${result.slice(0, -1)}}`;
};

const renderJSON = ast => (
  ast.reduce((acc, property) => {
    const {
      key,
      state,
      value,
    } = property;

    let valueString;
    if (value instanceof Array) {
      valueString = `[${renderJSON(value).slice(0, -1)}]`;
    } else if (typeof value === 'object') {
      valueString = `${stringifyObject(value)}`;
    } else {
      valueString = typeof value === 'boolean' ? `${value}` : `"${value}"`;
    }

    return acc.concat(`{"key":"${key}","state":${state},"value":${valueString}},`);
  }, '')
);

export default ast => `[${renderJSON(ast).slice(0, -1)}]`;
