import { motion } from 'framer-motion'

interface HeaderProps {
  title: string
  subtitle: string
}

export const Header = ({ title, subtitle }: HeaderProps) => {
  return (
    <motion.div
      className="text-center mb-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <h1 className="text-5xl font-bold text-white mb-3 drop-shadow-lg">
        {title}
      </h1>
      <p className="text-white/90 text-lg">
        {subtitle}
      </p>
    </motion.div>
  )
}

