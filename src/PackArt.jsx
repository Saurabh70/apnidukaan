import { useId } from 'react'

// Stylised, hand-drawn product packs (no external images needed).
export default function PackArt({ art, sepia = false, ...svgProps }) {
  const uid = useId().replace(/:/g, '')
  const g = `g${uid}`
  const { shape, bg, bg2, fg, text, text2, sub } = art
  const font = '"Plus Jakarta Sans", system-ui, sans-serif'

  const Label = ({ y = 50, size = 15, w = 60 }) => (
    <>
      <text x="50" y={text2 ? y - size * 0.15 : y + size * 0.35} textAnchor="middle" fontFamily={font} fontWeight="800"
        fontSize={size} fill={fg} textLength={text.length > 6 ? w : undefined} lengthAdjust="spacingAndGlyphs">{text}</text>
      {text2 && (
        <text x="50" y={y + size * 0.9} textAnchor="middle" fontFamily={font} fontWeight="800" fontSize={size * 0.95} fill={fg}>{text2}</text>
      )}
      {sub && (
        <text x="50" y={y + (text2 ? size * 1.75 : size * 1.25)} textAnchor="middle" fontFamily={font} fontWeight="700"
          fontSize="5.2" fill={fg} opacity=".85" letterSpacing=".3">{sub}</text>
      )}
    </>
  )

  const crimp = (x1, x2, y, h, color) =>
    Array.from({ length: Math.floor((x2 - x1) / 3) }, (_, i) => (
      <line key={i} x1={x1 + 1.5 + i * 3} x2={x1 + 1.5 + i * 3} y1={y} y2={y + h} stroke={color} strokeWidth="1" opacity=".55" />
    ))

  let body
  switch (shape) {
    case 'pillow':
      body = (
        <>
          <path d="M20 10 Q50 6 80 10 L84 18 Q88 50 84 82 L80 90 Q50 94 20 90 L16 82 Q12 50 16 18 Z" fill={`url(#${g})`} />
          {crimp(20, 80, 9, 7, bg2)}
          {crimp(20, 80, 84, 7, bg2)}
          <ellipse cx="34" cy="36" rx="7" ry="20" fill="#fff" opacity=".22" />
          {art.badge && <circle cx="50" cy="44" r="19" fill={art.badge} opacity=".18" />}
          {art.noodles && (
            <g transform="translate(50 70)">
              <ellipse rx="16" ry="6" fill="#fff" opacity=".9" />
              <path d="M-12 -2 q3 -4 6 0 t6 0 t6 0 t6 0" stroke="#E8B04A" strokeWidth="2" fill="none" />
            </g>
          )}
          <Label y={art.noodles ? 38 : 46} size={text.length > 6 ? 13 : 16} w={56} />
        </>
      )
      break
    case 'wrapper':
      body = (
        <>
          <path d="M6 30 l3 3 -3 3 3 3 -3 3 3 3 -3 3 3 3 -3 3 3 3 -3 3 3 3 -3 3 L94 70 l-3 -3 3 -3 -3 -3 3 -3 -3 -3 3 -3 -3 -3 3 -3 -3 -3 3 -3 -3 -3 3 -3 Z" fill={`url(#${g})`} />
          <rect x="6" y="30" width="88" height="5" fill="#fff" opacity=".18" />
          {art.face && (
            <g transform="translate(22 50)">
              <circle r="11" fill="#FFE7C2" stroke={fg} strokeWidth="1.2" />
              <circle cx="-3.5" cy="-1.5" r="1.2" fill="#3A2A1E" />
              <circle cx="3.5" cy="-1.5" r="1.2" fill="#3A2A1E" />
              <path d="M-3.5 4 q3.5 3 7 0" stroke="#C0392B" strokeWidth="1.2" fill="none" />
              <path d="M-10 -4 q10 -12 20 0" fill="#3A2A1E" />
            </g>
          )}
          {art.dots && [18, 26, 74, 82].map((x, i) => <ellipse key={i} cx={x} cy={i % 2 ? 58 : 42} rx="4.5" ry="3" fill="#F3D9A4" stroke="#B5762A" strokeWidth=".7" />)}
          <g transform={art.face ? 'translate(9 0)' : ''}>
            <text x="50" y="53" textAnchor="middle" fontFamily={font} fontWeight="800" fontSize={art.face ? 15 : 14} fill={fg}>{text}</text>
            <text x="50" y="62" textAnchor="middle" fontFamily={font} fontWeight="700" fontSize="5" fill={fg} opacity=".85">{sub}</text>
          </g>
        </>
      )
      break
    case 'pouch':
      body = (
        <>
          <path d="M24 16 L70 10 L80 20 L78 88 Q50 94 22 88 Z" fill={`url(#${g})`} stroke="#B9CBE4" strokeWidth="1" />
          <path d="M24 16 L70 10 L80 20" fill="none" stroke={fg} strokeWidth="2" />
          <path d="M22 66 Q50 58 78 66 L78 88 Q50 94 22 88 Z" fill={fg} opacity=".95" />
          <path d="M30 74 q6 -6 12 0 t12 0 t12 0" stroke="#fff" strokeWidth="1.4" fill="none" opacity=".7" />
          <Label y={36} size={14} />
        </>
      )
      break
    case 'box':
      body = (
        <>
          <path d="M26 18 L74 18 L82 12 L34 12 Z" fill={bg} opacity=".7" />
          <path d="M74 18 L82 12 L82 84 L74 90 Z" fill={bg2} />
          <rect x="22" y="18" width="52" height="72" rx="2" fill={`url(#${g})`} />
          <rect x="22" y="70" width="52" height="8" fill={fg} opacity=".9" />
          <g transform="translate(-2 0)"><Label y={40} size={13} w={44} /></g>
        </>
      )
      break
    case 'loaf':
      body = (
        <>
          <path d="M18 34 Q18 16 50 16 Q82 16 82 34 L80 88 Q50 92 20 88 Z" fill={`url(#${g})`} stroke="#D9C49A" />
          <path d="M26 30 Q26 22 50 22 Q74 22 74 30 L73 50 L27 50 Z" fill="#E1B56E" opacity=".8" />
          <rect x="20" y="52" width="60" height="30" fill="#fff" />
          <rect x="20" y="52" width="60" height="4" fill={fg} />
          <text x="50" y="66" textAnchor="middle" fontFamily={font} fontWeight="800" fontSize="10" fill={fg}>{text} {text2}</text>
          <text x="50" y="75" textAnchor="middle" fontFamily={font} fontWeight="700" fontSize="5" fill={fg}>{sub}</text>
          <rect x="44" y="86" width="12" height="6" rx="1" fill="#F2C14E" />
        </>
      )
      break
    case 'bottle':
      body = (
        <>
          <rect x="43" y="4" width="14" height="7" rx="1.5" fill="#C8102E" />
          <path d="M44 11 L56 11 L57 24 Q66 32 66 44 Q62 52 66 60 L66 90 Q50 96 34 90 L34 60 Q38 52 34 44 Q34 32 43 24 Z" fill={bg2} />
          <path d="M44 14 L47 14 L46 28 Q39 34 39 44" stroke="#fff" strokeWidth="1.6" opacity=".35" fill="none" />
          <rect x="33" y="58" width="34" height="18" fill={bg} />
          <path d="M33 70 q17 -8 34 0" stroke="#fff" strokeWidth="1.2" fill="none" />
          <text x="50" y="67" textAnchor="middle" fontFamily="Lora, serif" fontStyle="italic" fontWeight="600" fontSize="8" fill={fg}>{text}</text>
        </>
      )
      break
    case 'tetra':
      body = (
        <>
          <line x1="58" y1="4" x2="62" y2="20" stroke="#fff" strokeWidth="3" />
          <line x1="58" y1="4" x2="62" y2="20" stroke="#E3342F" strokeWidth="1.5" strokeDasharray="3 2" />
          <path d="M30 22 L50 16 L70 22 L70 90 L30 90 Z" fill={`url(#${g})`} />
          <path d="M30 22 L50 16 L70 22 Z" fill={bg2} />
          {art.mango && (
            <g transform="translate(50 66)">
              <ellipse rx="11" ry="13" fill="#FFB300" transform="rotate(-20)" />
              <path d="M2 -12 q6 -6 10 -2" stroke="#2E7D32" strokeWidth="3" fill="none" />
            </g>
          )}
          <text x="50" y="42" textAnchor="middle" fontFamily={font} fontWeight="800" fontSize="12" fill={fg}>{text}</text>
          <text x="50" y="49" textAnchor="middle" fontFamily={font} fontWeight="700" fontSize="5" fill="#fff">{sub}</text>
        </>
      )
      break
    case 'tall':
      body = (
        <>
          <rect x="28" y="8" width="44" height="84" rx="3" fill={`url(#${g})`} stroke={fg} strokeOpacity=".2" />
          {crimp(28, 72, 8, 6, fg)}
          <rect x="28" y="64" width="44" height="8" fill={art.stripe} />
          {shape === 'tall' && text === 'Surf' && <circle cx="50" cy="80" r="7" fill="#fff" opacity=".9" />}
          <text x="50" y="36" textAnchor="middle" fontFamily={font} fontWeight="800" fontSize="12" fill={fg}>{text}</text>
          <text x="50" y="49" textAnchor="middle" fontFamily={font} fontWeight="800" fontSize="12" fill={fg}>{text2}</text>
          <text x="50" y="58" textAnchor="middle" fontFamily={font} fontWeight="700" fontSize="4" fill={fg} opacity=".8">{sub}</text>
        </>
      )
      break
    case 'bar':
    default:
      body = (
        <>
          <rect x="12" y="32" width="76" height="38" rx="10" fill={`url(#${g})`} />
          <rect x="12" y="32" width="76" height="8" rx="4" fill="#fff" opacity=".2" />
          <ellipse cx="50" cy="51" rx="26" ry="12" fill={art.accent} opacity=".25" />
          <text x="50" y="54" textAnchor="middle" fontFamily={font} fontWeight="800" fontSize={text.length > 6 ? 11 : 14} fill={fg}>{text}</text>
          <text x="50" y="63" textAnchor="middle" fontFamily={font} fontWeight="700" fontSize="5" fill={fg} opacity=".9">{sub}</text>
        </>
      )
  }

  return (
    <svg viewBox="0 0 100 100" {...svgProps} style={{ ...(svgProps.style || {}), filter: sepia ? 'sepia(.45) saturate(.75)' : undefined }}>
      <defs>
        <linearGradient id={g} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={bg} />
          <stop offset="1" stopColor={bg2} />
        </linearGradient>
      </defs>
      <ellipse cx="50" cy={{ wrapper: 76, bar: 75 }[shape] ?? 95} rx="30" ry="3" fill="#000" opacity=".12" />
      {body}
    </svg>
  )
}
