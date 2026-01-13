import { motion } from 'framer-motion'

interface WinnerCardProps {
  name: string
  index: number
}

export const WinnerCard = ({ name, index }: WinnerCardProps) => {
  return (
    <motion.div
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
          {name}
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
          aria-label="Trophy"
        >
          🏆
        </motion.span>
      </div>
    </motion.div>
  )
}

