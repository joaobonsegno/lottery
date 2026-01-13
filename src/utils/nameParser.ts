/**
 * Parse names from text input
 * Splits by comma or line break, trims whitespace, and filters empty strings
 */
export const parseNames = (text: string): string[] => {
  return text
    .split(/[,\n]/)
    .map(name => name.trim())
    .filter(name => name.length > 0)
}

