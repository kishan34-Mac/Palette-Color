import { useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { usePalette } from '../context/PaletteContext'
import { getContrastColor } from '../utils/colorUtils'
import ShareCard from '../components/ShareCard'

const SCORE_KEYS = ['warmth', 'structure', 'depth', 'energy', 'calm']

export default function ResultScreen() {
  const { result, answers, reset } = usePalette()
  const shareCardRef = useRef(null)
  const [copied, setCopied] = useState(false)
  const [downloading, setDownloading] = useState(false)

  const triggerDownload = useCallback(async () => {
    if (!shareCardRef.current) return
    setDownloading(true)
    try {
      const html2canvas = (await import('html2canvas')).default
      const canvas = await html2canvas(shareCardRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
        logging: false,
      })
      const a = document.createElement('a')
      a.download = 'my-palette.png'
      a.href = canvas.toDataURL('image/png')
      a.click()
    } catch (e) {
      // download failed
    }
    setDownloading(false)
  }, [])

  const copyHex = useCallback(() => {
    if (!result) return
    navigator.clipboard.writeText(result.palette.map(p => p.hex).join(', '))
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }, [result])

  if (!result) return null

  const { palette, archetype, reading, scores } = result

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      style={{ background: '#fff', minHeight: '100svh' }}
    >
      {/* FIXED TOP BAR */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '48px',
        background: 'rgba(255,255,255,0.95)',
        borderBottom: '1px solid #000',
        zIndex: 100,
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        padding: '0 48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '13px', color: '#0a0a0a', letterSpacing: '0.2em' }}>
          PALETTE
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
          <button
            data-interactive
            onClick={reset}
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: '11px',
              color: '#888',
              borderRight: '1px solid #e0ddd8',
              paddingRight: '16px',
              marginRight: '16px',
            }}
          >
            START OVER
          </button>
          <button
            data-interactive
            onClick={triggerDownload}
            style={{ fontFamily: "'DM Mono', monospace", fontSize: '11px', color: '#0a0a0a' }}
          >
            DOWNLOAD
          </button>
        </div>
      </div>

      {/* SECTION 1 — PALETTE REVEAL */}
      <section style={{ paddingTop: '48px', minHeight: '100svh' }}>
        <div className="result-grid" style={{
          display: 'grid',
          gridTemplateColumns: '5fr 7fr',
          borderBottom: '1px solid #000',
        }}>
          {/* LEFT */}
          <div className="result-left" style={{
            padding: '64px 64px 64px 48px',
            borderRight: '1px solid #000',
          }}>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '11px', color: '#888', letterSpacing: '0.15em', marginBottom: '40px' }}>
              YOUR PALETTE
            </div>

            <div>
              {palette.map((color, i) => {
                const textColor = getContrastColor(color.hex)
                return (
                  <motion.div
                    key={i}
                    initial={{ x: -40, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    style={{
                      height: '80px',
                      background: color.hex,
                      position: 'relative',
                      borderBottom: i < palette.length - 1 ? '1px solid #000' : 'none',
                    }}
                  >
                    {/* Role */}
                    <div style={{
                      position: 'absolute',
                      top: '10px',
                      left: '16px',
                      fontFamily: "'DM Mono', monospace",
                      fontSize: '10px',
                      color: textColor,
                      opacity: 0.5,
                      letterSpacing: '0.15em',
                    }}>
                      {color.role.toUpperCase()}
                    </div>
                    {/* Content */}
                    <div style={{
                      position: 'absolute',
                      bottom: '12px',
                      left: '16px',
                      right: '16px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-end',
                    }}>
                      <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: '13px', color: textColor }}>
                        {color.name}
                      </span>
                      <span style={{ fontFamily: "'DM Mono', monospace", fontWeight: 500, fontSize: '12px', color: textColor, letterSpacing: '0.05em' }}>
                        {color.hex}
                      </span>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* COPY BUTTON */}
            <button
              data-interactive
              onClick={copyHex}
              onMouseEnter={e => { e.currentTarget.style.background = '#0a0a0a'; e.currentTarget.style.color = '#fff' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#0a0a0a' }}
              style={{
                marginTop: '16px',
                fontFamily: "'DM Mono', monospace",
                fontSize: '11px',
                color: '#0a0a0a',
                border: '1px solid #0a0a0a',
                padding: '10px 20px',
                borderRadius: 0,
              }}
            >
              {copied ? 'COPIED' : 'COPY ALL HEX →'}
            </button>
          </div>

          {/* RIGHT */}
          <div className="result-right" style={{ padding: '64px 48px 64px 64px' }}>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '11px', color: '#ccc', letterSpacing: '0.15em', marginBottom: '8px' }}>
              YOU ARE
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: 'italic',
                fontWeight: 300,
                fontSize: 'clamp(32px, 4vw, 52px)',
                color: '#0a0a0a',
                letterSpacing: '-1px',
              }}
            >
              {archetype}
            </motion.div>

            <div style={{ width: '48px', height: '1px', background: '#e0ddd8', margin: '32px 0' }} />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 300,
                fontSize: '18px',
                color: '#3a3a3a',
                lineHeight: '1.8',
                letterSpacing: '-0.2px',
                maxWidth: '480px',
              }}
            >
              {reading}
            </motion.div>

            {/* SCORES */}
            <div style={{ marginTop: '48px' }}>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '11px', color: '#888', letterSpacing: '0.15em', marginBottom: '16px' }}>
                YOUR SCORES
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {SCORE_KEYS.map((key, i) => (
                  <div
                    key={key}
                    style={{
                      height: '40px',
                      display: 'flex',
                      alignItems: 'center',
                      borderBottom: '1px solid #e0ddd8',
                    }}
                  >
                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '11px', color: '#888', width: '110px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                      {key}
                    </span>
                    <div style={{ flex: 1, height: '2px', background: '#e0ddd8', margin: '0 20px', position: 'relative' }}>
                      <motion.div
                        initial={{ width: '0%' }}
                        animate={{ width: `${scores[key]}%` }}
                        transition={{ duration: 0.8, delay: i * 0.1 + 1 }}
                        style={{
                          height: '2px',
                          background: '#0a0a0a',
                        }}
                      />
                    </div>
                    <span style={{ fontFamily: "'DM Mono', monospace", fontWeight: 400, fontSize: '13px', color: '#0a0a0a', width: '36px', textAlign: 'right' }}>
                      {scores[key]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — CHOICES RECAP */}
      <section style={{ padding: '64px 48px', borderBottom: '1px solid #000' }}>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '11px', color: '#888', letterSpacing: '0.15em', marginBottom: '40px' }}>
          YOUR CHOICES
        </div>

        <div className="choices-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(8, 1fr)',
          gap: 0,
        }}>
          {answers.map((answer, i) => (
            <div
              key={i}
              style={{
                padding: i === 0 ? '0 16px 0 0' : '0 16px',
                borderRight: i < 7 ? '1px solid #e0ddd8' : 'none',
              }}
            >
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '10px', color: '#ccc', letterSpacing: '0.15em', marginBottom: '8px' }}>
                0{i + 1}
              </div>
              <div style={{
                height: '64px',
                background: answer.hex,
                border: '1px solid rgba(0,0,0,0.08)',
              }} />
              <div style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: '9px',
                color: '#888',
                marginTop: '6px',
                letterSpacing: '0.05em',
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
              }}>
                {answer.name}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3 — DOWNLOAD */}
      <section style={{ padding: '0', borderTop: '1px solid #000' }}>
        <div className="download-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 0,
        }}>
          {/* LEFT — Share card preview */}
          <div style={{
            padding: '64px 48px',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
          }}>
            <div className="share-card-wrapper" style={{ width: '100%', maxWidth: '560px' }}>
              <ShareCard
                ref={shareCardRef}
                palette={palette}
                archetype={archetype}
                reading={reading}
                scores={scores}
              />
            </div>
          </div>

          {/* RIGHT */}
          <div className="download-right" style={{
            padding: '64px 48px 64px 64px',
            borderLeft: '1px solid #000',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '16px',
          }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontWeight: 400, fontSize: '28px', color: '#0a0a0a' }}>
              Download your palette
            </div>

            <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: '15px', color: '#888', lineHeight: '1.6' }}>
              Use these colors in design work, as a desktop wallpaper, or just to remember yourself today.
            </div>

            <button
              data-interactive
              onClick={triggerDownload}
              style={{
                background: '#0a0a0a',
                color: '#fff',
                fontFamily: "'DM Mono', monospace",
                fontWeight: 400,
                fontSize: '13px',
                letterSpacing: '0.1em',
                padding: '16px 32px',
                width: '100%',
                borderRadius: 0,
              }}
            >
              {downloading ? 'PREPARING...' : 'DOWNLOAD PALETTE →'}
            </button>

            <button
              data-interactive
              onClick={reset}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#0a0a0a'; e.currentTarget.style.color = '#0a0a0a' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#e0ddd8'; e.currentTarget.style.color = '#888' }}
              style={{
                border: '1px solid #e0ddd8',
                color: '#888',
                fontFamily: "'DM Mono', monospace",
                fontSize: '11px',
                padding: '12px 24px',
                width: '100%',
                borderRadius: 0,
              }}
            >
              TRY AGAIN
            </button>
          </div>
        </div>
      </section>
    </motion.div>
  )
}
