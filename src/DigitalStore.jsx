import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PackArt from './PackArt'
import { Logo, RahulSign } from './Brand'
import { CartDrawer, Checkout, OnboardModal } from './Overlays'
import { CATEGORIES, PRODUCTS, byId } from './data'

const tintOf = Object.fromEntries(CATEGORIES.map((c) => [c.id, c.tint]))

function AddControl({ qty, onAdd, onInc, onDec, name }) {
  const [bursts, setBursts] = useState([])
  const pop = () => {
    const id = Math.random()
    setBursts((b) => [...b, id])
    setTimeout(() => setBursts((b) => b.filter((x) => x !== id)), 700)
  }
  return (
    <div className="relative h-8 w-[74px] shrink-0">
      <AnimatePresence initial={false} mode="popLayout">
        {qty === 0 ? (
          <motion.button key="add" aria-label={`Add ${name} to cart`}
            initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => { onAdd(); pop() }}
            className="absolute inset-0 rounded-lg border border-brand bg-brand-light text-[13px] font-extrabold text-brand shadow-sm hover:bg-brand hover:text-white">
            ADD
          </motion.button>
        ) : (
          <motion.div key="step" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}
            className="absolute inset-0 flex items-center justify-between rounded-lg bg-brand text-white shadow-sm">
            <button aria-label={`Remove one ${name}`} onClick={onDec} className="h-full w-6 text-lg font-bold leading-none hover:bg-black/10 rounded-l-lg">−</button>
            <motion.span key={qty} initial={{ y: -8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-[13px] font-extrabold">{qty}</motion.span>
            <button aria-label={`Add one more ${name}`} onClick={() => { onInc(); pop() }} className="h-full w-6 text-lg font-bold leading-none hover:bg-black/10 rounded-r-lg">+</button>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {bursts.map((b) => (
          <motion.span key={b} initial={{ y: 0, opacity: 1, scale: 0.8 }} animate={{ y: -34, opacity: 0, scale: 1.2 }} exit={{ opacity: 0 }} transition={{ duration: 0.7 }}
            className="pointer-events-none absolute -top-1 right-2 text-sm font-extrabold text-brand">+1</motion.span>
        ))}
      </AnimatePresence>
    </div>
  )
}

function ProductCard({ p, qty, cart }) {
  const off = p.mrp ? p.mrp - p.price : 0
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }}
      whileHover={{ y: -4 }} transition={{ duration: 0.35 }}
      className="flex flex-col rounded-2xl border border-gray-100 bg-white p-2.5 shadow-[0_1px_2px_rgba(0,0,0,.04)] transition-shadow hover:shadow-lg"
    >
      <div className="relative grid aspect-square place-items-center overflow-hidden rounded-xl" style={{ background: tintOf[p.cat] }}>
        <motion.div key={qty} animate={qty ? { scale: [1, 1.1, 1] } : {}} transition={{ duration: 0.35 }} className="h-[82%] w-[82%]">
          <PackArt art={p.art} className="h-full w-full drop-shadow-sm" />
        </motion.div>
        {off > 0 && <span className="absolute left-0 top-0 rounded-br-lg bg-blue-600 px-1.5 py-1 text-[9px] font-extrabold leading-none text-white">₹{off}<br />OFF</span>}
        {qty > 0 && <span className="absolute right-1.5 top-1.5 rounded-full bg-brand px-1.5 text-[10px] font-bold text-white">{qty} in cart</span>}
      </div>
      <div className="mt-2 w-fit rounded bg-gray-100 px-1.5 py-0.5 text-[9px] font-bold uppercase text-gray-600">⏱ {p.eta} mins</div>
      <h3 className="mt-1.5 line-clamp-2 min-h-[2.4rem] text-[13px] font-semibold leading-[1.2rem] text-gray-900">{p.name}</h3>
      <p className="text-xs text-gray-500">{p.unit}</p>
      <div className="mt-auto flex items-end justify-between gap-1 pt-2.5">
        <div className="leading-tight">
          <div className="text-sm font-bold text-gray-900">₹{p.price}</div>
          {p.mrp && <div className="text-[11px] text-gray-400 line-through">₹{p.mrp}</div>}
        </div>
        <AddControl qty={qty} name={p.name} onAdd={() => cart.add(p.id)} onInc={() => cart.add(p.id)} onDec={() => cart.remove(p.id)} />
      </div>
    </motion.article>
  )
}

function useBodyLock(lock) {
  useEffect(() => {
    document.body.style.overflow = lock ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [lock])
}

export default function DigitalStore({ onReplay }) {
  const [items, setItems] = useState({})
  const [query, setQuery] = useState('')
  const [cat, setCat] = useState('all')
  const [cartOpen, setCartOpen] = useState(false)
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [onboardOpen, setOnboardOpen] = useState(false)
  const [toast, setToast] = useState(null)

  useBodyLock(cartOpen || checkoutOpen || onboardOpen)

  // keep the category bar docked just under the (variable-height) header
  const headerRef = useRef(null)
  const [headerH, setHeaderH] = useState(120)
  useLayoutEffect(() => {
    const el = headerRef.current
    const ro = new ResizeObserver(() => setHeaderH(el.offsetHeight))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const cart = useMemo(() => ({
    add: (id) => {
      setItems((s) => ({ ...s, [id]: (s[id] || 0) + 1 }))
      setToast({ id: Math.random(), text: `${byId[id].name.split(' ').slice(0, 3).join(' ')} added` })
    },
    remove: (id) => setItems((s) => {
      const n = { ...s }
      if (n[id] > 1) n[id] -= 1
      else delete n[id]
      return n
    }),
    clear: () => setItems({}),
  }), [])

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 1400)
    return () => clearTimeout(t)
  }, [toast])

  const count = Object.values(items).reduce((a, b) => a + b, 0)
  const subtotal = Object.entries(items).reduce((a, [id, q]) => a + byId[id].price * q, 0)

  const q = query.trim().toLowerCase()
  const results = q ? PRODUCTS.filter((p) => p.name.toLowerCase().includes(q) || CATEGORIES.find((c) => c.id === p.cat).name.toLowerCase().includes(q)) : null
  const visibleCats = cat === 'all' ? CATEGORIES : CATEGORIES.filter((c) => c.id === cat)

  const goClosing = () => document.getElementById('closing')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-[100svh] bg-[#F7F8FA] font-sans text-gray-900"
    >
      {/* Header */}
      <header ref={headerRef} style={{ top: "env(safe-area-inset-top, 0px)" }} className="sticky z-30 border-b border-gray-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-4 gap-y-2.5 px-4 py-3">
          <Logo />
          <div className="hidden border-l border-gray-200 pl-4 sm:block">
            <div className="text-[13px] font-extrabold">Delivery in 20–30 minutes*</div>
            <div className="text-xs text-gray-500">📍 Your Neighborhood ▾</div>
          </div>
          <button onClick={() => setCartOpen(true)} aria-label={`Open cart, ${count} items`}
            className="relative ml-auto flex items-center gap-2 rounded-xl bg-brand px-3 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-brand-dark md:order-last">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="20" r="1.4" /><circle cx="18" cy="20" r="1.4" /><path d="M2 3h3l2.6 12.4a1.5 1.5 0 0 0 1.5 1.1h8.7a1.5 1.5 0 0 0 1.5-1.2L21 7H6" />
            </svg>
            <span className="hidden md:inline">{count ? `₹${subtotal}` : 'My Cart'}</span>
            <motion.span key={count} initial={{ scale: 1.6 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 500, damping: 15 }}
              className="grid h-5 min-w-5 place-items-center rounded-full bg-white px-1 text-[11px] font-extrabold text-brand">{count}</motion.span>
          </button>
          <label className="relative order-last w-full md:order-none md:w-auto md:flex-1">
            <span className="sr-only">Search</span>
            <svg viewBox="0 0 24 24" className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2.2"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search for groceries and essentials"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-9 pr-9 text-sm outline-none transition focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/15" />
            {query && <button onClick={() => setQuery('')} aria-label="Clear search" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700">✕</button>}
          </label>
        </div>
        {/* store strip */}
        <div className="border-t border-gray-100 bg-[#FFFBF2]">
          <div className="mx-auto flex max-w-6xl items-center gap-2 whitespace-nowrap px-4 py-1.5 text-xs">
            <span className="hidden text-gray-500 sm:inline">Shopping from</span>
            <RahulSign />
            <span className="flex items-center gap-1 font-semibold text-brand"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand" />Open</span>
            <span className="ml-auto hidden text-gray-500 sm:inline">0.8 km away · Gali No. 4</span>
            <span className="ml-auto text-gray-500 sm:hidden">📍 Your Neighborhood</span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 pb-32 md:pb-16">
        {!results && (
          <>
            {/* Hero */}
            <section className="relative mt-4 overflow-hidden rounded-3xl bg-gradient-to-br from-brand to-[#065A28] p-5 text-white sm:p-8 md:grid md:grid-cols-[1.3fr_1fr] md:items-center md:gap-6">
              <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10" />
              <div className="absolute -bottom-20 right-24 h-40 w-40 rounded-full bg-[#F7D046]/20" />
              <div className="relative">
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-bold backdrop-blur">
                  ⚡ Delivery in 20–30 minutes<sup>*</sup>
                </motion.div>
                <motion.h1 initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                  className="mt-3 text-[1.75rem] font-extrabold leading-[1.12] tracking-tight sm:text-4xl lg:text-[2.6rem]">
                  Your favourite neighbourhood store. Now just a tap away.
                </motion.h1>
                <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mt-3 max-w-md text-[15px] text-white/85">
                  Everything you need from Rahul&rsquo;s dukaan, delivered to your doorstep.
                </motion.p>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-5 flex flex-wrap gap-2">
                  <a href="#catalogue" className="rounded-xl bg-white px-4 py-2.5 text-sm font-extrabold text-brand shadow transition hover:-translate-y-0.5">Start shopping</a>
                  <button onClick={goClosing} className="rounded-xl border border-white/40 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-white/10">How it works</button>
                </motion.div>
                <p className="mt-4 text-[10px] text-white/60">*Demonstration placeholder, not a guaranteed service claim.</p>
              </div>
              {/* identity card */}
              <motion.div initial={{ opacity: 0, rotate: 6, y: 20 }} animate={{ opacity: 1, rotate: -2, y: 0 }} transition={{ delay: 0.45, type: 'spring', stiffness: 120 }}
                className="relative mt-6 rounded-2xl bg-white p-4 text-gray-900 shadow-2xl md:mt-0">
                <div className="flex justify-center"><RahulSign size="lg" /></div>
                <div className="mt-3 flex items-center justify-between rounded-xl bg-gray-50 px-3 py-2 text-xs">
                  <div><div className="font-bold">Rahul ji</div><div className="text-gray-500">Owner · since 1998</div></div>
                  <span className="whitespace-nowrap rounded-full bg-brand-light px-2 py-1 font-bold text-brand">✓ Live</span>
                </div>
                <div className="mt-2 grid grid-cols-3 gap-2 text-center text-[11px]">
                  {[['🏪', 'Packed at his shop'], ['🛵', 'Local delivery'], ['🤝', 'Same trusted prices']].map(([e, t]) => (
                    <div key={t} className="rounded-lg border border-gray-100 px-1 py-2"><div className="text-lg">{e}</div><div className="mt-0.5 font-semibold leading-tight text-gray-600">{t}</div></div>
                  ))}
                </div>
              </motion.div>
            </section>

            {/* Banner */}
            <div className="relative -mx-4 mt-5 overflow-hidden border-y-2 border-ink bg-mustard py-2.5 sm:mx-0 sm:rounded-xl sm:border-2">
              <div className="marquee flex w-max whitespace-nowrap font-rozha text-lg tracking-wide text-ink">
                {Array.from({ length: 2 }, (_, k) => (
                  <span key={k} className="flex">
                    {Array.from({ length: 4 }, (_, i) => <span key={i} className="px-5">SHOP LOCAL. SUPPORT YOUR NEIGHBOURHOOD. <span className="text-kred">✦</span></span>)}
                  </span>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Category chips */}
        {!results && (
          <nav id="catalogue" style={{ top: `calc(${headerH}px + env(safe-area-inset-top, 0px))`, scrollMarginTop: headerH }} className="no-scrollbar sticky z-20 -mx-4 mt-5 flex gap-2 overflow-x-auto bg-[#F7F8FA]/95 px-4 py-2.5 backdrop-blur md:mx-0 md:px-0">
            {[{ id: 'all', name: 'All', emoji: '🛍️' }, ...CATEGORIES].map((c) => (
              <button key={c.id} onClick={() => setCat(c.id)}
                className={`relative shrink-0 rounded-full border px-3.5 py-1.5 text-[13px] font-semibold transition ${cat === c.id ? 'border-brand text-white' : 'border-gray-200 bg-white text-gray-700 hover:border-brand/50'}`}>
                {cat === c.id && <motion.span layoutId="chip" className="absolute inset-0 rounded-full bg-brand" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
                <span className="relative">{c.emoji} {c.name}</span>
              </button>
            ))}
          </nav>
        )}

        {/* Search results */}
        {results && (
          <section className="mt-5">
            <h2 className="text-lg font-extrabold">{results.length ? `Showing results for “${query}”` : `No results for “${query}”`}</h2>
            {!results.length && <p className="mt-1 text-sm text-gray-500">Try “Maggi”, “milk” or “biscuits”. Rahul can also stock it for you!</p>}
            <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {results.map((p) => <ProductCard key={p.id} p={p} qty={items[p.id] || 0} cart={cart} />)}
            </div>
          </section>
        )}

        {/* Catalogue */}
        {!results && visibleCats.map((c) => {
          const list = PRODUCTS.filter((p) => p.cat === c.id)
          return (
            <section key={c.id} className="mt-6">
              <div className="flex items-end justify-between">
                <h2 className="text-lg font-extrabold sm:text-xl">{c.emoji} {c.name}</h2>
                {cat === 'all' && <button onClick={() => { setCat(c.id); document.getElementById('catalogue')?.scrollIntoView({ behavior: 'smooth' }) }} className="text-sm font-bold text-brand hover:underline">See all</button>}
              </div>
              <div className={cat === 'all'
                ? 'no-scrollbar -mx-4 mt-3 flex snap-x gap-3 overflow-x-auto px-4 pb-1 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 md:grid-cols-4 lg:grid-cols-5'
                : 'mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'}>
                {list.map((p) => (
                  <div key={p.id} className={cat === 'all' ? 'w-[44%] shrink-0 snap-start sm:w-auto' : ''}>
                    <ProductCard p={p} qty={items[p.id] || 0} cart={cart} />
                  </div>
                ))}
              </div>
            </section>
          )
        })}

        {/* Closing message */}
        <section id="closing" style={{ scrollMarginTop: headerH + 64 }} className="grain relative mt-12 overflow-hidden rounded-3xl bg-cream px-5 py-10 text-center text-ink sm:px-10 sm:py-14">
          <div className="relative z-10">
            <div className="flex items-center justify-center gap-3 sm:gap-6">
              <div className="rotate-[-4deg] rounded-md bg-[#FBF3E1] p-1.5 shadow-md" style={{ filter: 'sepia(.5)' }}>
                <RahulSign />
                <div className="mt-1 font-hand text-[11px] text-ink/60">1998</div>
              </div>
              <motion.span animate={{ x: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.6 }} className="text-2xl text-kred">→</motion.span>
              <div className="rotate-[3deg] rounded-2xl border-4 border-gray-900 bg-white px-2.5 py-2 shadow-md">
                <Logo compact />
                <div className="mt-1 text-[10px] font-bold text-brand">Rahul&rsquo;s store · Live</div>
              </div>
            </div>
            <h2 className="mx-auto mt-8 max-w-2xl font-rozha text-3xl leading-tight text-kred sm:text-5xl">
              Same Rahul. Same trusted dukaan. A whole new way to shop.
            </h2>
            <p className="mx-auto mt-4 max-w-xl font-lora text-[15px] leading-relaxed text-ink/80 sm:text-lg">
              ApniDukaan gives neighborhood retailers the digital and logistics infrastructure to reach customers beyond their physical storefront.
            </p>
            <motion.button onClick={() => setOnboardOpen(true)} whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}
              className="mt-7 w-full max-w-sm rounded-xl bg-brand px-6 py-4 text-[15px] font-extrabold tracking-wide text-white shadow-[0_10px_24px_-8px_rgba(12,138,62,.7)] transition hover:bg-brand-dark sm:w-auto">
              BRING YOUR DUKAAN ONLINE
            </motion.button>
            <div className="mt-4">
              <button onClick={onReplay} className="font-hand text-lg text-forest underline decoration-dotted underline-offset-4 hover:text-kred">↺ Visit Rahul&rsquo;s old dukaan again</button>
            </div>
          </div>
        </section>

        <footer className="mt-8 text-center text-[11px] leading-relaxed text-gray-400">
          ApniDukaan concept demo · Product names are used for illustration only; prices, fees and delivery times are sample data.
        </footer>
      </main>

      {/* Mobile floating cart bar */}
      <AnimatePresence>
        {count > 0 && !cartOpen && !checkoutOpen && (
          <motion.button initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }} transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            onClick={() => setCartOpen(true)}
            className="fixed inset-x-3 bottom-3 z-30 flex items-center justify-between rounded-2xl bg-brand px-4 py-3 text-white shadow-2xl md:hidden"
            style={{ marginBottom: 'env(safe-area-inset-bottom)' }}>
            <span className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-white/15 text-lg">🛒</span>
              <span className="text-left leading-tight">
                <motion.span key={count} initial={{ y: 6, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="block text-sm font-extrabold">{count} item{count > 1 ? 's' : ''} · ₹{subtotal}</motion.span>
                <span className="block text-[11px] text-white/80">From Rahul General Store</span>
              </span>
            </span>
            <span className="text-sm font-extrabold">View cart ›</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Toast */}
      <div className="pointer-events-none fixed inset-x-0 top-3 z-[70] flex justify-center px-4">
        <AnimatePresence>
          {toast && (
            <motion.div key={toast.id} initial={{ y: -30, opacity: 0, scale: 0.9 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: -20, opacity: 0 }}
              className="flex items-center gap-2 rounded-full bg-gray-900 px-4 py-2 text-sm font-semibold text-white shadow-xl">
              <span className="grid h-5 w-5 place-items-center rounded-full bg-brand text-[11px]">✓</span>{toast.text}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} items={items} cart={cart} subtotal={subtotal}
        onCheckout={() => { setCartOpen(false); setCheckoutOpen(true) }} />
      <Checkout open={checkoutOpen} items={items} subtotal={subtotal}
        onClose={() => setCheckoutOpen(false)}
        onFinish={() => { setCheckoutOpen(false); cart.clear(); setTimeout(goClosing, 250) }} />
      <OnboardModal open={onboardOpen} onClose={() => setOnboardOpen(false)} onReplay={() => { setOnboardOpen(false); onReplay() }} />
    </motion.div>
  )
}
