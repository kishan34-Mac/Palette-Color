import { forwardRef } from 'react'
import { getContrastColor } from '../utils/colorUtils'

const ShareCard = forwardRef(function ShareCard({ palette, archetype, reading, scores }, ref) {
  const firstSentence = reading.split('. ')[0] + '.'
  const scoreKeys = ['warmth', 'structure', 'depth', 'energy', 'calm']

  return (
    <div
      ref={ref}
      style={{
        width: '560px',
        height: '360px',
        background: '#fff',
        border: '1px solid #000',
        display: 'grid',
        gridTemplateColumns: '220px 1px 1fr',
        overflow: 'hidden',
      }}
    >
      {/* LEFT SECTION */}
      <div style={{ padding: '28px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '9px', color: '#ccc', letterSpacing: '0.2em', marginBottom: '20px' }}>
          PALETTE
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {palette.map((color, i) => (
            <div
              key={i}
              style={{
                position: 'relative',
                height: '36px',
                width: '100%',
                background: color.hex,
                borderBottom: i < palette.length - 1 ? '1px solid rgba(0,0,0,0.15)' : 'none',
              }}
            >
              <span style={{
                position: 'absolute',
                right: '8px',
                bottom: '6px',
                fontFamily: "'DM Mono', monospace",
                fontSize: '8px',
                color: getContrastColor(color.hex),
                letterSpacing: '0.02em',
              }}>
                {color.hex}
              </span>
            </div>
          ))}
        </div>
        <div style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: '8px',
          color: '#888',
          marginTop: '8px',
          lineHeight: '1.8',
        }}>
          {palette.map(c => c.name).join('\n')}
        </div>
      </div>

      {/* VERTICAL RULE */}
      <div style={{ width: '1px', background: '#000', height: '100%' }} />

      {/* RIGHT SECTION */}
      <div style={{ padding: '28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '9px', color: '#ccc', letterSpacing: '0.15em', marginBottom: '6px' }}>
            YOU ARE
          </div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontWeight: 300, fontSize: '26px', color: '#0a0a0a', letterSpacing: '-0.5px' }}>
            {archetype}
          </div>
        </div>

        <div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: '13px', color: '#3a3a3a', lineHeight: '1.6', marginTop: '16px' }}>
            {firstSentence}
          </div>

          <div style={{ marginTop: '16px' }}>
            {scoreKeys.map(key => (
              <div key={key} style={{ height: '22px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '8px', color: '#ccc', width: '80px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {key}
                </span>
                <div style={{ flex: 1, height: '1px', background: '#e0ddd8', position: 'relative' }}>
                  <div style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    height: '1px',
                    width: `${scores[key]}%`,
                    background: '#0a0a0a',
                  }} />
                </div>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '9px', color: '#0a0a0a', width: '28px', textAlign: 'right' }}>
                  {scores[key]}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '8px', color: '#ccc', letterSpacing: '0.1em' }}>
            PALETTE — COLOR LANGUAGE
          </span>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '8px', color: '#ccc' }}>
            palette.app
          </span>
        </div>
      </div>
    </div>
  )
})

export default ShareCard
