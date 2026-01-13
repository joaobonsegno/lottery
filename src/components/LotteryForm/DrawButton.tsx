import { motion } from 'framer-motion'

interface DrawButtonProps {
  onClick: () => void
  disabled: boolean
  isDrawing: boolean
  drawingText: string
  buttonText: string
}

export const DrawButton = ({
  onClick,
  disabled,
  isDrawing,
  drawingText,
  buttonText,
}: DrawButtonProps) => {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={`w-full py-4 rounded-lg font-bold text-lg transition-all shadow-lg ${
        disabled
          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
          : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 active:scale-95'
      }`}
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
    >
      {isDrawing ? drawingText : buttonText}
    </motion.button>
  )
}

