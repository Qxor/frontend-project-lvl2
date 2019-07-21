const renderJSON = ast => (
  ast.reduce((acc, property) => {
    const {
      key,
      fullName,
      state,
      value,
    } = property;

    const stateString = state === null ? `${state}` : `"${state}"`;

    let valueString;
    if (value instanceof Array) {
      valueString = `[${renderJSON(value).slice(0, -1)}]`;
    } else if (typeof value === 'object') {
      valueString = `${JSON.stringify(value)}`;
    } else {
      valueString = typeof value === 'boolean' ? `${value}` : `"${value}"`;
    }

    return acc.concat(`{"key":"${key}","fullName":"${fullName}","state":${stateString},"value":${valueString}},`);
  }, '')
);

export default ast => `[${renderJSON(ast).slice(0, -1)}]`;
