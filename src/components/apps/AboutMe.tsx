'use client'

import { useState } from 'react'
import { MapPin, Calendar, Code2, Smartphone, Database, Globe, Atom, FileCode2, Server, FileJson, Terminal, LayoutDashboard, Layers, Gem, GraduationCap, Languages, Brain, MessageCircle, Users, Lightbulb, RefreshCw, Zap, Target, BookOpen, BarChart2 } from 'lucide-react'
import { useLanguageStore } from '@/store/useLanguageStore'

/* ─── Data ────────────────────────────────────────────────────── */

const ROLES = {
  pt: [
    { icon: <Globe size={14} />,      label: 'Full Stack Developer', color: '#60a5fa', border: 'rgba(96,165,250,0.5)',  glow: 'rgba(96,165,250,0.3)'  },
    { icon: <Smartphone size={14} />, label: 'Mobile Developer',     color: '#c084fc', border: 'rgba(192,132,252,0.5)', glow: 'rgba(192,132,252,0.3)' },
    { icon: <Database size={14} />,   label: 'Data Engineer',        color: '#34d399', border: 'rgba(52,211,153,0.5)',  glow: 'rgba(52,211,153,0.3)'  },
  ],
  en: [
    { icon: <Globe size={14} />,      label: 'Full Stack Developer', color: '#60a5fa', border: 'rgba(96,165,250,0.5)',  glow: 'rgba(96,165,250,0.3)'  },
    { icon: <Smartphone size={14} />, label: 'Mobile Developer',     color: '#c084fc', border: 'rgba(192,132,252,0.5)', glow: 'rgba(192,132,252,0.3)' },
    { icon: <Database size={14} />,   label: 'Data Engineer',        color: '#34d399', border: 'rgba(52,211,153,0.5)',  glow: 'rgba(52,211,153,0.3)'  },
  ],
}

const HIGHLIGHTS = {
  pt: [
    { label: 'LOCALIZAÇÃO', value: 'Brasil',              icon: <MapPin size={20} strokeWidth={2.5} />,        from: '#3b82f6', to: '#06b6d4', shadowColor: 'rgba(6,182,212,0.15)' },
    { label: 'IDADE',       value: '22 anos',             icon: <Calendar size={20} strokeWidth={2.5} />,       from: '#a855f7', to: '#ec4899', shadowColor: 'rgba(236,72,153,0.15)' },
    { label: 'FORMAÇÃO',    value: 'ADS — IFRN',          icon: <GraduationCap size={20} strokeWidth={2.5} />,  from: '#6366f1', to: '#8b5cf6', shadowColor: 'rgba(99,102,241,0.15)' },
    { label: 'IDIOMA',      value: 'Inglês Fluente',      icon: <Languages size={20} strokeWidth={2.5} />,      from: '#f59e0b', to: '#fb923c', shadowColor: 'rgba(245,158,11,0.15)' },
    { label: 'FOCO',        value: 'Sistemas & Softwares',icon: <Code2 size={20} strokeWidth={2.5} />,          from: '#10b981', to: '#14b8a6', shadowColor: 'rgba(16,185,129,0.15)' },
  ],
  en: [
    { label: 'LOCATION',   value: 'Brazil',              icon: <MapPin size={20} strokeWidth={2.5} />,        from: '#3b82f6', to: '#06b6d4', shadowColor: 'rgba(6,182,212,0.15)' },
    { label: 'AGE',        value: '22 years old',        icon: <Calendar size={20} strokeWidth={2.5} />,       from: '#a855f7', to: '#ec4899', shadowColor: 'rgba(236,72,153,0.15)' },
    { label: 'EDUCATION',  value: 'ADS — IFRN',          icon: <GraduationCap size={20} strokeWidth={2.5} />,  from: '#6366f1', to: '#8b5cf6', shadowColor: 'rgba(99,102,241,0.15)' },
    { label: 'LANGUAGE',   value: 'Fluent English',      icon: <Languages size={20} strokeWidth={2.5} />,      from: '#f59e0b', to: '#fb923c', shadowColor: 'rgba(245,158,11,0.15)' },
    { label: 'FOCUS',      value: 'Systems & Software',  icon: <Code2 size={20} strokeWidth={2.5} />,          from: '#10b981', to: '#14b8a6', shadowColor: 'rgba(16,185,129,0.15)' },
  ],
}

const TECH_STACK = [
  { icon: <Atom size={18} />,          label: 'React',      from: '#0ea5e9', to: '#38bdf8', glow: 'rgba(56,189,248,0.5)' },
  { icon: <FileCode2 size={18} />,     label: 'TypeScript', from: '#1d4ed8', to: '#60a5fa', glow: 'rgba(96,165,250,0.5)' },
  { icon: <Server size={18} />,        label: 'Node.js',    from: '#15803d', to: '#4ade80', glow: 'rgba(74,222,128,0.5)' },
  { icon: <FileJson size={18} />,      label: 'JavaScript', from: '#b45309', to: '#fde68a', glow: 'rgba(251,191,36,0.5)' },
  { icon: <Smartphone size={18}/>,     label: 'Flutter',    from: '#0284c7', to: '#7dd3fc', glow: 'rgba(125,211,252,0.5)' },
  { icon: <Terminal size={18} />,      label: 'Python',     from: '#4f46e5', to: '#a5b4fc', glow: 'rgba(129,140,248,0.5)' },
  { icon: <Database size={18} />,      label: 'SQL',        from: '#c2410c', to: '#fb923c', glow: 'rgba(249,115,22,0.5)' },
  { icon: <LayoutDashboard size={18}/>,label: 'HTML5',      from: '#b91c1c', to: '#f87171', glow: 'rgba(239,68,68,0.5)' },
  { icon: <Globe size={18} />,         label: 'Next.js',    from: '#334155', to: '#94a3b8', glow: 'rgba(203,213,225,0.5)' },
  { icon: <Gem size={18} />,           label: 'Ruby',       from: '#991b1b', to: '#f87171', glow: 'rgba(248,113,113,0.5)' },
  { icon: <Code2 size={18} />,         label: 'Rails',      from: '#7f1d1d', to: '#ef4444', glow: 'rgba(239,68,68,0.5)' },
]

const SOFT_SKILLS = {
  pt: [
    { label: 'Comunicação',           icon: <MessageCircle size={18} />, from: '#1d4ed8', to: '#60a5fa', glow: 'rgba(96,165,250,0.5)' },
    { label: 'Trabalho em Equipe',    icon: <Users size={18} />,         from: '#15803d', to: '#4ade80', glow: 'rgba(74,222,128,0.5)' },
    { label: 'Resolução de Problemas',icon: <Lightbulb size={18} />,     from: '#b45309', to: '#fde68a', glow: 'rgba(251,191,36,0.5)' },
    { label: 'Pensamento Analítico',  icon: <BarChart2 size={18} />,     from: '#c2410c', to: '#fb923c', glow: 'rgba(249,115,22,0.5)' },
    { label: 'Adaptabilidade',        icon: <RefreshCw size={18} />,     from: '#9d174d', to: '#f472b6', glow: 'rgba(244,114,182,0.5)' },
    { label: 'Proatividade',          icon: <Zap size={18} />,           from: '#4f46e5', to: '#a5b4fc', glow: 'rgba(129,140,248,0.5)' },
    { label: 'Atenção aos Detalhes',  icon: <Target size={18} />,        from: '#0e7490', to: '#22d3ee', glow: 'rgba(34,211,238,0.5)' },
    { label: 'Aprendizado Contínuo',  icon: <BookOpen size={18} />,      from: '#6d28d9', to: '#c084fc', glow: 'rgba(192,132,252,0.5)' },
  ],
  en: [
    { label: 'Communication',        icon: <MessageCircle size={18} />, from: '#1d4ed8', to: '#60a5fa', glow: 'rgba(96,165,250,0.5)' },
    { label: 'Teamwork',             icon: <Users size={18} />,         from: '#15803d', to: '#4ade80', glow: 'rgba(74,222,128,0.5)' },
    { label: 'Problem Solving',      icon: <Lightbulb size={18} />,     from: '#b45309', to: '#fde68a', glow: 'rgba(251,191,36,0.5)' },
    { label: 'Analytical Thinking',  icon: <BarChart2 size={18} />,     from: '#c2410c', to: '#fb923c', glow: 'rgba(249,115,22,0.5)' },
    { label: 'Adaptability',         icon: <RefreshCw size={18} />,     from: '#9d174d', to: '#f472b6', glow: 'rgba(244,114,182,0.5)' },
    { label: 'Proactivity',          icon: <Zap size={18} />,           from: '#4f46e5', to: '#a5b4fc', glow: 'rgba(129,140,248,0.5)' },
    { label: 'Attention to Detail',  icon: <Target size={18} />,        from: '#0e7490', to: '#22d3ee', glow: 'rgba(34,211,238,0.5)' },
    { label: 'Continuous Learning',  icon: <BookOpen size={18} />,      from: '#6d28d9', to: '#c084fc', glow: 'rgba(192,132,252,0.5)' },
  ],
}

const BIO = {
  pt: (
    <>
      Desenvolvedor focado em construir{' '}
      <span className="text-blue-400 font-bold drop-shadow-sm">sistemas robustos e escaláveis</span>
      , unindo uma base sólida em lógica e processamento de dados com o desenvolvimento Full Stack
      e Mobile. Apaixonado por transformar requisitos complexos em arquiteturas precisas e elegantes.
    </>
  ),
  en: (
    <>
      Developer focused on building{' '}
      <span className="text-blue-400 font-bold drop-shadow-sm">robust and scalable systems</span>
      , combining a solid foundation in logic and data processing with Full Stack and Mobile development.
      Passionate about transforming complex requirements into precise and elegant architectures.
    </>
  ),
}

const QUOTE = {
  pt: '"Código limpo não é sobre ser bonito — é sobre ser preciso."',
  en: '"Clean code is not about being pretty — it\'s about being precise."',
}

/* ─── Subcomponents ───────────────────────────────────────────── */

function TechOrb({ icon, from, to, glow, label }: (typeof TECH_STACK)[number]) {
  const [tapped, setTapped] = useState(false)

  function handleClick() {
    setTapped(true)
    setTimeout(() => setTapped(false), 1500)
  }

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
      onClick={handleClick}
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

      <span
        className={`absolute bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2 whitespace-nowrap px-4 py-2 rounded-[8px] text-[10px] font-bold text-white transition-all duration-200 pointer-events-none z-50
          ${tapped ? 'opacity-100 -translate-y-1' : 'opacity-0 group-hover:opacity-100 group-hover:-translate-y-1'}`}
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
  const { lang } = useLanguageStore()
  const roles = ROLES[lang]
  const highlights = HIGHLIGHTS[lang]
  const softSkills = SOFT_SKILLS[lang]

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
      <div className="flex flex-col sm:flex-row" style={{ gap: '16px' }}>
        <div
          className="flex-shrink-0 flex items-center justify-center overflow-hidden self-center sm:self-auto"
          style={{
            width: '120px',
            height: '120px',
            borderRadius: '24px',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: '0 0 25px rgba(168, 85, 247, 0.2)'
          }}
        >
          <img src="/vilanir.png" alt="José Vilanir" className="w-full h-full object-cover" />
        </div>

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
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white drop-shadow-md">
            José Vilanir
          </h1>
          <div className="flex flex-wrap" style={{ gap: '10px' }}>
            {roles.map((r, i) => (
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
          {BIO[lang]}
        </p>
      </div>

      {/* ── Info cards ── */}
      <div className="grid grid-cols-2 md:grid-cols-3" style={{ gap: '8px' }}>
        {highlights.map((h, i) => (
          <div
            key={i}
            className="flex flex-col relative overflow-hidden"
            style={{
              gap: '8px',
              padding: '12px',
              borderRadius: '16px',
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
            {lang === 'pt' ? 'Skills / Tech Stack' : 'Skills / Tech Stack'}
          </h3>
        </div>
        <div className="flex flex-wrap justify-start" style={{ gap: '16px' }}>
          {TECH_STACK.map((t, i) => (
            <TechOrb key={i} {...t} />
          ))}
        </div>
      </div>

      {/* ── Soft Skills ── */}
      <div
        style={{
          padding: '20px',
          borderRadius: '20px',
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div className="flex items-center" style={{ gap: '8px', marginBottom: '16px' }}>
          <div className="text-slate-400"><Brain size={14} /></div>
          <h3 className="uppercase font-bold text-slate-400 m-0" style={{ fontSize: '11px', letterSpacing: '0.15em' }}>
            {lang === 'pt' ? 'Soft Skills' : 'Soft Skills'}
          </h3>
        </div>
        <div className="flex flex-wrap justify-start" style={{ gap: '16px' }}>
          {softSkills.map((s, i) => (
            <TechOrb key={i} {...s} />
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
          {QUOTE[lang]}
        </p>
      </div>
    </div>
  )
}
