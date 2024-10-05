import Decimal from 'decimal.js';

export function toDecimal(money: string): Decimal {
  return new Decimal(money ? money.replace(',', '.') : 0);
}

export function numberToString(value: number | Decimal): string {
  return value.toString().replace('.', ',');
}
