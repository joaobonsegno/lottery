interface NameInputProps {
  value: string
  onChange: (value: string) => void
  label: string
  placeholder: string
  totalNames: number
  namesCountText: string
  disabled?: boolean
}

export const NameInput = ({
  value,
  onChange,
  label,
  placeholder,
  totalNames,
  namesCountText,
  disabled = false,
}: NameInputProps) => {
  return (
    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-semibold mb-2">
        {label}
        {totalNames > 0 && (
          <span className="ml-2 text-purple-600">
            ({namesCountText})
          </span>
        )}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none resize-none h-40 font-mono text-sm"
        disabled={disabled}
      />
    </div>
  )
}

