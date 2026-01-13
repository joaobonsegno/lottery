import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Language } from '../../types'

interface LanguageSelectorProps {
  language: Language
  onLanguageChange: (language: Language) => void
}

interface LanguageOption {
  code: Language
  flag: string
  name: string
  region: string
}

const languages: LanguageOption[] = [
  { code: 'en-US', flag: '🇺🇸', name: 'English', region: 'United States' },
  { code: 'pt-BR', flag: '🇧🇷', name: 'Português', region: 'Brasil' },
]

export const LanguageSelector = ({ language, onLanguageChange }: LanguageSelectorProps) => {
  const [showMenu, setShowMenu] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const currentLanguage = languages.find(lang => lang.code === language)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false)
      }
    }

    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showMenu])

  const handleLanguageSelect = (langCode: Language) => {
    onLanguageChange(langCode)
    setShowMenu(false)
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="flex items-center gap-2 bg-white/90 hover:bg-white backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg transition-all hover:scale-105 active:scale-95"
        aria-label="Select language"
      >
        <span className="text-2xl" aria-hidden="true">
          {currentLanguage?.flag}
        </span>
        <span className="text-sm font-semibold text-gray-700">
          {language === 'en-US' ? 'EN' : 'PT'}
        </span>
        <svg
          className={`w-4 h-4 text-gray-700 transition-transform ${showMenu ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl overflow-hidden z-10"
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageSelect(lang.code)}
                className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-purple-50 transition-colors ${
                  language === lang.code ? 'bg-purple-100' : ''
                }`}
                aria-label={`Select ${lang.name}`}
              >
                <span className="text-2xl" aria-hidden="true">
                  {lang.flag}
                </span>
                <div className="flex-1 text-left">
                  <div className="font-semibold text-gray-800">{lang.name}</div>
                  <div className="text-xs text-gray-500">{lang.region}</div>
                </div>
                {language === lang.code && (
                  <svg 
                    className="w-5 h-5 text-purple-600" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

