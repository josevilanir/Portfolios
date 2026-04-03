'use client'

import { MapPin, Calendar, Code2, Database, Smartphone, Globe } from 'lucide-react'

const ROLES = [
  { icon: <Globe size={14} />, label: 'Full Stack Developer' },
  { icon: <Smartphone size={14} />, label: 'Mobile Developer' },
  { icon: <Database size={14} />, label: 'Data Engineer' },
]

const HIGHLIGHTS = [
  { label: 'Localização', value: 'Brasil', icon: <MapPin size={13} /> },
  { label: 'Idade', value: '22 anos', icon: <Calendar size={13} /> },
  { label: 'Foco', value: 'Lógica & Dados aplicados ao produto', icon: <Code2 size={13} /> },
]

export default function AboutMe() {
  return (
    <div className="h-full flex flex-col text-white p-6 gap-5 overflow-auto">
      {/* Avatar + Nome */}
      <div className="flex items-center gap-5">
        <div className="relative">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700
            flex items-center justify-center text-3xl font-bold shadow-xl ring-2 ring-white/20">
            JV
          </div>
          <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full ring-2 ring-black/30" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">José Vilanir</h1>
          <div className="flex flex-wrap gap-2 mt-2">
            {ROLES.map((r, i) => (
              <span
                key={i}
                className="flex items-center gap-1.5 text-xs px-2.5 py-1
                  bg-white/10 rounded-full border border-white/15 text-white/80"
              >
                {r.icon} {r.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bio */}
      <div className="bg-white/5 rounded-xl p-4 border border-white/10">
        <p className="text-sm text-white/80 leading-relaxed">
          Desenvolvedor apaixonado por <span className="text-blue-400 font-medium">lógica e processamento de dados</span>,
          aplicando essa robustez no desenvolvimento Full Stack e Mobile. Gosto de construir
          sistemas que resolvem problemas reais com clareza, performance e elegância.
        </p>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-3 gap-3">
        {HIGHLIGHTS.map((h, i) => (
          <div
            key={i}
            className="bg-white/5 rounded-xl p-3 border border-white/10 flex flex-col gap-1"
          >
            <div className="flex items-center gap-1.5 text-white/50">
              {h.icon}
              <span className="text-[10px] uppercase tracking-wider">{h.label}</span>
            </div>
            <span className="text-sm font-medium text-white/90">{h.value}</span>
          </div>
        ))}
      </div>

      {/* Philosophy */}
      <div className="mt-auto bg-gradient-to-r from-blue-500/10 to-purple-500/10
        rounded-xl p-4 border border-blue-400/20">
        <p className="text-xs text-white/60 italic text-center">
          "Código limpo não é sobre ser bonito — é sobre ser preciso."
        </p>
      </div>
    </div>
  )
}
