interface WinnersInputProps {
  value: number
  onChange: (value: number) => void
  label: string
  disabled?: boolean
}

export const WinnersInput = ({
  value,
  onChange,
  label,
  disabled = false,
}: WinnersInputProps) => {
  return (
    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-semibold mb-2">
        {label}
      </label>
      <input
        type="number"
        min="1"
        value={value}
        onChange={(e) => onChange(Math.max(1, parseInt(e.target.value) || 1))}
        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none"
        disabled={disabled}
      />
    </div>
  )
}

