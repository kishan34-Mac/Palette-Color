import { useEffect, useState, useRef } from 'react'

export default function CursorCross() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [isInteractive, setIsInteractive] = useState(false)
  const [swatchColor, setSwatchColor] = useState(null)
  const frameRef = useRef(null)

  useEffect(() => {
    const onMove = (e) => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
      frameRef.current = requestAnimationFrame(() => {
        setPos({ x: e.clientX, y: e.clientY })

        const el = document.elementFromPoint(e.clientX, e.clientY)
        if (!el) {
          setIsInteractive(false)
          setSwatchColor(null)
          return
        }
        const interactive = el.closest('button, a, [data-interactive], [data-swatch]')
        if (interactive) {
          setIsInteractive(true)
          const swatch = interactive.getAttribute('data-swatch')
          if (swatch) {
            setSwatchColor(swatch)
          } else {
            setSwatchColor(null)
          }
        } else {
          setIsInteractive(false)
          setSwatchColor(null)
        }
      })
    }

    window.addEventListener('mousemove', onMove)
    return () => {
      window.removeEventListener('mousemove', onMove)
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [])

  const size = isInteractive ? 24 : 16
  const color = swatchColor || '#0a0a0a'

  return (
    <>
      <div
        style={{
          position: 'fixed',
          left: pos.x,
          top: pos.y,
          width: `${size}px`,
          height: '1px',
          background: color,
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-50%, -50%)',
        }}
      />
      <div
        style={{
          position: 'fixed',
          left: pos.x,
          top: pos.y,
          width: '1px',
          height: `${size}px`,
          background: color,
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-50%, -50%)',
        }}
      />
    </>
  )
}
