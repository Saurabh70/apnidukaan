import { motion } from 'framer-motion'
import PackArt from './PackArt'
import { byId } from './data'

// The illustrated late-90s kirana. Pure SVG so it stays crisp on every phone.
const SHELVES = [
  { y: 214, items: ['parleg', 'goodday', 'monaco', 'maggi', 'parleg', 'yippee', 'goodday'], tags: ['₹10', '₹20', null, '₹14', null, '₹15', null] },
  { y: 266, items: ['tatasalt', 'surf', 'tatatea', 'poha', 'amulbutter', 'surf', 'tatasalt'], tags: ['₹28', '₹65', null, null, '₹58', null, null] },
  { y: 318, items: ['frooti', 'coke', 'frooti', 'vim', 'lifebuoy', 'vim', 'coke'], tags: [null, '₹40', null, '₹15', null, null, null] },
]

const STRIP_L = ['lays', 'kurkure', 'lays', 'kurkure', 'lays']
const STRIP_R = ['kurkure', 'bhujia', 'kurkure', 'lays', 'kurkure']

function toran() {
  const pts = []
  for (let i = 0; i <= 22; i++) {
    const t = i / 22
    const x = 32 + t * 336
    const y = 134 + Math.sin(t * Math.PI * 3) ** 2 * 10
    pts.push({ x, y, c: i % 2 ? '#F2A516' : '#E8731C' })
  }
  return pts
}

export default function ShopFront({ glow = false, className = '' }) {
  const marigolds = toran()
  return (
    <svg viewBox="0 0 400 520" className={className} role="img" aria-label="Illustration of Rahul General Store, a traditional neighbourhood kirana shop">
      <defs>
        <linearGradient id="wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#EAD8B4" />
          <stop offset="1" stopColor="#D9C095" />
        </linearGradient>
        <radialGradient id="bulbGlow">
          <stop offset="0" stopColor="#FFE7A3" stopOpacity=".9" />
          <stop offset=".4" stopColor="#FFC85C" stopOpacity=".35" />
          <stop offset="1" stopColor="#FFC85C" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="shopVig" cx=".5" cy=".45" r=".75">
          <stop offset=".55" stopColor="#3A2010" stopOpacity="0" />
          <stop offset="1" stopColor="#3A2010" stopOpacity=".35" />
        </radialGradient>
        <filter id="paint">
          <feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="1.6" />
        </filter>
        <pattern id="planks" width="22" height="10" patternUnits="userSpaceOnUse">
          <rect width="22" height="10" fill="#4A3020" />
          <rect width="1.2" height="10" fill="#2E1D12" />
        </pattern>
      </defs>

      {/* wall + stains */}
      <rect width="400" height="520" fill="url(#wall)" />
      <ellipse cx="60" cy="470" rx="70" ry="30" fill="#8C6A3E" opacity=".12" />
      <ellipse cx="360" cy="120" rx="40" ry="60" fill="#8C6A3E" opacity=".08" />

      {/* painted sign board */}
      <g filter="url(#paint)">
        <rect x="14" y="14" width="372" height="92" rx="4" fill="#B23A2E" stroke="#D9A53A" strokeWidth="5" />
        <rect x="24" y="23" width="352" height="74" rx="2" fill="none" stroke="#F3E6CC" strokeOpacity=".45" strokeDasharray="4 3" />
        <text x="200" y="66" textAnchor="middle" fontFamily='"Rozha One", serif' fontSize="35" fill="#F6E7C8" textLength="330" lengthAdjust="spacingAndGlyphs">
          RAHUL GENERAL STORE
        </text>
        <text x="200" y="88" textAnchor="middle" fontFamily='"Rozha One", serif' fontSize="12.5" fill="#F2C661" letterSpacing="1">
          राहुल जनरल स्टोर  ·  EST. 1998  ·  GALI NO. 4
        </text>
      </g>
      <rect x="30" y="20" width="60" height="18" fill="#F3E6CC" opacity=".14" transform="rotate(-4 60 29)" />
      <rect x="300" y="78" width="70" height="14" fill="#F3E6CC" opacity=".12" />
      {[[22, 22], [378, 22], [22, 98], [378, 98]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="2.4" fill="#7B5A2A" />)}

      {/* rolled-up shutter */}
      <rect x="26" y="106" width="348" height="22" fill="#8E8A80" />
      {[110, 115, 120, 125].map((y) => <line key={y} x1="26" x2="374" y1={y} y2={y} stroke="#6E6A62" strokeWidth="1.2" />)}
      <rect x="190" y="122" width="20" height="5" rx="1" fill="#5B5750" />

      {/* shop interior */}
      <rect x="30" y="128" width="340" height="232" fill="url(#planks)" />
      <rect x="30" y="128" width="340" height="232" fill="#1A0F08" opacity=".35" />

      {/* marigold toran */}
      <path d={`M${marigolds.map((p) => `${p.x} ${p.y}`).join(' L')}`} stroke="#5B7F2E" strokeWidth="1.5" fill="none" />
      {marigolds.map((p, i) => <circle key={i} cx={p.x} cy={p.y + 2} r="5" fill={p.c} />)}
      {marigolds.filter((_, i) => i % 3 === 1).map((p, i) => <path key={i} d={`M${p.x} ${p.y + 6} l-3 10 l3 -2 l3 2 z`} fill="#4E7A23" />)}

      {/* shelves with stock + handwritten price cards */}
      {SHELVES.map((s, si) => (
        <g key={si}>
          {s.items.map((id, i) => (
            <PackArt key={i} art={byId[id].art} x={68 + i * 38} y={s.y - 40} width="40" height="40" />
          ))}
          <rect x="44" y={s.y} width="312" height="7" fill="#7A4E2C" />
          <rect x="44" y={s.y} width="312" height="1.5" fill="#A87444" />
          {s.tags.map((t, i) => t && (
            <g key={i} transform={`translate(${78 + i * 38} ${s.y + 9}) rotate(${(i % 2 ? 4 : -5)})`}>
              <rect x="-11" y="0" width="22" height="13" fill="#FFF7E2" stroke="#C9B48A" strokeWidth=".6" />
              <text x="0" y="10" textAnchor="middle" fontFamily="Kalam, cursive" fontWeight="700" fontSize="9.5" fill="#B23A2E">{t}</text>
            </g>
          ))}
        </g>
      ))}

      {/* hanging chip strips */}
      {[{ x: 44, items: STRIP_L, d: 0 }, { x: 352, items: STRIP_R, d: 0.6 }].map((strip, si) => (
        <motion.g key={si} style={{ originX: 0.5, originY: 0 }}
          animate={{ rotate: [-1.5, 1.5, -1.5] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: strip.d }}>
          <line x1={strip.x} x2={strip.x} y1="136" y2="300" stroke="#C9B48A" strokeWidth="1" />
          {strip.items.map((id, i) => (
            <PackArt key={i} art={byId[id].art} x={strip.x - 13} y={146 + i * 31} width="26" height="30" />
          ))}
        </motion.g>
      ))}

      {/* hanging bulb */}
      <line x1="200" y1="128" x2="200" y2="152" stroke="#222" strokeWidth="1.2" />
      <motion.circle cx="200" cy="162" r="80" fill="url(#bulbGlow)"
        animate={glow ? { opacity: 1, r: 220 } : { opacity: [0.75, 1, 0.82, 1, 0.9] }}
        transition={glow ? { duration: 0.5 } : { duration: 3.2, repeat: Infinity, times: [0, 0.2, 0.25, 0.3, 1] }}
        style={{ mixBlendMode: 'screen' }} />
      <rect x="196" y="151" width="8" height="6" fill="#8A7A5A" />
      <circle cx="200" cy="163" r="7" fill="#FFF1C2" />

      {/* counter top items: jars, bahi-khata, tarazu */}
      {[{ x: 40, c: ['#E53935', '#FDD835', '#43A047'] }, { x: 78, c: ['#FB8C00', '#8E24AA', '#FB8C00'] }, { x: 116, c: ['#F06292', '#FFEE58', '#4FC3F7'] }].map((j, i) => (
        <g key={i}>
          <rect x={j.x + 4} y="304" width="22" height="6" rx="2" fill="#C62828" />
          <rect x={j.x} y="310" width="30" height="42" rx="7" fill="#DDEFF2" opacity=".55" stroke="#fff" strokeOpacity=".6" />
          {Array.from({ length: 9 }, (_, k) => (
            <circle key={k} cx={j.x + 7 + (k % 3) * 8} cy={346 - Math.floor(k / 3) * 8} r="3.4" fill={j.c[k % 3]} />
          ))}
          <rect x={j.x + 4} y="314" width="3" height="30" rx="1.5" fill="#fff" opacity=".5" />
        </g>
      ))}
      <g transform="rotate(-6 186 344)">
        <rect x="162" y="336" width="48" height="16" rx="2" fill="#A3241B" />
        <rect x="162" y="336" width="48" height="3" fill="#E8C66A" />
        <line x1="172" y1="341" x2="214" y2="331" stroke="#222" strokeWidth="2" strokeLinecap="round" />
      </g>
      <g stroke="#8A6420" fill="#C9962E">
        <rect x="300" y="296" width="5" height="56" />
        <rect x="286" y="348" width="34" height="5" rx="1" />
        <rect x="262" y="294" width="82" height="4" rx="2" />
        <path d="M302.5 286 l4 8 h-8z" />
        <line x1="268" y1="298" x2="262" y2="326" strokeWidth=".8" />
        <line x1="268" y1="298" x2="276" y2="326" strokeWidth=".8" />
        <line x1="338" y1="298" x2="330" y2="326" strokeWidth=".8" />
        <line x1="338" y1="298" x2="346" y2="326" strokeWidth=".8" />
        <path d="M256 326 h26 q-4 9 -13 9 q-9 0 -13 -9z" />
        <path d="M324 326 h26 q-4 9 -13 9 q-9 0 -13 -9z" />
      </g>
      <rect x="331" y="318" width="12" height="8" rx="1" fill="#5D5D5D" />

      {/* counter */}
      <rect x="20" y="360" width="360" height="122" fill="#2E5339" />
      <rect x="14" y="352" width="372" height="12" fill="#C9A46A" />
      <rect x="14" y="362" width="372" height="3" fill="#8E6F3E" opacity=".6" />
      <rect x="34" y="378" width="160" height="88" fill="none" stroke="#3F6B4B" strokeWidth="3" />
      <text x="114" y="412" textAnchor="middle" fontFamily='"Rozha One", serif' fontSize="15" fill="#D9A53A" opacity=".9">शुद्ध · सस्ता</text>
      <text x="114" y="436" textAnchor="middle" fontFamily="Kalam, cursive" fontSize="13" fill="#E9D8AE" opacity=".85">Quality &amp; Trust</text>
      <text x="114" y="454" textAnchor="middle" fontFamily='"Special Elite", monospace' fontSize="8" fill="#E9D8AE" opacity=".6">HOME DELIVERY? JUST SHOUT!</text>
      {/* paint chips */}
      <path d="M300 470 l8 -6 6 4 -2 8z M40 470 l6 -3 3 5z M360 380 l5 3 -4 4z" fill="#D9C095" opacity=".7" />

      {/* Udhaar Band Hai sign */}
      <line x1="232" y1="366" x2="248" y2="384" stroke="#7B5A2A" strokeWidth="1" />
      <line x1="338" y1="366" x2="322" y2="384" stroke="#7B5A2A" strokeWidth="1" />
      <motion.g style={{ originX: 0.5, originY: 0 }} animate={{ rotate: [-4, -2, -4] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>
        <rect x="222" y="382" width="128" height="62" fill="#F4E6C6" stroke="#B49A6A" strokeWidth="1.2" />
        <rect x="222" y="382" width="128" height="62" fill="#8C6A3E" opacity=".07" />
        <text x="286" y="408" textAnchor="middle" fontFamily='"Rozha One", serif' fontSize="19" fill="#B23A2E">उधार बंद है</text>
        <text x="286" y="432" textAnchor="middle" fontFamily="Kalam, cursive" fontWeight="700" fontSize="15" fill="#2E5339">Udhaar Band Hai</text>
        <line x1="240" y1="437" x2="332" y2="436" stroke="#B23A2E" strokeWidth="1.3" />
      </motion.g>

      {/* pavement step */}
      <rect x="0" y="482" width="400" height="38" fill="#9C9384" />
      <rect x="0" y="482" width="400" height="5" fill="#B5AD9E" />
      {[60, 150, 230, 320].map((x) => <line key={x} x1={x} x2={x - 6} y1="487" y2="520" stroke="#827A6C" strokeWidth="1.2" />)}

      {/* pillars */}
      <rect x="0" y="106" width="20" height="376" fill="#D2B98C" />
      <rect x="380" y="106" width="20" height="376" fill="#D2B98C" />

      <rect width="400" height="520" fill="url(#shopVig)" pointerEvents="none" />
    </svg>
  )
}
