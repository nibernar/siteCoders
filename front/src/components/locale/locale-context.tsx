import { createContextId, useContext, useContextProvider, useStore } from "@builder.io/qwik";
import type { Locale, Translations } from "~/types";
import { fr } from "~/locales/fr";
import { en } from "~/locales/en";

export interface LocaleState {
  locale: Locale;
  isDark: boolean;
}

export const LocaleContext = createContextId<LocaleState>("locale-context");

const locales: Record<Locale, Translations> = { fr, en };

function getNestedValue(obj: any, path: string): string {
  const keys = path.split(".");
  let current = obj;
  for (const key of keys) {
    if (current === undefined || current === null) return path;
    current = current[key];
  }
  return typeof current === "string" ? current : path;
}

export function useLocaleProvider(initialLocale: Locale = "fr", initialDark: boolean = false) {
  const state = useStore<LocaleState>({
    locale: initialLocale,
    isDark: initialDark,
  });

  useContextProvider(LocaleContext, state);
  return state;
}

export function useLocale() {
  return useContext(LocaleContext);
}

// Pure function that won't cause serialization issues
export function t(locale: Locale, key: string): string {
  return getNestedValue(locales[locale], key);
}

export function setLocale(state: LocaleState, locale: Locale) {
  state.locale = locale;
  if (typeof document !== "undefined") {
    document.cookie = `coders-locale=${locale};path=/;max-age=${60 * 60 * 24 * 365};SameSite=Lax`;
  }
}

export function toggleTheme(state: LocaleState) {
  state.isDark = !state.isDark;
  if (typeof document !== "undefined") {
    document.cookie = `coders-theme=${state.isDark ? "dark" : "light"};path=/;max-age=${60 * 60 * 24 * 365};SameSite=Lax`;
  }
}
