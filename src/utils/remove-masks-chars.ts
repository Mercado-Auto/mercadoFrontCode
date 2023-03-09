import * as R from 'ramda';

export const removeMasksChars = (value?: string) => {
  if (!value)
    return ``;

  return value.replace(/-|_|\s|\.|\//gm, ``);
}

export const interactRemoveMasks = <T = Record<string, any>> (value: T, executeOn?: Array<keyof T>): T => {
  const _value: T = R.clone(value);

  const keys = executeOn || Object.keys(_value as Record<string, any>);

  for (const key of keys) {
    if ((_value as Object).hasOwnProperty(key) && typeof (_value as Record<string, any>)[key as string] === 'string') {
      (_value as unknown as Record<string, any>)[key as string]
        = removeMasksChars((_value as unknown as Record<string, any>)[key as string]);
    }
  }

  return _value;
}
