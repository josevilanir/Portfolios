'use client'

import { MapPin, Calendar, Code2, Smartphone, Database, Globe, Atom, FileCode2, Server, FileJson, Terminal, Coffee, Image as ImageIcon, LayoutDashboard, Layers } from 'lucide-react'

/* ─── Data ────────────────────────────────────────────────────── */

const ROLES = [
  { icon: <Globe size={14} />,      label: 'Full Stack Developer', color: '#60a5fa', border: 'rgba(96,165,250,0.5)',  glow: 'rgba(96,165,250,0.3)'  },
  { icon: <Smartphone size={14} />, label: 'Mobile Developer',     color: '#c084fc', border: 'rgba(192,132,252,0.5)', glow: 'rgba(192,132,252,0.3)' },
  { icon: <Database size={14} />,   label: 'Data Engineer',        color: '#34d399', border: 'rgba(52,211,153,0.5)',  glow: 'rgba(52,211,153,0.3)'  },
]

const HIGHLIGHTS = [
  {
    label: 'LOCALIZAÇÃO', value: 'Brasil',
    icon: <MapPin size={20} strokeWidth={2.5} />,
    from: '#3b82f6', to: '#06b6d4',
    shadowColor: 'rgba(6,182,212,0.15)',
  },
  {
    label: 'IDADE', value: '22 anos',
    icon: <Calendar size={20} strokeWidth={2.5}  />,
    from: '#a855f7', to: '#ec4899',
    shadowColor: 'rgba(236,72,153,0.15)',
  },
  {
    label: 'FOCO', value: 'Lógica & Dados',
    icon: <Code2 size={20} strokeWidth={2.5}  />,
    from: '#10b981', to: '#14b8a6',
    shadowColor: 'rgba(16,185,129,0.15)',
  },
]

const TECH_STACK = [
  { icon: <Atom size={18} />,      label: 'React',      from: '#0ea5e9', to: '#38bdf8', glow: 'rgba(56,189,248,0.5)' },
  { icon: <FileCode2 size={18} />, label: 'TypeScript', from: '#1d4ed8', to: '#60a5fa', glow: 'rgba(96,165,250,0.5)' },
  { icon: <Server size={18} />,    label: 'Node.js',    from: '#15803d', to: '#4ade80', glow: 'rgba(74,222,128,0.5)' },
  { icon: <FileJson size={18} />,  label: 'JavaScript', from: '#b45309', to: '#fde68a', glow: 'rgba(251,191,36,0.5)' },
  { icon: <Smartphone size={18}/>, label: 'Flutter',    from: '#0284c7', to: '#7dd3fc', glow: 'rgba(125,211,252,0.5)' },
  { icon: <Terminal size={18} />,  label: 'Python',     from: '#4f46e5', to: '#a5b4fc', glow: 'rgba(129,140,248,0.5)' },
  { icon: <Database size={18} />,  label: 'SQL',        from: '#c2410c', to: '#fb923c', glow: 'rgba(249,115,22,0.5)' },
  { icon: <LayoutDashboard size={18} />, label: 'HTML5',from: '#b91c1c', to: '#f87171', glow: 'rgba(239,68,68,0.5)' },
  { icon: <Coffee size={18} />,    label: 'Java',       from: '#9a3412', to: '#fdba74', glow: 'rgba(251,146,60,0.5)' },
  { icon: <Globe size={18} />,     label: 'Next.js',    from: '#334155', to: '#94a3b8', glow: 'rgba(203,213,225,0.5)' },
]

/* ─── Subcomponents ───────────────────────────────────────────── */

function TechOrb({ icon, from, to, glow, label }: (typeof TECH_STACK)[number]) {
  return (
    <div
      className="group relative flex-shrink-0 flex items-center justify-center cursor-default select-none transition-transform duration-200 hover:-translate-y-1 hover:scale-110"
      style={{
        width: '46px',
        height: '46px',
        borderRadius: '9999px',
        background: `linear-gradient(145deg, rgba(8,15,30,0.95), rgba(15,23,42,0.95))`,
        border: `1px solid ${glow.replace('0.5)', '0.35)')}`,
        boxShadow: `0 0 12px ${glow}, 0 0 24px ${glow.replace('0.5)', '0.2)')}, inset 0 0 8px ${glow.replace('0.5)', '0.15)')}`,
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.boxShadow =
          `0 0 18px ${glow}, 0 0 36px ${glow.replace('0.5)', '0.35)')}, inset 0 0 12px ${glow.replace('0.5)', '0.25)')}`
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.boxShadow =
          `0 0 12px ${glow}, 0 0 24px ${glow.replace('0.5)', '0.2)')}, inset 0 0 8px ${glow.replace('0.5)', '0.15)')}`
      }}
    >
      <span style={{ color: to, filter: `drop-shadow(0 0 5px ${to})` }}>{icon}</span>
      
      {/* Sleek Tooltip */}
      <span
        className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-1 rounded-[6px] text-[10px] font-bold text-white opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-200 pointer-events-none z-50"
        style={{
          background: 'rgba(15,23,42,0.9)',
          border: `1px solid ${glow.replace('0.5)', '0.4)')}`,
          boxShadow: `0 4px 15px rgba(0,0,0,0.5), 0 0 10px ${glow.replace('0.5)', '0.2)')}`,
          textShadow: '0 1px 2px rgba(0,0,0,0.8)'
        }}
      >
        {label}
      </span>
    </div>
  )
}

/* ─── Main component ──────────────────────────────────────────── */

export default function AboutMe() {
  return (
    <div className="h-full flex flex-col text-white overflow-y-auto overflow-x-hidden"
      style={{
        padding: '24px',
        gap: '16px',
        borderRadius: '24px',
        background: 'rgba(15, 23, 42, 0.4)',
        border: '1px solid rgba(255,255,255,0.1)',
        backdropFilter: 'blur(24px)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(255, 255, 255, 0.05)',
      }}
    >
      {/* ── Row 1: Avatar card + Name/Badges card ── */}
      <div className="flex" style={{ gap: '16px' }}>
        {/* Avatar — isolated square card */}
        <div
          className="flex-shrink-0 flex items-center justify-center"
          style={{
            width: '120px', 
            height: '120px',
            padding: '10px',
            borderRadius: '24px',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: 'inset 0 0 20px rgba(255,255,255,0.02)'
          }}
        >
          <div 
            className="w-full h-full" 
            style={{
              padding: '2px',
              borderRadius: '18px',
              background: 'linear-gradient(135deg, #0ea5e9, #a855f7)',
              boxShadow: '0 0 25px rgba(168, 85, 247, 0.4)'
            }}
          >
            <div 
              className="w-full h-full flex items-center justify-center overflow-hidden" 
              style={{
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #3b82f6, #9333ea)',
              }}
            >
              <img 
                src="/vilanir.png" 
                alt="José Vilanir"
                className="w-full h-full object-cover" 
              />
            </div>
          </div>
        </div>

        {/* Name + badges card */}
        <div
          className="flex-1 flex flex-col justify-center"
          style={{
            gap: '12px',
            padding: '20px 24px',
            borderRadius: '24px',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: 'inset 0 0 20px rgba(255,255,255,0.02)'
          }}
        >
          <h1 className="text-3xl font-black tracking-tight text-white drop-shadow-md">
            José Vilanir
          </h1>
          <div className="flex flex-wrap" style={{ gap: '10px' }}>
            {ROLES.map((r, i) => (
              <span
                key={i}
                className="inline-flex items-center font-bold"
                style={{
                  padding: '6px 12px',
                  gap: '6px',
                  borderRadius: '9999px',
                  fontSize: '11px',
                  background: 'rgba(255,255,255,0.04)',
                  border: `1px solid ${r.border}`,
                  color: r.color,
                  boxShadow: `0 0 12px ${r.glow}, inset 0 0 6px ${r.glow}`,
                }}
              >
                <span style={{ filter: `drop-shadow(0 0 4px ${r.color})` }}>{r.icon}</span>
                {r.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bio ── */}
      <div
        style={{
          padding: '16px 24px',
          borderRadius: '20px',
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <p className="text-[13px] text-slate-300 leading-[1.8] font-medium m-0">
          Desenvolvedor apaixonado por{' '}
          <span className="text-blue-400 font-bold drop-shadow-sm">lógica e processamento de dados</span>
          , aplicando essa robustez no desenvolvimento Full Stack e Mobile. Gosto de construir
          sistemas que resolvem problemas reais com clareza, performance e elegância.
        </p>
      </div>

      {/* ── Info cards ── */}
      <div className="grid grid-cols-3" style={{ gap: '16px' }}>
        {HIGHLIGHTS.map((h, i) => (
          <div
            key={i}
            className="flex flex-col relative overflow-hidden"
            style={{
              gap: '12px',
              padding: '20px',
              borderRadius: '20px',
              background: 'rgba(255,255,255,0.03)',
              border: `1px solid rgba(255,255,255,0.08)`,
              boxShadow: `0 0 30px ${h.shadowColor}`,
            }}
          >
            <div className="absolute top-0 right-0 w-24 h-24 rounded-full filter blur-[24px] pointer-events-none opacity-20" style={{ background: h.to }} />
            
            <div
              className="w-11 h-11 flex items-center justify-center flex-shrink-0 z-10"
              style={{
                borderRadius: '12px',
                background: `linear-gradient(135deg, ${h.from}, ${h.to})`,
                boxShadow: `0 0 15px ${h.shadowColor}`,
                color: 'white'
              }}
            >
              {h.icon}
            </div>
            <div className="flex flex-col z-10" style={{ marginTop: '4px' }}>
              <span className="uppercase font-bold text-slate-400" style={{ fontSize: '10px', letterSpacing: '0.15em', marginBottom: '2px' }}>
                {h.label}
              </span>
              <span className="font-bold text-white tracking-wide" style={{ fontSize: '14px' }}>
                {h.value}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ── Tech Stack ── */}
      <div
        style={{
          padding: '20px',
          borderRadius: '20px',
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div className="flex items-center" style={{ gap: '8px', marginBottom: '16px' }}>
          <div className="text-slate-400"><Layers size={14} /></div>
          <h3 className="uppercase font-bold text-slate-400 m-0" style={{ fontSize: '11px', letterSpacing: '0.15em' }}>
            Skills / Tech Stack
          </h3>
        </div>
        <div className="flex flex-wrap justify-start" style={{ gap: '16px' }}>
          {TECH_STACK.map((t, i) => (
            <TechOrb key={i} {...t} />
          ))}
        </div>
      </div>

      {/* ── Quote ── */}
      <div
        className="text-center mt-auto"
        style={{
          padding: '16px 24px',
          borderRadius: '20px',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.01), rgba(255,255,255,0.04))',
          border: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        <p className="italic font-medium tracking-wide text-slate-400 m-0" style={{ fontSize: '12px' }}>
          "Código limpo não é sobre ser bonito — é sobre ser preciso."
        </p>
      </div>
    </div>
  )
}
