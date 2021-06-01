const VALUE_OBJECT_PREFIX = '$(';
const VALUE_OBJECT_SUFIX = ')';
const VALUE_OBJECT_PROP_SPLIT = '.';

/**
 * @returns { fixed: '', component: { id: '', property: '' } }
 */
export function value2property(value) {
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

export function property2value(property) {
  if (!property.component) {
    return property.fixed;
  }
  else {
    return `${VALUE_OBJECT_PREFIX}${property.component.id}${VALUE_OBJECT_PROP_SPLIT}${property.component.property}${VALUE_OBJECT_SUFIX}`;
  }
}
