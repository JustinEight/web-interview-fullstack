export const numberFormat = ({
  value,
  locales,
  currency,
}: {
  value: number;
  locales?: Intl.LocalesArgument;
  currency?: string;
}) =>
  new Intl.NumberFormat(locales ?? 'en-US', {
    style: 'currency',
    currency: currency ?? 'USD',
  }).format(value);
