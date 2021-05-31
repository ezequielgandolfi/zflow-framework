const VALUE_OBJECT_PREFIX = '$(';
const VALUE_OBJECT_SUFIX = ')';
const VALUE_OBJECT_PROP_SPLIT = '.';

function _defineProperty (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
  }
  else {
    obj[key] = value;
  }
  return obj;
}

function _defineProperties (obj, props) {
  Object.keys(props).forEach(key => {
    _defineProperty(obj, key, props[key]);
  });
  return obj;
}

function _setComponentBasicProps(obj, key, desc, shortDesc, props) {
  _defineProperties(obj, {
    key: key,
    description: desc,
    shortDescription: shortDesc,
    properties: props
  });
}

/**
 * @returns { fixed: '', component: { id: '', property: '' } }
 */
function _value2property(value) {
  const property = { fixed: null, component: null };
  value = value || '';
  if (value.startsWith(VALUE_OBJECT_PREFIX) && value.endsWith(VALUE_OBJECT_SUFIX)) {
    const valueFrom = value.substring(VALUE_OBJECT_PREFIX.length, value.length - VALUE_OBJECT_PREFIX.length + 1);
    const valueSplit = valueFrom.split(VALUE_OBJECT_PROP_SPLIT);
    if (valueSplit.length === 2) {
      property.component = { id: valueSplit[0], property: valueSplit[1] };
      return property;
    }
  }
  property.fixed = value;
  return property;
}

function _property2value(property) {
  if (!property.component) {
    return property.fixed;
  }
  else {
    return `${VALUE_OBJECT_PREFIX}${property.component.id}${VALUE_OBJECT_PROP_SPLIT}${property.component.property}${VALUE_OBJECT_SUFIX}`;
  }
}

module.exports = {
  defineProperty: _defineProperty,
  defineProperties: _defineProperties,
  setComponentBasicProps: _setComponentBasicProps,
  value2property: _value2property,
  property2value: _property2value
}
