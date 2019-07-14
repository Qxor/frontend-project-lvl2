import renderJSON from './renders/jsonRender';
import renderYAML from './renders/yamlRender';
import renderINI from './renders/iniRendrer';

export default (data, type) => {
  switch (type) {
    case '.ini':
      return renderINI(data);
    case '.yml':
      return renderYAML(data);
    default:
      return renderJSON(data);
  }
};
