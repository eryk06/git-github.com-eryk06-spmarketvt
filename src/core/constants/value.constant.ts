export const NULL = null;
export const UNDEFINED = void 0;

export const isNull = (value: any): value is null => value === NULL;
export const isUndefined = (value: any): value is void => value === UNDEFINED;
export const isNil = (value: any): value is null | void =>
  isNull(value) || isUndefined(value);
