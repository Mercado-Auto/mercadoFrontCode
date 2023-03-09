import { conformToMask } from 'react-text-mask';

export function maskToIM (value: string): string {
  return conformToMask(value, [
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/
  ]).conformedValue;
}

export function maskToCEP (value: string): string {
  return conformToMask(value, [
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
    /\d/,
  ]).conformedValue;
}

export function maskToPhone (value: string): string {
  return conformToMask(value, [
    '(',
    /\d/,
    /\d/,
    ')',
    ' ',
    /\d/,
    ' ',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
    /\d/,
  ]).conformedValue;
}

export function maskToCNPJ (value: string): string {
  return conformToMask(value, [
    /\d/,
    /\d/,
    '.',
    /\d/,
    /\d/,
    /\d/,
    '.',
    /\d/,
    /\d/,
    /\d/,
    '/',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
  ]).conformedValue;
}
