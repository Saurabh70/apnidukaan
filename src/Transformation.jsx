import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ShopFront from './ShopFront'
import PackArt from './PackArt'
import { LogoMark, RahulSign } from './Brand'
import { byId } from './data'

const CAPTIONS = [
  'Same shop. Same Rahul…',
  'Putting 1,200 products from his shelves online…',
  'Connecting neighbourhood delivery partners…',
  'Rahul General Store is live on ApniDukaan ✓',
]
const TIMES = [0, 1000, 1900, 2700] // ms at which each caption appears
const T_EXIT = 3500
const T_DONE = 4100

function MiniStore() {
  return (
    <div className="flex h-full flex-col bg-white font-sans">
      <div className="flex items-center gap-1.5 border-b border-gray-100 px-3 pb-2 pt-7">
        <LogoMark className="h-5 w-5" />
        <div className="text-[10px] font-extrabold">apni<span className="text-brand">dukaan</span></div>
        <div className="ml-auto rounded-full bg-gray-100 px-2 py-0.5 text-[7px] font-bold text-gray-600">🛒 0</div>
      </div>
      <div className="px-3 pt-2">
        <div className="rounded-lg bg-gray-100 px-2 py-1.5 text-[7px] text-gray-400">🔍 Search for groceries and essentials</div>
        <div className="mt-2 flex items-center gap-1.5">
          <RahulSign className="!px-1.5 [&>span]:!text-[7px]" />
          <span className="text-[7px] font-bold text-brand">● Open now</span>
        </div>
        <div className="mt-2 rounded-xl bg-gradient-to-br from-brand to-brand-dark p-2.5 text-white">
          <div className="text-[9px] font-extrabold leading-tight">Your favourite neighbourhood store. Now just a tap away.</div>
          <div className="mt-1 inline-block rounded-full bg-white/20 px-1.5 py-0.5 text-[6px] font-bold">⚡ 20–30 min delivery</div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-1.5 p-3">
        {['parleg', 'maggi', 'amulmilk', 'lays'].map((id) => (
          <div key={id} className="rounded-lg border border-gray-100 p-1.5">
            <div className="grid aspect-square place-items-center rounded-md bg-gray-50"><PackArt art={byId[id].art} className="h-4/5 w-4/5" /></div>
            <div className="mt-1 truncate text-[7px] font-semibold">{byId[id].name}</div>
            <div className="mt-0.5 flex items-center justify-between">
              <span className="text-[7px] font-bold">₹{byId[id].price}</span>
              <span className="rounded border border-brand px-1 text-[6px] font-bold text-brand">ADD</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Transformation({ onDone }) {
  const [cap, setCap] = useState(0)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    const ts = TIMES.slice(1).map((t, i) => setTimeout(() => setCap(i + 1), t))
    ts.push(setTimeout(() => setExiting(true), T_EXIT))
    ts.push(setTimeout(onDone, T_DONE))
    return () => ts.forEach(clearTimeout)
  }, [onDone])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden px-4"
      initial={{ backgroundColor: '#F3E6CC' }}
      animate={{ backgroundColor: '#FFFFFF' }}
      transition={{ duration: 2.2, delay: 0.8 }}
      exit={{ opacity: 0 }}
    >
      {/* soft green pulse behind phone */}
      <motion.div className="absolute h-[520px] w-[520px] rounded-full bg-brand/10 blur-3xl"
        initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 1.2, duration: 1.4 }} />

      <motion.div
        className="relative aspect-[9/19] w-[min(68vw,280px)] max-h-[66svh]"
        initial={{ scale: 1.45, rotate: -1.2 }}
        animate={exiting ? { scale: 6, opacity: 0 } : { scale: 1, rotate: 0 }}
        transition={exiting ? { duration: 0.6, ease: [0.7, 0, 0.84, 0] } : { duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* phone body */}
        <motion.div className="absolute inset-0 overflow-hidden bg-[#1a1a1a]"
          initial={{ borderRadius: 6, padding: 0 }} animate={{ borderRadius: 38, padding: 8 }} transition={{ duration: 0.9, delay: 0.15 }}>
          <motion.div className="relative h-full w-full overflow-hidden bg-[#3A2718]" initial={{ borderRadius: 4 }} animate={{ borderRadius: 30 }} transition={{ duration: 0.9, delay: 0.15 }}>
            {/* old shop layer */}
            <div className="absolute inset-0 grid place-items-center bg-[#EAD8B4]">
              <ShopFront className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-[#C9A46A]/20 mix-blend-multiply" />
            </div>
            {/* digital layer, revealed by a scan line */}
            <motion.div className="absolute inset-0"
              initial={{ clipPath: 'inset(0 0 100% 0)' }} animate={{ clipPath: 'inset(0 0 0% 0)' }}
              transition={{ delay: 1.05, duration: 1.4, ease: [0.65, 0, 0.35, 1] }}>
              <MiniStore />
            </motion.div>
            <motion.div className="absolute inset-x-0 h-1 bg-brand shadow-[0_0_24px_8px_rgba(12,138,62,.55)]"
              initial={{ top: '0%', opacity: 0 }} animate={{ top: ['0%', '100%'], opacity: [1, 1, 0] }}
              transition={{ delay: 1.05, duration: 1.4, ease: [0.65, 0, 0.35, 1] }} />
            {/* notch */}
            <motion.div className="absolute left-1/2 top-2 h-4 w-20 -translate-x-1/2 rounded-full bg-[#1a1a1a]"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} />
          </motion.div>
        </motion.div>

        {/* live badge */}
        <AnimatePresence>
          {cap === 3 && (
            <motion.div initial={{ scale: 0, rotate: -20 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 380, damping: 16 }}
              className="absolute -right-5 top-16 rounded-full bg-brand px-3 py-1.5 text-xs font-extrabold text-white shadow-lg">
              LIVE ✓
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <div className="relative mt-7 h-14 w-full max-w-sm text-center">
        <AnimatePresence mode="wait">
          <motion.p key={cap} initial={{ opacity: 0, y: 10 }} animate={{ opacity: exiting ? 0 : 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}
            className={`text-base font-semibold ${cap === 0 ? 'font-hand text-xl text-ink' : 'font-sans text-gray-800'} ${cap === 3 ? 'text-brand' : ''}`}>
            {CAPTIONS[cap]}
          </motion.p>
        </AnimatePresence>
      </div>

      <button onClick={onDone} className="absolute bottom-6 right-5 rounded-full px-3 py-1.5 text-sm font-semibold text-gray-500 hover:bg-black/5 hover:text-gray-800">
        Skip ›
      </button>
    </motion.div>
  )
}
