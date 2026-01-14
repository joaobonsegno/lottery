import { motion } from 'framer-motion'
import { NameInput } from './NameInput'
import { WinnersInput } from './WinnersInput'
import { DrawButton } from './DrawButton'
import type { Translations } from '../../types'

interface LotteryFormProps {
  namesText: string
  onNamesChange: (value: string) => void
  numberOfWinners: number
  onNumberOfWinnersChange: (value: number) => void
  onDraw: () => void
  totalNames: number
  isDrawing: boolean
  translations: Translations
}

export const LotteryForm = ({
  namesText,
  onNamesChange,
  numberOfWinners,
  onNumberOfWinnersChange,
  onDraw,
  totalNames,
  isDrawing,
  translations: t,
}: LotteryFormProps) => {
  return (
    <motion.div
      className="bg-white rounded-2xl shadow-2xl p-8 mb-6"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3 }}
    >
      <NameInput
        value={namesText}
        onChange={onNamesChange}
        label={t.enterNames}
        placeholder={t.placeholder}
        totalNames={totalNames}
        namesCountText={t.namesCount(totalNames)}
        disabled={isDrawing}
      />

      <WinnersInput
        value={numberOfWinners}
        onChange={onNumberOfWinnersChange}
        label={t.numberOfWinners}
        disabled={isDrawing}
      />

      <DrawButton
        onClick={onDraw}
        disabled={isDrawing || totalNames === 0}
        isDrawing={isDrawing}
        drawingText={t.drawing}
        buttonText={t.drawButton}
      />
    </motion.div>
  )
}

