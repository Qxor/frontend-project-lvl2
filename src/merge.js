const merge = (before, after) => {
  const mergeKeys = (keys1, keys2) => {
    const common = keys1.concat(keys2);
    return common
      .reduce((acc, key) => (acc.includes(key) ? acc : [...acc, key]), [])
      .sort();
  };

  const keysBefore = Object.keys(before);
  const keysAfter = Object.keys(after);

  return mergeKeys(keysBefore, keysAfter).reduce((acc, key) => {
    if (keysBefore.includes(key) && keysAfter.includes(key)) {
      if (typeof before[key] === 'object' && typeof after[key] === 'object') {
        return [...acc, { key, state: null, value: merge(before[key], after[key]) }];
      }
      return before[key] === after[key]
        ? [...acc, { key, state: null, value: before[key] }]
        : [...acc, { key, state: 'removed', value: before[key] }, { key, state: 'added', value: after[key] }];
    }
    return keysBefore.includes(key)
      ? [...acc, { key, state: 'removed', value: before[key] }]
      : [...acc, { key, state: 'added', value: after[key] }];
  }, []);
};

export default merge;
