import type ru from './ru'

export type NormalizeSchema<T> = T extends string
  ? string
  : T extends readonly (infer U)[]
    ? readonly NormalizeSchema<U>[]
    : T extends object
      ? { [K in keyof T]: NormalizeSchema<T[K]> }
      : T

export type MessageSchema = NormalizeSchema<typeof ru>

export type AppLocale = 'ru' | 'kk' | 'en'

export const SUPPORTED_LOCALES: AppLocale[] = ['ru', 'kk', 'en']
export const DEFAULT_LOCALE: AppLocale = 'ru'
