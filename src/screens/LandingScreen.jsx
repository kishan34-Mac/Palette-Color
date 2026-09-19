import { motion } from 'framer-motion'
import { usePalette } from '../context/PaletteContext'

const PREVIEW_COLORS = ['#C8956C', '#F2EDE4', '#2C3E5D', '#C4956A', '#4A7856']

export default function LandingScreen() {
  const { setScreen } = usePalette()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      style={{ background: '#fff', minHeight: '100svh' }}
    >
      {/* FIXED TOP RULE */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '1px', background: '#000', zIndex: 200 }} />

      {/* HEADER */}
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '56px',
        background: '#fff',
        borderBottom: '1px solid #000',
        zIndex: 100,
        padding: '0 48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <span style={{ fontFamily: "'DM Mono', monospace", fontWeight: 400, fontSize: '13px', color: '#0a0a0a', letterSpacing: '0.2em' }}>
          PALETTE
        </span>
        <span className="header-right-text" style={{ fontFamily: "'DM Mono', monospace", fontWeight: 300, fontSize: '11px', color: '#888', letterSpacing: '0.15em' }}>
          A COLOR LANGUAGE TOOL
        </span>
      </header>

      {/* MAIN */}
      <main style={{ paddingTop: '56px', minHeight: '100svh' }}>
        {/* HERO */}
        <section className="hero-grid" style={{
          display: 'grid',
          gridTemplateColumns: '7fr 5fr',
          borderBottom: '1px solid #000',
          minHeight: 'calc(100svh - 56px)',
        }}>
          {/* LEFT */}
          <div className="hero-left" style={{
            padding: '64px 64px 64px 48px',
            borderRight: '1px solid #000',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '11px', color: '#ccc', letterSpacing: '0.2em', marginBottom: '16px' }}>
              01
            </span>

            <h1 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: 'italic',
              fontWeight: 300,
              fontSize: 'clamp(56px, 7vw, 96px)',
              color: '#0a0a0a',
              letterSpacing: '-3px',
              lineHeight: '1.0',
            }}>
              <span style={{ display: 'block' }}>Discover</span>
              <span style={{ display: 'block' }}>your color</span>
              <span style={{ display: 'block' }}>language.</span>
            </h1>

            <div style={{ width: '48px', height: '1px', background: '#e0ddd8', margin: '32px 0' }} />

            <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: '18px', color: '#3a3a3a', lineHeight: '1.6', maxWidth: '400px', marginBottom: '48px' }}>
              Eight instinct-driven choices. A palette that is entirely yours.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
              <button
                data-interactive
                onClick={() => setScreen('rounds')}
                style={{
                  background: '#0a0a0a',
                  color: '#fff',
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 400,
                  fontSize: '14px',
                  letterSpacing: '0.02em',
                  padding: '16px 32px',
                  border: 'none',
                  borderRadius: 0,
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#3a3a3a' }}
                onMouseLeave={e => { e.currentTarget.style.background = '#0a0a0a' }}
              >
                Begin the test →
              </button>

              <div style={{ width: '1px', height: '20px', background: '#e0ddd8', margin: '0 24px' }} />

              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '11px', color: '#888', letterSpacing: '0.1em' }}>
                8 rounds · 2 minutes
              </span>
            </div>

            <div style={{ marginTop: '48px' }}>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '11px', color: '#ccc', letterSpacing: '0.05em' }}>
                No account. No data sent. Saved in your browser.
              </span>
            </div>
          </div>

          {/* RIGHT */}
          <div className="hero-right" style={{
            padding: '64px 48px 64px 64px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}>
            <div>
              {PREVIEW_COLORS.map((hex, i) => (
                <div
                  key={i}
                  style={{
                    height: '72px',
                    width: '100%',
                    background: hex,
                    borderBottom: i < PREVIEW_COLORS.length - 1 ? '1px solid #000' : 'none',
                  }}
                />
              ))}
            </div>

            <div style={{ marginTop: '12px', fontFamily: "'DM Mono', monospace", fontSize: '10px', color: '#ccc', letterSpacing: '0.12em' }}>
              AN EXAMPLE PALETTE — YOURS WILL BE DIFFERENT
            </div>

            <div style={{ marginTop: '40px', fontFamily: "'DM Mono', monospace", fontSize: '11px', color: '#888', lineHeight: '2' }}>
              <div>No account required.</div>
              <div>No data leaves your browser.</div>
              <div>Completely yours.</div>
            </div>
          </div>
        </section>

        {/* INFO STRIP */}
        <section className="info-strip" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          borderBottom: '1px solid #000',
        }}>
          {[
            { num: '8', label: 'color rounds' },
            { num: '5', label: 'colors in your palette' },
            { num: '∞', label: 'possible combinations' },
          ].map((cell, i) => (
            <div
              key={i}
              style={{
                padding: '32px 48px',
                borderRight: i < 2 ? '1px solid #000' : 'none',
              }}
            >
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: '64px', color: '#0a0a0a', lineHeight: 1 }}>
                {cell.num}
              </div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '11px', color: '#888', marginTop: '4px', letterSpacing: '0.05em' }}>
                {cell.label}
              </div>
            </div>
          ))}
        </section>
      </main>
    </motion.div>
  )
}
