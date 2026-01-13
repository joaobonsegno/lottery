import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const STORAGE_KEY = 'lottery-names'

function App() {
  // Initialize state with localStorage value
  const [namesText, setNamesText] = useState(() => {
    return localStorage.getItem(STORAGE_KEY) || ''
  })
  const [numberOfWinners, setNumberOfWinners] = useState(1)
  const [isDrawing, setIsDrawing] = useState(false)
  const [countdown, setCountdown] = useState<number | null>(null)
  const [winners, setWinners] = useState<string[]>([])
  const [showWinners, setShowWinners] = useState(false)

  // Save names to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, namesText)
  }, [namesText])

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
      alert('Please add some names first!')
      return
    }

    if (numberOfWinners > names.length) {
      alert(`You can't select more winners (${numberOfWinners}) than available names (${names.length})!`)
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
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-5xl font-bold text-white mb-3 drop-shadow-lg">
            🎲 Name Lottery
          </h1>
          <p className="text-white/90 text-lg">
            Add names and let fate decide!
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
              Enter Names
              {totalNames > 0 && (
                <span className="ml-2 text-purple-600">
                  ({totalNames} name{totalNames !== 1 ? 's' : ''})
                </span>
              )}
            </label>
            <textarea
              value={namesText}
              onChange={(e) => setNamesText(e.target.value)}
              placeholder="Enter names separated by commas or line breaks&#10;e.g., John, Sarah, Mike&#10;or one name per line"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none resize-none h-40 font-mono text-sm"
              disabled={isDrawing}
            />
          </div>

          {/* Number of Winners */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Number of Winners
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
            {isDrawing ? 'Drawing...' : '🎯 DRAW WINNERS'}
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
                🎉 {winners.length === 1 ? 'Winner' : 'Winners'}! 🎉
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
