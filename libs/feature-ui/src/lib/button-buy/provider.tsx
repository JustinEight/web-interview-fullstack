import { createContext, useMemo } from 'react';

type ButtonBuyContextValues = {
  locales?: Intl.LocalesArgument;
  currency?: string;
};

export const ButtonBuyContext = createContext<ButtonBuyContextValues>({
  locales: 'en-US',
  currency: 'USD',
});

export const ButtonBuyProvider = ({
  children,
  locales,
  currency,
}: {
  children: React.ReactNode;
  locales?: Intl.LocalesArgument;
  currency?: string;
}) => {
  const values = useMemo(
    () => ({
      locales: locales ?? 'en-US',
      currency: currency ?? 'USD',
    }),
    [currency, locales]
  );

  return (
    <ButtonBuyContext.Provider value={values}>
      {children}
    </ButtonBuyContext.Provider>
  );
};
