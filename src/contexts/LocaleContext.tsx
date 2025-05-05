import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Locale, LocaleContent } from '../types';
import { en, fr } from '../locales';

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: LocaleContent;
}

const locales: Record<Locale, LocaleContent> = {
  en,
  fr,
};

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export const LocaleProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocale] = useState<Locale>('fr');

  return (
    <LocaleContext.Provider
      value={{
        locale,
        setLocale,
        t: locales[locale],
      }}
    >
      {children}
    </LocaleContext.Provider>
  );
};

export const useLocale = () => {
  const context = useContext(LocaleContext);
  
  if (context === undefined) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  
  return context;
};