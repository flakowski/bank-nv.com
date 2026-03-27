export const locales = ['no', 'en', 'sv', 'da', 'fi', 'it', 'fr', 'et'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'no';
