import type { Language } from '../types'

export const detectUserLanguage = (): Language => {
  const browserLang = navigator.language || navigator.languages?.[0]
  if (browserLang?.startsWith('pt')) {
    return 'pt-BR'
  }
  return 'en-US'
}

