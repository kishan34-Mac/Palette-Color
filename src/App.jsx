import { PaletteProvider, usePalette } from './context/PaletteContext'
import CursorCross from './components/CursorCross'
import LandingScreen from './screens/LandingScreen'
import RoundScreen from './screens/RoundScreen'
import ResultScreen from './screens/ResultScreen'
import { AnimatePresence } from 'framer-motion'

function AppInner() {
  const { screen } = usePalette()
  return (
    <div style={{ width: '100%', minHeight: '100svh', background: '#fff' }}>
      <CursorCross />
      <AnimatePresence mode="wait">
        {screen === 'landing' && <LandingScreen key="landing" />}
        {screen === 'rounds' && <RoundScreen key="rounds" />}
        {screen === 'result' && <ResultScreen key="result" />}
      </AnimatePresence>
    </div>
  )
}

export default function App() {
  return <PaletteProvider><AppInner /></PaletteProvider>
}
