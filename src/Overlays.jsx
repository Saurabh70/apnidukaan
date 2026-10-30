import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PackArt from './PackArt'
import { RahulSign } from './Brand'
import { byId, DELIVERY_FEE, FREE_DELIVERY_ABOVE } from './data'

function useIsDesktop() {
  const q = '(min-width: 768px)'
  const [m, setM] = useState(() => typeof window !== 'undefined' && window.matchMedia(q).matches)
  useEffect(() => {
    const mq = window.matchMedia(q)
    const fn = () => setM(mq.matches)
    mq.addEventListener('change', fn)
    return () => mq.removeEventListener('change', fn)
  }, [])
  return m
}

function useEsc(open, onClose) {
  useEffect(() => {
    if (!open) return
    const fn = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [open, onClose])
}

export const billFor = (subtotal) => {
  const delivery = subtotal === 0 || subtotal >= FREE_DELIVERY_ABOVE ? 0 : DELIVERY_FEE
  return { delivery, total: subtotal + delivery }
}

const Backdrop = ({ onClick }) => (
  <motion.div className="fixed inset-0 z-40 bg-black/45 backdrop-blur-[2px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClick} />
)

function Stepper({ qty, onInc, onDec }) {
  return (
    <div className="flex h-8 w-[74px] items-center justify-between rounded-lg bg-brand text-white">
      <button onClick={onDec} aria-label="Decrease" className="h-full w-6 rounded-l-lg text-lg font-bold hover:bg-black/10">−</button>
      <motion.span key={qty} initial={{ y: -6, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-[13px] font-extrabold">{qty}</motion.span>
      <button onClick={onInc} aria-label="Increase" className="h-full w-6 rounded-r-lg text-lg font-bold hover:bg-black/10">+</button>
    </div>
  )
}

function BillRows({ subtotal }) {
  const { delivery, total } = billFor(subtotal)
  return (
    <div className="space-y-2 text-sm">
      <div className="flex justify-between"><span className="text-gray-600">Item total</span><span>₹{subtotal}</span></div>
      <div className="flex justify-between">
        <span className="text-gray-600">Delivery fee <span className="rounded bg-amber-100 px-1 text-[10px] font-bold uppercase text-amber-800">Illustrative</span></span>
        <span>{delivery ? `₹${delivery}` : <><span className="mr-1 text-gray-400 line-through">₹{DELIVERY_FEE}</span><span className="font-bold text-brand">FREE</span></>}</span>
      </div>
      {subtotal > 0 && subtotal < FREE_DELIVERY_ABOVE && (
        <div className="rounded-lg bg-brand-light px-2.5 py-1.5 text-xs font-semibold text-brand">Add ₹{FREE_DELIVERY_ABOVE - subtotal} more for free delivery (illustrative)</div>
      )}
      <div className="flex justify-between border-t border-dashed border-gray-200 pt-2 text-base font-extrabold"><span>Total</span><span>₹{total}</span></div>
    </div>
  )
}

export function CartDrawer({ open, onClose, items, cart, subtotal, onCheckout }) {
  const desk = useIsDesktop()
  useEsc(open, onClose)
  const entries = Object.entries(items)
  const count = entries.reduce((a, [, q]) => a + q, 0)
  const { total } = billFor(subtotal)

  return (
    <AnimatePresence>
      {open && (
        <>
          <Backdrop onClick={onClose} />
          <motion.aside role="dialog" aria-label="Your cart"
            initial={desk ? { x: '100%' } : { y: '100%' }} animate={{ x: 0, y: 0 }} exit={desk ? { x: '100%' } : { y: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 34 }}
            className="fixed inset-x-0 bottom-0 z-50 flex max-h-[90svh] flex-col rounded-t-3xl bg-[#F4F6F8] md:inset-y-0 md:left-auto md:right-0 md:max-h-none md:w-[420px] md:rounded-none"
          >
            <div className="mx-auto mt-2 h-1.5 w-10 rounded-full bg-gray-300 md:hidden" />
            <div className="flex items-center justify-between px-4 pb-3 pt-3">
              <h2 className="text-lg font-extrabold">My Cart</h2>
              <button onClick={onClose} aria-label="Close cart" className="grid h-8 w-8 place-items-center rounded-full bg-white text-gray-600 shadow-sm hover:text-gray-900">✕</button>
            </div>

            {entries.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center px-6 pb-16 pt-8 text-center">
                <div className="text-5xl">🛒</div>
                <p className="mt-3 font-extrabold">Your cart is empty</p>
                <p className="mt-1 text-sm text-gray-500">Rahul&rsquo;s shelves are full though. Add something!</p>
                <button onClick={onClose} className="mt-5 rounded-xl bg-brand px-5 py-2.5 text-sm font-bold text-white">Browse products</button>
              </div>
            ) : (
              <>
                <div className="flex-1 space-y-3 overflow-y-auto px-4 pb-4">
                  <div className="rounded-2xl bg-white p-3.5">
                    <div className="flex items-center gap-3">
                      <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-light text-xl">⚡</span>
                      <div>
                        <div className="text-sm font-extrabold">Delivery in 20–30 minutes*</div>
                        <div className="text-xs text-gray-500">Shipment of {count} item{count > 1 ? 's' : ''}</div>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center gap-2 whitespace-nowrap rounded-xl bg-[#FFFBF2] px-2.5 py-2 text-xs text-gray-600">
                      Packed fresh at <RahulSign />
                    </div>
                    <ul className="mt-2 divide-y divide-gray-100">
                      <AnimatePresence initial={false}>
                        {entries.map(([id, q]) => {
                          const p = byId[id]
                          return (
                            <motion.li key={id} layout initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                              className="flex items-center gap-3 overflow-hidden py-2.5">
                              <div className="grid h-14 w-14 shrink-0 place-items-center rounded-lg border border-gray-100 bg-gray-50"><PackArt art={p.art} className="h-12 w-12" /></div>
                              <div className="min-w-0 flex-1">
                                <div className="line-clamp-2 text-[13px] font-semibold leading-tight">{p.name}</div>
                                <div className="text-xs text-gray-500">{p.unit} · ₹{p.price} each</div>
                              </div>
                              <div className="flex flex-col items-end gap-1">
                                <Stepper qty={q} onInc={() => cart.add(id)} onDec={() => cart.remove(id)} />
                                <span className="text-sm font-bold">₹{p.price * q}</span>
                              </div>
                            </motion.li>
                          )
                        })}
                      </AnimatePresence>
                    </ul>
                  </div>
                  <div className="rounded-2xl bg-white p-3.5">
                    <h3 className="mb-2.5 text-sm font-extrabold">Bill details</h3>
                    <BillRows subtotal={subtotal} />
                  </div>
                  <p className="px-1 text-[11px] leading-snug text-gray-400">*Delivery time and fees are illustrative placeholders for this demonstration.</p>
                </div>
                <div className="border-t border-gray-200 bg-white p-3" style={{ paddingBottom: 'max(.75rem, env(safe-area-inset-bottom))' }}>
                  <motion.button whileTap={{ scale: 0.98 }} onClick={onCheckout}
                    className="flex w-full items-center justify-between rounded-xl bg-brand px-4 py-3.5 text-white shadow-lg transition hover:bg-brand-dark">
                    <span className="text-left leading-tight"><span className="block text-base font-extrabold">₹{total}</span><span className="block text-[11px] text-white/80">TOTAL</span></span>
                    <span className="text-[15px] font-extrabold">Proceed to Checkout ›</span>
                  </motion.button>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

const PAY = [
  { id: 'upi', label: 'UPI', sub: 'Any UPI app', icon: '📱' },
  { id: 'cod', label: 'Cash on Delivery', sub: 'Pay the rider', icon: '💵' },
  { id: 'khata', label: 'Rahul’s Digital Khata', sub: 'Udhaar is back, but digital! (concept)', icon: '📒' },
]
const TRACK = ['Order received by Rahul', 'Packing at Rahul General Store', 'Delivery partner picked up', 'Arriving at your door']

export function Checkout({ open, items, subtotal, onClose, onFinish }) {
  const [step, setStep] = useState('review')
  const [pay, setPay] = useState('upi')
  const [track, setTrack] = useState(0)
  const [snapshot, setSnapshot] = useState(null)
  useEsc(open && step !== 'placing', step === 'done' ? onFinish : onClose)

  useEffect(() => { if (open) { setStep('review'); setTrack(0) } }, [open])
  useEffect(() => {
    if (step !== 'done') return
    const ts = [1, 2, 3].map((n) => setTimeout(() => setTrack(n), n * 1100))
    return () => ts.forEach(clearTimeout)
  }, [step])

  const place = () => {
    setSnapshot({ count: Object.values(items).reduce((a, b) => a + b, 0), total: billFor(subtotal).total })
    setStep('placing')
    setTimeout(() => setStep('done'), 1500)
  }
  const { total } = billFor(subtotal)

  return (
    <AnimatePresence>
      {open && (
        <>
          <Backdrop onClick={step === 'review' ? onClose : undefined} />
          <div className="pointer-events-none fixed inset-0 z-50 flex items-end justify-center md:items-center md:p-6">
          <motion.div role="dialog" aria-label="Checkout"
            initial={{ opacity: 0, y: 40, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 40 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="pointer-events-auto max-h-[94svh] w-full overflow-y-auto rounded-t-3xl bg-white md:w-[440px] md:rounded-3xl"
          >
            <div className="rounded-t-3xl bg-amber-50 px-4 py-2 text-center text-[11px] font-semibold text-amber-800">Demonstration checkout · no payment will be taken</div>
            <AnimatePresence mode="wait">
              {step === 'review' && (
                <motion.div key="review" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, x: -30 }} className="p-5">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-extrabold">Checkout</h2>
                    <button onClick={onClose} aria-label="Close checkout" className="grid h-8 w-8 place-items-center rounded-full bg-gray-100 text-gray-600">✕</button>
                  </div>
                  <div className="mt-4 rounded-2xl border border-gray-100 p-3.5">
                    <div className="text-xs font-bold uppercase text-gray-400">Delivering to</div>
                    <div className="mt-1 font-bold">🏠 Home · Your Neighborhood</div>
                    <div className="text-sm text-gray-500">Sample address for this demo</div>
                  </div>
                  <div className="mt-3 text-xs font-bold uppercase text-gray-400">Pay with</div>
                  <div className="mt-2 space-y-2">
                    {PAY.map((m) => (
                      <button key={m.id} onClick={() => setPay(m.id)}
                        className={`flex w-full items-center gap-3 rounded-2xl border p-3 text-left transition ${pay === m.id ? 'border-brand bg-brand-light/60 ring-1 ring-brand' : 'border-gray-200 hover:border-gray-300'}`}>
                        <span className="text-xl">{m.icon}</span>
                        <span className="flex-1"><span className="block text-sm font-bold">{m.label}</span><span className="block text-xs text-gray-500">{m.sub}</span></span>
                        <span className={`grid h-5 w-5 place-items-center rounded-full border-2 ${pay === m.id ? 'border-brand' : 'border-gray-300'}`}>{pay === m.id && <span className="h-2.5 w-2.5 rounded-full bg-brand" />}</span>
                      </button>
                    ))}
                  </div>
                  <div className="mt-4 rounded-2xl bg-gray-50 p-3.5"><BillRows subtotal={subtotal} /></div>
                  <motion.button whileTap={{ scale: 0.98 }} onClick={place}
                    className="mt-4 w-full rounded-xl bg-brand py-3.5 text-[15px] font-extrabold text-white shadow-lg hover:bg-brand-dark">
                    Place order · ₹{total}
                  </motion.button>
                </motion.div>
              )}

              {step === 'placing' && (
                <motion.div key="placing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center p-12">
                  <motion.div className="h-12 w-12 rounded-full border-4 border-brand-light border-t-brand" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }} />
                  <p className="mt-4 font-bold">Sending your order to Rahul…</p>
                </motion.div>
              )}

              {step === 'done' && (
                <motion.div key="done" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="p-6 text-center">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 14 }}
                    className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-brand">
                    <svg viewBox="0 0 24 24" className="h-11 w-11" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <motion.path d="M5 12.5l4.5 4.5L19 7.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.25, duration: 0.45 }} />
                    </svg>
                  </motion.div>
                  <h2 className="mt-4 text-xl font-extrabold">Order placed!</h2>
                  <p className="mt-1 text-sm text-gray-500">{snapshot?.count} item{snapshot?.count > 1 ? 's' : ''} · ₹{snapshot?.total} · from <span className="font-semibold text-gray-800">Rahul General Store</span></p>
                  <ol className="mx-auto mt-5 max-w-xs space-y-3 text-left">
                    {TRACK.map((t, i) => (
                      <li key={t} className="flex items-center gap-3">
                        <motion.span animate={{ backgroundColor: i <= track ? '#0C8A3E' : '#E5E7EB', scale: i === track ? [1, 1.2, 1] : 1 }}
                          className="grid h-6 w-6 shrink-0 place-items-center rounded-full text-[11px] font-bold text-white">{i <= track ? '✓' : i + 1}</motion.span>
                        <span className={`text-sm ${i <= track ? 'font-bold text-gray-900' : 'text-gray-400'}`}>{t}</span>
                      </li>
                    ))}
                  </ol>
                  <p className="mt-5 rounded-xl bg-gray-50 px-3 py-2 text-[11px] text-gray-500">This is a demonstration. No order was sent and no payment was taken.</p>
                  <button onClick={onFinish} className="mt-4 w-full rounded-xl bg-gray-900 py-3.5 text-sm font-extrabold text-white hover:bg-black">See the bigger picture →</button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

const STEPS = [
  ['🏪', 'List your dukaan', 'Your shop name, your photos, your neighbourhood. Your identity stays yours.'],
  ['📦', 'Go digital with your shelves', 'We help put your catalogue and prices online, and keep stock in sync.'],
  ['🛵', 'Deliver beyond the gali', 'ApniDukaan’s logistics layer brings orders to customers’ doors.'],
]

export function OnboardModal({ open, onClose, onReplay }) {
  useEsc(open, onClose)
  return (
    <AnimatePresence>
      {open && (
        <>
          <Backdrop onClick={onClose} />
          <div className="pointer-events-none fixed inset-0 z-50 flex items-end justify-center md:items-center md:p-6">
          <motion.div role="dialog" aria-label="Bring your dukaan online"
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 40 }} transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="pointer-events-auto relative max-h-[94svh] w-full overflow-y-auto rounded-t-3xl bg-white p-6 md:w-[460px] md:rounded-3xl">
            <button onClick={onClose} aria-label="Close" className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full bg-gray-100 text-gray-600">✕</button>
            <div className="font-type text-[11px] tracking-[0.3em] text-kred">FOR SHOPKEEPERS</div>
            <h2 className="mt-2 text-2xl font-extrabold leading-tight">Bring your dukaan online in three steps</h2>
            <ol className="mt-5 space-y-3">
              {STEPS.map(([e, t, d], i) => (
                <motion.li key={t} initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.1 }} className="flex gap-3 rounded-2xl bg-gray-50 p-3.5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-xl shadow-sm">{e}</span>
                  <span><span className="block text-sm font-extrabold">{i + 1}. {t}</span><span className="block text-[13px] text-gray-500">{d}</span></span>
                </motion.li>
              ))}
            </ol>
            <p className="mt-5 rounded-xl bg-brand-light px-3.5 py-3 text-sm font-semibold text-brand">
              ApniDukaan doesn&rsquo;t replace Rahul&rsquo;s shop. It brings Rahul&rsquo;s shop to the customer&rsquo;s phone.
            </p>
            <div className="mt-5 flex flex-col gap-2 sm:flex-row">
              <button onClick={onReplay} className="flex-1 rounded-xl border border-gray-200 py-3 text-sm font-bold hover:bg-gray-50">↺ Replay Rahul&rsquo;s story</button>
              <button onClick={onClose} className="flex-1 rounded-xl bg-brand py-3 text-sm font-extrabold text-white hover:bg-brand-dark">Keep exploring</button>
            </div>
            <p className="mt-3 text-center text-[11px] text-gray-400">Concept demo for illustration. No sign-up required.</p>
          </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
