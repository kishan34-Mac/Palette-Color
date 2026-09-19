import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { generatePalette } from '../utils/paletteEngine'
import { ROUNDS } from '../data/rounds'
import { saveResult, loadResult, clearResult } from '../utils/storage'

const PaletteContext = createContext()

export function PaletteProvider({ children }) {
  const [screen, setScreen] = useState('landing')
  const [currentRound, setCurrentRound] = useState(0)
  const [answers, setAnswers] = useState([])
  const [result, setResult] = useState(null)
  const [hoverColor, setHoverColor] = useState(null)

  const selectColor = useCallback((answer) => {
    setAnswers(prevAnswers => {
      const newAnswers = [...prevAnswers, answer]
      if (newAnswers.length === 8) {
        const r = generatePalette(newAnswers)
        setResult(r)
        saveResult(r, newAnswers)
        setTimeout(() => setScreen('result'), 300)
      } else {
        setCurrentRound(prev => prev + 1)
      }
      return newAnswers
    })
  }, [])

  const goBack = useCallback(() => {
    setCurrentRound(prevRound => {
      if (prevRound === 0) {
        setScreen('landing')
        return prevRound
      }
      setAnswers(prev => prev.slice(0, -1))
      return prevRound - 1
    })
  }, [])

  const reset = useCallback(() => {
    setScreen('landing')
    setCurrentRound(0)
    setAnswers([])
    setResult(null)
    clearResult()
  }, [])

  useEffect(() => {
    const saved = loadResult()
    if (saved) {
      setResult(saved.result)
      setAnswers(saved.answers)
      setCurrentRound(7)
      setScreen('result')
    }
  }, [])

  return (
    <PaletteContext.Provider value={{
      screen, setScreen,
      currentRound, answers, result,
      hoverColor, setHoverColor,
      selectColor, goBack, reset,
      currentQuestion: ROUNDS[currentRound],
      totalRounds: ROUNDS.length,
    }}>
      {children}
    </PaletteContext.Provider>
  )
}

export const usePalette = () => useContext(PaletteContext)
