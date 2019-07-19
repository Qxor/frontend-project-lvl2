const renderJSON = data => (
  data.reduce((acc, obj) => {
    const state = obj.state === null ? `${obj.state}` : `"${obj.state}"`;

    let value;
    if (obj.value instanceof Array) {
      value = `[${renderJSON(obj.value).slice(0, -1)}]`;
    } else if (typeof obj.value === 'object') {
      value = `${JSON.stringify(obj.value)}`;
    } else {
      value = typeof obj.value === 'boolean' ? `${obj.value}` : `"${obj.value}"`;
    }

    return acc.concat(`{"key":"${obj.key}","fullName":"${obj.fullName}","state":${state},"value":${value}},`);
  }, '')
);

export default data => `[${renderJSON(data).slice(0, -1)}]`;
