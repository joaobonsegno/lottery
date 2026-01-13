import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from './hooks/useLanguage'
import { useNameStorage } from './hooks/useNameStorage'
import { parseNames } from './utils/nameParser'
import { LanguageSelector } from './components/LanguageSelector'
import { Header } from './components/Header'
import { LotteryForm } from './components/LotteryForm'
import { CountdownOverlay } from './components/CountdownOverlay'
import { WinnersDisplay } from './components/WinnersDisplay'

function App() {
  const { language, setLanguage, t } = useLanguage()
  const { namesText, setNamesText } = useNameStorage()

  const [numberOfWinners, setNumberOfWinners] = useState(1)
  const [isDrawing, setIsDrawing] = useState(false)
  const [countdown, setCountdown] = useState<number | null>(null)
  const [winners, setWinners] = useState<string[]>([])
  const [showWinners, setShowWinners] = useState(false)

  const totalNames = parseNames(namesText).length

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

  const handleCloseWinners = () => {
    setShowWinners(false)
    setWinners([])
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
          <LanguageSelector
            language={language}
            onLanguageChange={setLanguage}
          />
        </motion.div>

        {/* Header */}
        <Header title={t.title} subtitle={t.subtitle} />

        {/* Lottery Form */}
        <LotteryForm
          namesText={namesText}
          onNamesChange={setNamesText}
          numberOfWinners={numberOfWinners}
          onNumberOfWinnersChange={setNumberOfWinners}
          onDraw={handleDraw}
          totalNames={totalNames}
          isDrawing={isDrawing}
          translations={t}
        />

        {/* Countdown Overlay */}
        <CountdownOverlay countdown={countdown} />

        {/* Winners Display */}
        <WinnersDisplay
          winners={winners}
          showWinners={showWinners}
          winnerText={t.winner}
          winnersText={t.winners}
          onClose={handleCloseWinners}
        />
      </motion.div>
    </div>
  )
}

export default App
