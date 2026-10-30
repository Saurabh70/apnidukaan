import { useState } from 'react'
import { motion } from 'framer-motion'
import ShopFront from './ShopFront'

const rise = (d = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay: d, ease: [0.22, 1, 0.36, 1] },
})

export default function RetroStage({ onEnter }) {
  const [leaving, setLeaving] = useState(false)

  const enter = () => {
    if (leaving) return
    setLeaving(true)
    setTimeout(onEnter, 650)
  }

  return (
    <motion.main
      className="grain h-[100svh] overflow-hidden md:h-auto md:min-h-[100svh] bg-cream text-ink"
      exit={{ opacity: 0, scale: 1.08, filter: 'blur(6px)' }}
      transition={{ duration: 0.5 }}
    >
      <div className="vignette pointer-events-none absolute inset-0 z-30" />
      {/* faded sunburst backdrop */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[900px] w-[900px] -translate-x-1/2 rounded-full opacity-[.13]"
        style={{ background: 'repeating-conic-gradient(from 0deg, #D9A53A 0deg 6deg, transparent 6deg 14deg)' }} />

      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col gap-3 px-4 pb-4 pt-4 sm:px-6 md:grid md:h-auto md:gap-6 md:min-h-[100svh] md:grid-cols-2 md:grid-rows-[auto_auto] md:content-center md:gap-x-12 md:py-12">
        {/* Copy */}
        <div className="text-center md:self-end md:text-left">
          <motion.div {...rise(0)} className="flex items-center justify-center gap-3 md:justify-start">
            <span className="h-px w-8 bg-ink/40" />
            <span className="font-type text-[11px] tracking-[0.35em] text-kred">APNIDUKAAN PRESENTS</span>
            <span className="h-px w-8 bg-ink/40" />
          </motion.div>

          <motion.h1 {...rise(0.12)} className="mt-2 font-rozha text-[2.1rem] leading-[1.02] min-[380px]:text-[2.4rem] md:mt-4 text-kred sm:text-6xl lg:text-7xl"
            style={{ textShadow: '2px 2px 0 #D9A53A55' }}>
            Remember Rahul&rsquo;s Dukaan?
          </motion.h1>

          <motion.p {...rise(0.24)} className="mx-auto mt-2 max-w-md font-lora text-[13.5px] leading-snug min-[380px]:text-[15px] md:mt-4 md:leading-relaxed text-ink/80 sm:text-lg md:mx-0">
            Your neighborhood store. Your childhood memories. The shop that&rsquo;s always been there.
          </motion.p>

          <motion.p {...rise(0.36)} className="mt-5 hidden -rotate-2 font-hand text-2xl text-forest md:block">
            &ldquo;Abhi bhi wahi dukaan hai. Bas duniya badal gayi.&rdquo;
          </motion.p>
        </div>

        {/* Shopfront */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, rotate: -1 }}
          animate={leaving ? { scale: 1.06, rotate: 0, opacity: 1 } : { opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: leaving ? 0.6 : 0.9, delay: leaving ? 0 : 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto flex min-h-0 w-full flex-1 items-center justify-center pt-2 md:block md:flex-none md:pt-0 md:col-start-2 md:row-span-2 md:row-start-1 md:max-w-[480px]"
        >
          <div className="relative aspect-[400/556] h-full max-w-full rounded-[6px] bg-[#FBF3E1] p-2 pb-7 shadow md:aspect-auto md:h-auto md:p-2.5 md:pb-9-[0_18px_40px_-12px_rgba(58,42,30,.45)]" style={{ transform: 'rotate(-1.2deg)' }}>
            <ShopFront glow={leaving} className="block h-full w-full rounded-[3px] md:h-auto" />
            <span className="absolute bottom-1.5 left-3 font-hand text-xs text-ink/60 md:bottom-2.5 md:left-4 md:text-sm">Gali No. 4, circa 1999</span>
            {/* tape */}
            <span className="absolute -top-3 left-1/2 h-6 w-24 -translate-x-1/2 rotate-2 bg-[#F2E3B8]/80 shadow-sm" />
          </div>
          {/* stamp */}
          <motion.div initial={{ scale: 1.6, opacity: 0 }} animate={{ scale: 1, opacity: 0.85 }} transition={{ delay: 1.1, type: 'spring', stiffness: 260, damping: 14 }}
            className="absolute -bottom-3 right-0 grid h-16 w-16 rotate-12 bg-cream/70 md:-bottom-5 md:h-20 md:w-20 place-items-center rounded-full border-[3px] border-double border-kred text-center font-type text-[9px] leading-tight text-kred sm:-right-6">
            SINCE<br /><span className="font-rozha text-lg leading-none md:text-xl">1998</span><br />TRUSTED
          </motion.div>
        </motion.div>

        {/* Note + CTA */}
        <div className="text-center md:self-start md:text-left">
          <motion.p {...rise(0.5)} className="-rotate-2 font-hand text-lg leading-snug text-forest md:hidden [@media(max-height:620px)]:hidden">
            &ldquo;Abhi bhi wahi dukaan hai. Bas duniya badal gayi.&rdquo;
          </motion.p>

          <motion.div {...rise(0.6)} className="mt-3 md:mt-2">
            <motion.button
              onClick={enter}
              whileHover={{ x: -2, y: -2 }}
              whileTap={{ x: 3, y: 3 }}
              className="group relative w-full max-w-sm rounded-md border-2 border-ink bg-kred px-6 py-3.5 font-type text-[15px] md:py-4 tracking-[0.12em] text-cream shadow-[6px_6px_0_#D9A53A] transition-shadow hover:shadow-[8px_8px_0_#D9A53A] focus:outline-none focus-visible:ring-4 focus-visible:ring-mustard/60 sm:w-auto"
            >
              <span className="absolute inset-0 animate-ping rounded-md border-2 border-kred opacity-20 [animation-duration:2.4s]" />
              ENTER RAHUL&rsquo;S DUKAAN <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </motion.button>
            <p className="mt-2.5 font-lora text-xs italic text-ink/65 md:mt-4 md:text-sm">See what happens when your neighborhood shop goes digital.</p>
          </motion.div>
        </div>
      </div>
    </motion.main>
  )
}
