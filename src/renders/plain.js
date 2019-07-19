// @OUTPUT
// ------------------------------------------------------------
// Property 'timeout' was updated. From 50 to 20 - if was removed && added
// Property 'proxy' was removed - if was only removed
// Property 'common.setting4' was removed - if option has parents
// Property 'common.setting2' was added with value: 200 - if was only added
// Property 'group2' was added with value: [complex value]- if value is object or string with spaces
//
// Property name = if option has parents
// Property state = if was removed && added, if was only removed, if was only added
// Property value = if value is object or string with spaces

const getPropertyValue = (obj) => {
  if (typeof obj.value !== 'object') {
    if (typeof obj.value === 'string' && obj.value.includes(' ')) {
      return `[${obj.value}]`;
    }
    if (typeof obj.value === 'string') {
      return `'${obj.value}'`;
    }
    return `${obj.value}`;
  }

  const result = Object.keys(obj.value).reduce((acc, key) => {
    if (typeof obj[key] !== 'object') {
      return obj.value instanceof String && obj.value.includes(' ')
        ? acc.concat(` ${key}: [${obj.value[key]}],`)
        : acc.concat(` ${key}: ${obj.value[key]},`);
    }
    return acc.concat(getPropertyValue(obj[key]));
  }, '');

  return `{ ${result.slice(1, -1)} }`;
};

const getPropertyState = (property, arrOfObjects) => {
  const doubles = arrOfObjects.filter(obj => obj.key === property.key);

  if (doubles.length > 1) {
    if (property.state !== 'removed') {
      return '';
    }

    const [, propertyDouble] = doubles;

    return `updated. From ${getPropertyValue(property)} to ${getPropertyValue(propertyDouble)}`;
  }

  return property.state === 'added'
    ? `added with value: ${getPropertyValue(property)}`
    : 'removed';
};

const plain = data => data.reduce((acc, rec) => {
  if (rec.value instanceof Array) {
    return acc.concat(plain(rec.value));
  }

  if (rec.state === null) {
    return acc;
  }

  return getPropertyState(rec, data) === ''
    ? acc
    : acc.concat(`Property '${rec.fullName}' was ${getPropertyState(rec, data)}\n`);
}, '');

export default data => plain(data).trim();
