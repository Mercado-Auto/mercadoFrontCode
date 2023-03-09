import { ALL_CHAR_EQUALS } from './regexps';

export function checkCPF (value: string): boolean {
  if (!value) {
    return false;
  }

  let sum = 0;
  let rest = 0;

  if (typeof value === 'string') {
    value = value.replace(/\-|\./gm, '');
  }

  if (ALL_CHAR_EQUALS.test(value)) {
    return false;
  }

  if (value.length !== 11) {
    return false;
  }

  for (let i = 1; i <= 9; i++) {
    sum = sum + parseInt(value.substring(i - 1, i), 10) * (11 - i);
  }

  rest = (sum * 10) % 11;

  if (rest === 10 || rest === 11) {
    rest = 0;
  }
  if (rest !== parseInt(value.substring(9, 10), 10)) {
    return false;
  }

  sum = 0;

  for (let i = 1; i <= 10; i++) {
    sum = sum + parseInt(value.substring(i - 1, i), 10) * (12 - i);
  }

  rest = (sum * 10) % 11;

  if (rest === 10 || rest === 11) {
    rest = 0;
  }

  if (rest !== parseInt(value.substring(10, 11), 10)) {
    return false;
  }

  return true;
}
