export type Locale = "fr" | "en";

export type TranslationKey = string;

export interface Translations {
  [key: string]: string | Translations;
}