import ini from 'ini';

export default (iniFileString) => {
  const parsedINI = ini.parse(iniFileString);

  const iter = obj => (
    Object.keys(obj).reduce((acc, key) => {
      const value = obj[key];

      if (typeof value === 'object') {
        return { ...acc, [key]: iter(value) };
      }

      const intValue = parseInt(value, 10);

      return Number.isNaN(intValue)
        ? { ...acc, [key]: value }
        : { ...acc, [key]: intValue };
    }, {})
  );

  return iter(parsedINI);
};
