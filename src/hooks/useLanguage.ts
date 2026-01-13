import { useState, useEffect } from 'react'
import type { Language } from '../types'
import { LANGUAGE_KEY } from '../constants/storage'
import { detectUserLanguage } from '../i18n/languageDetection'
import { translations } from '../i18n/translations'

export const useLanguage = () => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem(LANGUAGE_KEY)
    if (saved === 'en-US' || saved === 'pt-BR') {
      return saved
    }
    return detectUserLanguage()
  })

  useEffect(() => {
    localStorage.setItem(LANGUAGE_KEY, language)
  }, [language])

  const t = translations[language]

  return { language, setLanguage, t }
}

