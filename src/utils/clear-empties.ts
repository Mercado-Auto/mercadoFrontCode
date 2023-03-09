import { reject, anyPass, isEmpty, isNil } from "ramda";

const rejectEmpties = reject(anyPass([isEmpty, isNil]));

export function clearEmpties<T = any> (o: T): NonNullable<T> {
  return rejectEmpties(o as any);
}
