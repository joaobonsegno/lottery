import { useState, useEffect } from 'react'
import { STORAGE_KEY } from '../constants/storage'

export const useNameStorage = () => {
  const [namesText, setNamesText] = useState(() => {
    return localStorage.getItem(STORAGE_KEY) || ''
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, namesText)
  }, [namesText])

  return { namesText, setNamesText }
}

