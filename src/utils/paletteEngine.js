import { POETIC_NAMES } from '../data/poeticNames'
import { READINGS } from '../data/readings'
import { getLuminance } from './colorUtils'

const COLOR_POOL = [
  { hex: '#C8956C', warmth:9, structure:3, depth:5, energy:4, calm:6 },
  { hex: '#7A9E9F', warmth:3, structure:6, depth:5, energy:3, calm:9 },
  { hex: '#2C3E5D', warmth:2, structure:9, depth:9, energy:2, calm:7 },
  { hex: '#F2EDE4', warmth:7, structure:4, depth:2, energy:3, calm:8 },
  { hex: '#1A1A1A', warmth:1, structure:10, depth:10, energy:6, calm:5 },
  { hex: '#D4A5A5', warmth:7, structure:3, depth:3, energy:4, calm:7 },
  { hex: '#4A7856', warmth:4, structure:6, depth:7, energy:5, calm:8 },
  { hex: '#E8C84A', warmth:8, structure:3, depth:3, energy:9, calm:2 },
  { hex: '#7B68EE', warmth:4, structure:4, depth:7, energy:7, calm:6 },
  { hex: '#FF6B6B', warmth:8, structure:2, depth:4, energy:10, calm:1 },
  { hex: '#95B8A0', warmth:4, structure:5, depth:3, energy:4, calm:9 },
  { hex: '#8B7355', warmth:6, structure:7, depth:6, energy:2, calm:7 },
  { hex: '#F5F0E8', warmth:6, structure:4, depth:1, energy:2, calm:9 },
  { hex: '#2D4A3E', warmth:3, structure:8, depth:8, energy:3, calm:8 },
  { hex: '#C4956A', warmth:9, structure:5, depth:6, energy:6, calm:5 },
  { hex: '#4A4E69', warmth:2, structure:7, depth:7, energy:4, calm:7 },
  { hex: '#FFD700', warmth:10, structure:2, depth:2, energy:7, calm:5 },
  { hex: '#B8C4D0', warmth:2, structure:5, depth:3, energy:2, calm:10 },
  { hex: '#8B4513', warmth:7, structure:8, depth:9, energy:4, calm:4 },
  { hex: '#E8F4F8', warmth:3, structure:3, depth:1, energy:3, calm:9 },
  { hex: '#1C1C1C', warmth:1, structure:10, depth:10, energy:5, calm:5 },
  { hex: '#C9B89A', warmth:8, structure:5, depth:3, energy:3, calm:8 },
  { hex: '#556B8D', warmth:2, structure:8, depth:6, energy:4, calm:7 },
  { hex: '#0D1B2A', warmth:1, structure:6, depth:10, energy:3, calm:6 },
  { hex: '#FF4500', warmth:9, structure:2, depth:7, energy:10, calm:1 },
  { hex: '#9BB5C8', warmth:2, structure:4, depth:4, energy:2, calm:9 },
  { hex: '#4A3728', warmth:5, structure:7, depth:8, energy:2, calm:6 },
  { hex: '#E8D5B7', warmth:8, structure:4, depth:2, energy:3, calm:8 },
  { hex: '#2E4057', warmth:2, structure:8, depth:9, energy:4, calm:7 },
  { hex: '#CC5500', warmth:9, structure:4, depth:6, energy:8, calm:2 },
  { hex: '#A8B5A0', warmth:4, structure:5, depth:4, energy:3, calm:9 },
  { hex: '#F0E6D3', warmth:7, structure:4, depth:2, energy:3, calm:8 },
  { hex: '#3D5A80', warmth:2, structure:8, depth:8, energy:4, calm:7 },
  { hex: '#98C1A2', warmth:4, structure:5, depth:3, energy:4, calm:9 },
  { hex: '#D4C5A9', warmth:7, structure:5, depth:3, energy:3, calm:8 },
  { hex: '#6B4E3D', warmth:6, structure:7, depth:7, energy:3, calm:5 },
  { hex: '#89B4C1', warmth:3, structure:5, depth:4, energy:3, calm:9 },
  { hex: '#C17C74', warmth:7, structure:4, depth:5, energy:6, calm:5 },
  { hex: '#4A5568', warmth:2, structure:8, depth:7, energy:4, calm:6 },
  { hex: '#F7F3EE', warmth:6, structure:3, depth:1, energy:2, calm:9 },
]

function findReading(traits) {
  const match = READINGS.find(r =>
    r.traits.length === 2 &&
    r.traits.includes(traits[0]) &&
    r.traits.includes(traits[1])
  )
  return match || READINGS.find(r => r.traits.includes(traits[0])) || READINGS[0]
}

export function generatePalette(answers) {
  const totals = { warmth:0, structure:0, depth:0, energy:0, calm:0 }
  answers.forEach(a => {
    Object.keys(totals).forEach(k => { totals[k] += a.weight[k] })
  })

  const scores = {}
  Object.keys(totals).forEach(k => { scores[k] = Math.round(totals[k] / 80 * 100) })

  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1])
  const dominantTraits = [sorted[0][0], sorted[1][0]]

  const reading = findReading(dominantTraits)

  const scored = COLOR_POOL.map(color => {
    const similarity = Object.keys(scores).reduce((sum, k) => {
      return sum + (10 - Math.abs(scores[k] / 10 - color[k]))
    }, 0)
    return { ...color, similarity }
  })

  scored.sort((a, b) => b.similarity - a.similarity)
  const candidates = scored.slice(0, 15)

  const palette = []

  const dark = candidates.find(c => getLuminance(c.hex) < 0.09)
  if (dark) palette.push({ ...dark, role: 'depth' })

  const light = candidates.find(c => getLuminance(c.hex) > 0.7 && c.hex !== dark?.hex)
  if (light) palette.push({ ...light, role: 'light' })

  const roles = ['primary', 'secondary', 'accent']
  candidates.forEach(c => {
    if (palette.length >= 5) return
    if (palette.some(p => p.hex === c.hex)) return
    palette.push({ ...c, role: roles[palette.length - 2] || 'accent' })
  })

  while (palette.length < 5) {
    const fallback = COLOR_POOL.find(c => !palette.some(p => p.hex === c.hex))
    if (fallback) palette.push({ ...fallback, role: 'wild' })
    else break
  }

  const namedPalette = palette.slice(0, 5).map(color => ({
    hex: color.hex,
    role: color.role,
    name: POETIC_NAMES[color.hex] || color.hex,
  }))

  return {
    palette: namedPalette,
    reading: reading.reading,
    archetype: reading.archetype,
    dominantTraits,
    scores,
  }
}

export function getContrastColor(hex) {
  return getLuminance(hex) > 0.45 ? '#0a0a0a' : '#ffffff'
}
