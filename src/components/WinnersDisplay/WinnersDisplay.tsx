import { motion, AnimatePresence } from 'framer-motion'
import { WinnerCard } from './WinnerCard'

interface WinnersDisplayProps {
  winners: string[]
  showWinners: boolean
  winnerText: string
  winnersText: string
}

export const WinnersDisplay = ({
  winners,
  showWinners,
  winnerText,
  winnersText,
}: WinnersDisplayProps) => {
  return (
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

