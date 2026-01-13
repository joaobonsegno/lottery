import { motion, AnimatePresence } from 'framer-motion'

interface CountdownOverlayProps {
  countdown: number | null
}

export const CountdownOverlay = ({ countdown }: CountdownOverlayProps) => {
  return (
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
  )
}

