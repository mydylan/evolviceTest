export const setProp = ( object, keys, val ) => {
  keys = Array.isArray(keys) ? keys : keys.split('.');
  if (keys.length > 1) {
    object[keys[0]] = object[keys[0]] || {};
    return setProp(object[keys[0]], keys.slice(1), val);
  }
  object[keys[0]] = val;
}

export const getProp = ( object, keys, defaultVal ) => {
  keys = Array.isArray(keys) ? keys : keys.split('.');
  object = object[keys[0]];
  if (object && keys.length > 1){
    return getProp(object, keys.slice(1));
  }
  return object === undefined ? defaultVal : object;
}
