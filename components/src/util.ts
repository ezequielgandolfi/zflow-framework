const VALUE_OBJECT_PREFIX = '$(';
const VALUE_OBJECT_SUFIX = ')';
const VALUE_OBJECT_PROP_SPLIT = '.';

interface Property {
  fixed?: string;
  component?: {
    id: string;
    property: string;
    childProperty?: string;
  }
}

export function value2property(value: string): Property {
  const property: Property = { fixed: null, component: null };
  value = value || '';
  if (value.startsWith(VALUE_OBJECT_PREFIX) && value.endsWith(VALUE_OBJECT_SUFIX)) {
    const valueFrom = value.substring(VALUE_OBJECT_PREFIX.length, value.length - VALUE_OBJECT_PREFIX.length + 1);
    const valueSplit = valueFrom.split(VALUE_OBJECT_PROP_SPLIT);
    if (valueSplit.length >= 2) {
      property.component = { id: valueSplit[0], property: valueSplit[1] };
      if (valueSplit.length >= 3) {
        property.component.childProperty = valueSplit[2];
      }
      return property;
    }
  }
  property.fixed = value;
  return property;
}

export function property2value(property: Property): string {
  if (!property.component) {
    return property.fixed;
  }
  else {
    const _child = property.component.childProperty ? `${VALUE_OBJECT_PROP_SPLIT}${property.component.childProperty}` : '';
    return `${VALUE_OBJECT_PREFIX}${property.component.id}${VALUE_OBJECT_PROP_SPLIT}${property.component.property}${_child}${VALUE_OBJECT_SUFIX}`;
  }
}
