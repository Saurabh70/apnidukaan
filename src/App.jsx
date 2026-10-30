import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, MotionConfig } from 'framer-motion'
import RetroStage from './RetroStage'
import Transformation from './Transformation'
import DigitalStore from './DigitalStore'

export default function App() {
  // retro → transition → digital
  const [stage, setStage] = useState('retro')
  const toDigital = useCallback(() => setStage('digital'), [])

  useEffect(() => {
    window.scrollTo(0, 0)
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', stage === 'retro' ? '#F3E6CC' : '#FFFFFF')
  }, [stage])

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence mode="wait">
        {stage === 'retro' && <RetroStage key="retro" onEnter={() => setStage('transition')} />}
        {stage === 'transition' && <Transformation key="transition" onDone={toDigital} />}
        {stage === 'digital' && <DigitalStore key="digital" onReplay={() => setStage('retro')} />}
      </AnimatePresence>
    </MotionConfig>
  )
}
