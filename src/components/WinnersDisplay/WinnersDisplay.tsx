import { motion, AnimatePresence } from 'framer-motion'
import { WinnerCard } from './WinnerCard'

interface WinnersDisplayProps {
  winners: string[]
  showWinners: boolean
  winnerText: string
  winnersText: string
  onClose: () => void
}

export const WinnersDisplay = ({
  winners,
  showWinners,
  winnerText,
  winnersText,
  onClose,
}: WinnersDisplayProps) => {
  return (
    <AnimatePresence>
      {showWinners && winners.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl shadow-2xl p-8 relative"
        >
          {/* Close Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full transition-all hover:scale-110 active:scale-95 group"
            aria-label="Close winners display"
          >
            <svg
              className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </motion.button>

          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-3xl font-bold text-white mb-6 text-center drop-shadow-lg pr-8"
          >
            🎉 {winners.length === 1 ? winnerText : winnersText}! 🎉
          </motion.h2>
          <div className="space-y-3">
            {winners.map((winner, index) => (
              <WinnerCard key={index} name={winner} index={index} />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

