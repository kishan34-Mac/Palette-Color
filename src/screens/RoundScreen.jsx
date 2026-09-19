import { useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePalette } from '../context/PaletteContext'
import { getContrastColor } from '../utils/colorUtils'
import ProgressBar from '../components/ProgressBar'

export default function RoundScreen() {
  const { currentRound, currentQuestion, selectColor, goBack, totalRounds, setHoverColor } = usePalette()

  const handleKey = useCallback((e) => {
    const key = e.key.toLowerCase()
    if (key === 'a' && currentQuestion.colors[0]) selectColor({ roundId: currentQuestion.id, colorId: 'A', hex: currentQuestion.colors[0].hex, name: currentQuestion.colors[0].name, weight: currentQuestion.colors[0].weight })
    else if (key === 'b' && currentQuestion.colors[1]) selectColor({ roundId: currentQuestion.id, colorId: 'B', hex: currentQuestion.colors[1].hex, name: currentQuestion.colors[1].name, weight: currentQuestion.colors[1].weight })
    else if (key === 'c' && currentQuestion.colors[2]) selectColor({ roundId: currentQuestion.id, colorId: 'C', hex: currentQuestion.colors[2].hex, name: currentQuestion.colors[2].name, weight: currentQuestion.colors[2].weight })
    else if (key === 'd' && currentQuestion.colors[3]) selectColor({ roundId: currentQuestion.id, colorId: 'D', hex: currentQuestion.colors[3].hex, name: currentQuestion.colors[3].name, weight: currentQuestion.colors[3].weight })
    else if (key === 'arrowleft' || key === 'escape') goBack()
  }, [currentQuestion, selectColor, goBack])

  useEffect(() => {
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [handleKey])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      style={{ background: '#fff', minHeight: '100svh' }}
    >
      {/* FIXED TOP BAR */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '48px',
        background: '#fff',
        borderBottom: '1px solid #000',
        zIndex: 100,
        padding: '0 48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ flex: 1 }}>
          {currentRound > 0 ? (
            <button
              data-interactive
              onClick={goBack}
              style={{ fontFamily: "'DM Mono', monospace", fontSize: '11px', color: '#888', letterSpacing: '0.1em' }}
            >
              ← BACK
            </button>
          ) : (
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '13px', color: '#0a0a0a', letterSpacing: '0.2em' }}>
              PALETTE
            </span>
          )}
        </div>

        <ProgressBar current={currentRound} total={totalRounds} />

        <div style={{ flex: 1, textAlign: 'right' }}>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '11px', color: '#888', letterSpacing: '0.1em' }}>
            ROUND {currentRound + 1} OF 8
          </span>
        </div>
      </div>

      {/* QUESTION ROW */}
      <div style={{
        position: 'fixed',
        top: '48px',
        left: 0,
        right: 0,
        height: '64px',
        background: '#fff',
        borderBottom: '1px solid #000',
        zIndex: 99,
        padding: '0 48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '11px', color: '#ccc', letterSpacing: '0.15em' }}>
          0{currentRound + 1}
        </span>
        <span style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: 'italic',
          fontWeight: 400,
          fontSize: 'clamp(20px, 3vw, 32px)',
          color: '#0a0a0a',
          letterSpacing: '-0.3px',
          textAlign: 'center',
        }}>
          {currentQuestion.question}
        </span>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '11px', color: '#ccc', letterSpacing: '0.15em' }}>
          CHOOSE ONE
        </span>
      </div>

      {/* COLOR GRID */}
      <div style={{
        position: 'fixed',
        top: '112px',
        left: 0,
        right: 0,
        bottom: 0,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridTemplateRows: '1fr 1fr',
      }}>
        {/* 1px cross dividers */}
        <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', background: '#000', zIndex: 10 }} />
        <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '1px', background: '#000', zIndex: 10 }} />

        <AnimatePresence mode="wait">
          {currentQuestion.colors.map((color, idx) => {
            const textColor = getContrastColor(color.hex)
            return (
              <motion.div
                key={`${currentQuestion.id}-${color.id}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                data-swatch={color.hex}
                data-interactive
                onClick={() => selectColor({ roundId: currentQuestion.id, colorId: color.id, hex: color.hex, name: color.name, weight: color.weight })}
                onMouseEnter={() => setHoverColor(color.hex)}
                onMouseLeave={() => setHoverColor(null)}
                whileTap={{ scale: 0.98 }}
                style={{
                  background: color.hex,
                  width: '100%',
                  height: '100%',
                  position: 'relative',
                  cursor: 'none',
                }}
              >
                {/* Hover inner border */}
                <div className="swatch-border" style={{
                  position: 'absolute',
                  inset: 0,
                  border: `3px solid ${textColor}`,
                  opacity: 0,
                  transition: 'opacity 0.1s',
                  pointerEvents: 'none',
                }} />
                {/* Option label */}
                <div style={{
                  position: 'absolute',
                  bottom: '24px',
                  left: '24px',
                }}>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '11px', letterSpacing: '0.15em', color: textColor }}>
                    [{color.id}]
                  </div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: '14px', color: textColor, opacity: 0.75, marginTop: '4px' }}>
                    {color.name}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      {/* HINT — only on round 0 */}
      {currentRound === 0 && (
        <div style={{
          position: 'fixed',
          bottom: '16px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 50,
        }}>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '10px', color: '#ccc', letterSpacing: '0.2em', background: 'rgba(255,255,255,0.8)', padding: '4px 12px' }}>
            A · B · C · D
          </span>
        </div>
      )}
    </motion.div>
  )
}
