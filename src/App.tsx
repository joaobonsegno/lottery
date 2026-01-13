import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const STORAGE_KEY = 'lottery-names'
const LANGUAGE_KEY = 'lottery-language'

type Language = 'en-US' | 'pt-BR'

interface Translations {
  title: string
  subtitle: string
  enterNames: string
  namesCount: (count: number) => string
  placeholder: string
  numberOfWinners: string
  drawButton: string
  drawing: string
  winner: string
  winners: string
  alertNoNames: string
  alertTooManyWinners: (requested: number, available: number) => string
}

const translations: Record<Language, Translations> = {
  'en-US': {
    title: '🎲 Name Lottery',
    subtitle: 'Add names and let fate decide!',
    enterNames: 'Enter Names',
    namesCount: (count: number) => `${count} name${count !== 1 ? 's' : ''}`,
    placeholder: 'Enter names separated by commas or line breaks\ne.g., John, Sarah, Mike\nor one name per line',
    numberOfWinners: 'Number of Winners',
    drawButton: '🎯 DRAW WINNERS',
    drawing: 'Drawing...',
    winner: 'Winner',
    winners: 'Winners',
    alertNoNames: 'Please add some names first!',
    alertTooManyWinners: (requested: number, available: number) => 
      `You can't select more winners (${requested}) than available names (${available})!`,
  },
  'pt-BR': {
    title: '🎲 Sorteio de Nomes',
    subtitle: 'Adicione nomes e deixe o destino decidir!',
    enterNames: 'Digite os Nomes',
    namesCount: (count: number) => `${count} nome${count !== 1 ? 's' : ''}`,
    placeholder: 'Digite nomes separados por vírgulas ou quebras de linha\nex: João, Maria, Pedro\nou um nome por linha',
    numberOfWinners: 'Número de Vencedores',
    drawButton: '🎯 SORTEAR VENCEDORES',
    drawing: 'Sorteando...',
    winner: 'Vencedor',
    winners: 'Vencedores',
    alertNoNames: 'Por favor, adicione alguns nomes primeiro!',
    alertTooManyWinners: (requested: number, available: number) => 
      `Você não pode selecionar mais vencedores (${requested}) do que nomes disponíveis (${available})!`,
  },
}

const detectUserLanguage = (): Language => {
  const browserLang = navigator.language || navigator.languages?.[0]
  if (browserLang?.startsWith('pt')) {
    return 'pt-BR'
  }
  return 'en-US'
}

function App() {
  // Initialize language from localStorage or detect from browser
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem(LANGUAGE_KEY)
    if (saved === 'en-US' || saved === 'pt-BR') {
      return saved
    }
    return detectUserLanguage()
  })

  const [showLanguageMenu, setShowLanguageMenu] = useState(false)
  const languageMenuRef = useRef<HTMLDivElement>(null)

  // Initialize state with localStorage value
  const [namesText, setNamesText] = useState(() => {
    return localStorage.getItem(STORAGE_KEY) || ''
  })
  const [numberOfWinners, setNumberOfWinners] = useState(1)
  const [isDrawing, setIsDrawing] = useState(false)
  const [countdown, setCountdown] = useState<number | null>(null)
  const [winners, setWinners] = useState<string[]>([])
  const [showWinners, setShowWinners] = useState(false)

  const t = translations[language]

  // Save names to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, namesText)
  }, [namesText])

  // Save language to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(LANGUAGE_KEY, language)
  }, [language])

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang)
    setShowLanguageMenu(false)
  }

  // Close language menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (languageMenuRef.current && !languageMenuRef.current.contains(event.target as Node)) {
        setShowLanguageMenu(false)
      }
    }

    if (showLanguageMenu) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showLanguageMenu])

  const parseNames = (text: string): string[] => {
    // Split by comma or line break, trim whitespace, and filter empty strings
    return text
      .split(/[,\n]/)
      .map(name => name.trim())
      .filter(name => name.length > 0)
  }

  const handleDraw = () => {
    const names = parseNames(namesText)
    
    if (names.length === 0) {
      alert(t.alertNoNames)
      return
    }

    if (numberOfWinners > names.length) {
      alert(t.alertTooManyWinners(numberOfWinners, names.length))
      return
    }

    setIsDrawing(true)
    setShowWinners(false)
    setWinners([])
    setCountdown(3)
  }

  useEffect(() => {
    if (countdown === null || countdown < 0) return

    const timer = setTimeout(() => {
      if (countdown === 0) {
        // Perform the actual draw
        const names = parseNames(namesText)
        const shuffled = [...names].sort(() => Math.random() - 0.5)
        const selectedWinners = shuffled.slice(0, numberOfWinners)
        
        setWinners(selectedWinners)
        setShowWinners(true)
        setIsDrawing(false)
        setCountdown(null)
      } else {
        setCountdown(countdown - 1)
      }
    }, 1000)

    return () => clearTimeout(timer)
  }, [countdown, namesText, numberOfWinners])

  const totalNames = parseNames(namesText).length

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl"
      >
        {/* Language Selector */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex justify-end mb-4"
        >
          <div className="relative" ref={languageMenuRef}>
            <button
              onClick={() => setShowLanguageMenu(!showLanguageMenu)}
              className="flex items-center gap-2 bg-white/90 hover:bg-white backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg transition-all hover:scale-105 active:scale-95"
            >
              <span className="text-2xl">
                {language === 'en-US' ? '🇺🇸' : '🇧🇷'}
              </span>
              <span className="text-sm font-semibold text-gray-700">
                {language === 'en-US' ? 'EN' : 'PT'}
              </span>
              <svg
                className={`w-4 h-4 text-gray-700 transition-transform ${showLanguageMenu ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <AnimatePresence>
              {showLanguageMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl overflow-hidden z-10"
                >
                  <button
                    onClick={() => handleLanguageChange('en-US')}
                    className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-purple-50 transition-colors ${
                      language === 'en-US' ? 'bg-purple-100' : ''
                    }`}
                  >
                    <span className="text-2xl">🇺🇸</span>
                    <div className="flex-1 text-left">
                      <div className="font-semibold text-gray-800">English</div>
                      <div className="text-xs text-gray-500">United States</div>
                    </div>
                    {language === 'en-US' && (
                      <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                  <button
                    onClick={() => handleLanguageChange('pt-BR')}
                    className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-purple-50 transition-colors ${
                      language === 'pt-BR' ? 'bg-purple-100' : ''
                    }`}
                  >
                    <span className="text-2xl">🇧🇷</span>
                    <div className="flex-1 text-left">
                      <div className="font-semibold text-gray-800">Português</div>
                      <div className="text-xs text-gray-500">Brasil</div>
                    </div>
                    {language === 'pt-BR' && (
                      <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-5xl font-bold text-white mb-3 drop-shadow-lg">
            {t.title}
          </h1>
          <p className="text-white/90 text-lg">
            {t.subtitle}
          </p>
        </motion.div>

        {/* Main Card */}
        <motion.div
          className="bg-white rounded-2xl shadow-2xl p-8 mb-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          {/* Names Input */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              {t.enterNames}
              {totalNames > 0 && (
                <span className="ml-2 text-purple-600">
                  ({t.namesCount(totalNames)})
                </span>
              )}
            </label>
            <textarea
              value={namesText}
              onChange={(e) => setNamesText(e.target.value)}
              placeholder={t.placeholder}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none resize-none h-40 font-mono text-sm"
              disabled={isDrawing}
            />
          </div>

          {/* Number of Winners */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              {t.numberOfWinners}
            </label>
            <input
              type="number"
              min="1"
              max={totalNames || 1}
              value={numberOfWinners}
              onChange={(e) => setNumberOfWinners(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none"
              disabled={isDrawing}
            />
          </div>

          {/* Draw Button */}
          <motion.button
            onClick={handleDraw}
            disabled={isDrawing || totalNames === 0}
            className={`w-full py-4 rounded-lg font-bold text-lg transition-all shadow-lg ${
              isDrawing || totalNames === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 active:scale-95'
            }`}
            whileHover={!isDrawing && totalNames > 0 ? { scale: 1.02 } : {}}
            whileTap={!isDrawing && totalNames > 0 ? { scale: 0.98 } : {}}
          >
            {isDrawing ? t.drawing : t.drawButton}
          </motion.button>
        </motion.div>

        {/* Countdown Animation */}
        <AnimatePresence>
          {countdown !== null && countdown >= 0 && (
            <motion.div
              key="countdown"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50"
            >
              <motion.div
                key={countdown}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="text-white text-9xl font-bold drop-shadow-2xl"
              >
                {countdown === 0 ? '🎊' : countdown}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Winners Display */}
        <AnimatePresence>
          {showWinners && winners.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl shadow-2xl p-8"
            >
              <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="text-3xl font-bold text-white mb-6 text-center drop-shadow-lg"
              >
                🎉 {winners.length === 1 ? t.winner : t.winners}! 🎉
              </motion.h2>
              <div className="space-y-3">
                {winners.map((winner, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -50, rotate: -5 }}
                    animate={{ opacity: 1, x: 0, rotate: 0 }}
                    transition={{
                      delay: 0.8 + index * 0.2,
                      type: 'spring',
                      stiffness: 200,
                      damping: 15,
                    }}
                    className="bg-white rounded-xl p-4 shadow-lg"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-gray-800">
                        {winner}
                      </span>
                      <motion.span
                        animate={{
                          rotate: [0, 10, -10, 10, 0],
                          scale: [1, 1.2, 1, 1.2, 1],
                        }}
                        transition={{
                          delay: 0.8 + index * 0.2,
                          duration: 0.5,
                          repeat: 2,
                        }}
                        className="text-3xl"
                      >
                        🏆
                      </motion.span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

export default App
