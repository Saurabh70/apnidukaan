// Shared brand bits: the ApniDukaan mark and Rahul's painted sign (kept identical across both stages).
export function LogoMark({ className = 'h-9 w-9' }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <rect width="40" height="40" rx="11" fill="#0C8A3E" />
      <path d="M7 15 h26 l-2 -6 h-22z" fill="#F7D046" />
      <path d="M7 15 q3.25 4 6.5 0 q3.25 4 6.5 0 q3.25 4 6.5 0 q3.25 4 6.5 0" fill="#fff" stroke="#fff" strokeWidth="1" />
      <rect x="10" y="19" width="20" height="14" rx="2" fill="#fff" />
      <rect x="17" y="24" width="6" height="9" rx="1" fill="#0C8A3E" />
    </svg>
  )
}

export function Logo({ compact = false }) {
  return (
    <div className="flex items-center gap-2">
      <LogoMark className={compact ? 'h-7 w-7' : 'h-9 w-9'} />
      <div className="leading-none">
        <div className={`${compact ? 'text-[13px]' : 'text-lg'} font-extrabold tracking-tight text-gray-900`}>
          apni<span className="text-brand">dukaan</span>
        </div>
        {!compact && <div className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-gray-400">from gali to digital</div>}
      </div>
    </div>
  )
}

export function RahulSign({ size = 'sm', className = '' }) {
  const big = size === 'lg'
  return (
    <div className={`inline-flex flex-col items-center rounded-[4px] border-[3px] border-mustard bg-kred text-center shadow-sm ${big ? 'px-5 py-2.5' : 'px-2 py-0.5'} ${className}`}>
      <span className={`whitespace-nowrap font-rozha leading-none text-[#F6E7C8] ${big ? 'text-xl tracking-wide sm:text-2xl' : 'text-[11px] tracking-wide'}`}>RAHUL GENERAL STORE</span>
      {big && <span className="mt-1 whitespace-nowrap font-rozha text-[11px] text-[#F2C661]">राहुल जनरल स्टोर · EST. 1998</span>}
    </div>
  )
}
