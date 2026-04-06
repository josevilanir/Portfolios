'use client'

import { GitBranch, BriefcaseBusiness, Mail, MessageSquare, ExternalLink } from 'lucide-react'

const CONTACTS = [
  {
    icon: <GitBranch size={20} />,
    label: 'GitHub',
    handle: '@josevilanir',
    href: 'https://github.com/josevilanir',
    color: 'from-gray-700 to-gray-900',
    hoverColor: 'hover:ring-gray-500/40',
  },
  {
    icon: <BriefcaseBusiness size={20} />,
    label: 'LinkedIn',
    handle: 'José Vilanir Souza',
    href: 'https://www.linkedin.com/in/jos%C3%A9-vilanir-souza-brito-neto-8a7b7527a/',
    color: 'from-blue-600 to-blue-800',
    hoverColor: 'hover:ring-blue-500/40',
  },
  {
    icon: <Mail size={20} />,
    label: 'Email',
    handle: 'vilanirneto@hotmail.com',
    href: 'mailto:vilanirneto@hotmail.com',
    color: 'from-red-500 to-rose-700',
    hoverColor: 'hover:ring-red-500/40',
  },
]

export default function Contact() {
  return (
    <div className="h-full flex flex-col items-center justify-center text-white p-8 gap-6">
      <div className="text-center">
        <MessageSquare size={32} className="text-white/40 mx-auto mb-3" />
        <h2 className="text-xl font-bold">Vamos conversar?</h2>
        <p className="text-sm text-white/60 mt-1">
          Aberto a oportunidades e colaborações interessantes.
        </p>
      </div>

      <div className="flex flex-col gap-3 w-full max-w-xs">
        {CONTACTS.map((c) => (
          <a
            key={c.label}
            href={c.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-4 p-4 rounded-xl
              bg-white/5 border border-white/10
              ring-2 ring-transparent ${c.hoverColor}
              hover:bg-white/10 transition-all duration-200 group`}
          >
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${c.color}
              flex items-center justify-center shadow-lg shrink-0`}>
              {c.icon}
            </div>
            <div className="flex-1">
              <p className="text-xs text-white/50">{c.label}</p>
              <p className="text-sm font-medium text-white/90">{c.handle}</p>
            </div>
            <ExternalLink size={14} className="text-white/30 group-hover:text-white/60 transition-colors" />
          </a>
        ))}
      </div>

      <p className="text-xs text-white/30 text-center mt-2">
        Disponível para projetos full time ou freelance.
      </p>
    </div>
  )
}
