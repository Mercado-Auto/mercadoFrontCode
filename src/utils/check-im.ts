import { ALL_CHAR_EQUALS } from './regexps';

export function checkIM (value: string): boolean {
  if (!value) {
    return false;
  }

  if (typeof value === 'string') {
    value = value.replace(/\-|\./gm, '');
  }

  if (ALL_CHAR_EQUALS.test(value)) {
    return false;
  }

  if (value.length !== 6) {
    return false;
  }

  return true;
}
