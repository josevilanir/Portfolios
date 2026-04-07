'use client'

import { useState, useRef, useEffect } from 'react'
import { useLanguageStore, Lang } from '@/store/useLanguageStore'

const INITIAL_OUTPUT = {
  pt: [
    { type: 'system', text: 'Vilanir OS — Terminal v1.0' },
    { type: 'system', text: 'Digite "help" para ver os comandos disponíveis.' },
    { type: 'blank',  text: '' },
  ],
  en: [
    { type: 'system', text: 'Vilanir OS — Terminal v1.0' },
    { type: 'system', text: 'Type "help" to see available commands.' },
    { type: 'blank',  text: '' },
  ],
}

const COMMANDS = {
  pt: {
    whoami: ['José Vilanir — Full Stack | Mobile | Data Engineer'],
    help: [
      'Comandos disponíveis:',
      '  whoami     — Identidade do desenvolvedor',
      '  exp        — Experiência profissional',
      '  skills     — Stack técnica completa',
      '  contact    — Formas de contato',
      '  lang en    — Mudar idioma para inglês',
      '  lang pt    — Manter idioma em português',
      '  clear      — Limpar terminal',
    ],
    exp: [
      'DATAPREV — Data Engineer (2 anos)',
      '  Apache Spark, Hadoop, Python, Hive, Oracle DB',
      '  Pipelines ETL, Data Lakes, Processamento em lote',
    ],
    skills: [
      'Frontend:  Next.js · React · TypeScript · Tailwind CSS',
      'Mobile:    Flutter · Dart',
      'Backend:   Node.js · Python · REST APIs',
      'Data:      Apache Spark · Hadoop · Hive · SQL · Oracle',
      'DevOps:    Docker · Git · CI/CD',
    ],
    contact: [
      'GitHub:    github.com/vilanir',
      'LinkedIn:  linkedin.com/in/vilanir',
      'Email:     josevilanir@email.com',
    ],
  },
  en: {
    whoami: ['José Vilanir — Full Stack | Mobile | Data Engineer'],
    help: [
      'Available commands:',
      '  whoami     — Developer identity',
      '  exp        — Professional experience',
      '  skills     — Full tech stack',
      '  contact    — Contact information',
      '  lang pt    — Switch language to Portuguese',
      '  lang en    — Keep language in English',
      '  clear      — Clear terminal',
    ],
    exp: [
      'DATAPREV — Data Engineer (2 years)',
      '  Apache Spark, Hadoop, Python, Hive, Oracle DB',
      '  ETL Pipelines, Data Lakes, Batch Processing',
    ],
    skills: [
      'Frontend:  Next.js · React · TypeScript · Tailwind CSS',
      'Mobile:    Flutter · Dart',
      'Backend:   Node.js · Python · REST APIs',
      'Data:      Apache Spark · Hadoop · Hive · SQL · Oracle',
      'DevOps:    Docker · Git · CI/CD',
    ],
    contact: [
      'GitHub:    github.com/vilanir',
      'LinkedIn:  linkedin.com/in/vilanir',
      'Email:     josevilanir@email.com',
    ],
  },
}

interface Line {
  type: string
  text: string
}

export default function TerminalApp() {
  const { lang, setLang } = useLanguageStore()
  const [lines, setLines] = useState<Line[]>(INITIAL_OUTPUT[lang])
  const [input, setInput] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)

  // Re-initialize output when language changes externally (e.g. via topbar toggle)
  const prevLangRef = useRef<Lang>(lang)
  useEffect(() => {
    if (prevLangRef.current !== lang) {
      prevLangRef.current = lang
      const msg = lang === 'pt'
        ? 'Idioma alterado para Português.'
        : 'Language switched to English.'
      setLines((prev) => [...prev, { type: 'system', text: msg }, { type: 'blank', text: '' }])
    }
  }, [lang])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [lines])

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase()
    const cmds = COMMANDS[lang]
    const newLines: Line[] = [
      ...lines,
      { type: 'prompt', text: `vilanir@os:~$ ${cmd}` },
    ]

    if (trimmed === 'clear') {
      const clearMsg = lang === 'pt'
        ? 'Terminal limpo. Digite "help" para ajuda.'
        : 'Terminal cleared. Type "help" for help.'
      setLines([{ type: 'system', text: clearMsg }])
      setInput('')
      return
    }

    // Handle lang command
    if (trimmed === 'lang en') {
      newLines.push({ type: 'system', text: 'Language switched to English.' })
      newLines.push({ type: 'blank', text: '' })
      setLines(newLines)
      setInput('')
      setLang('en')
      return
    }

    if (trimmed === 'lang pt') {
      newLines.push({ type: 'system', text: 'Idioma alterado para Português.' })
      newLines.push({ type: 'blank', text: '' })
      setLines(newLines)
      setInput('')
      setLang('pt')
      return
    }

    const result = cmds[trimmed as keyof typeof cmds]
    if (result) {
      result.forEach((r) => newLines.push({ type: 'result', text: r }))
    } else if (trimmed !== '') {
      const errMsg = lang === 'pt'
        ? `comando não encontrado: ${cmd}. Digite "help".`
        : `command not found: ${cmd}. Type "help".`
      newLines.push({ type: 'error', text: errMsg })
    }

    newLines.push({ type: 'blank', text: '' })
    setLines(newLines)
    setInput('')
  }

  const colorClass = (type: string) => {
    switch (type) {
      case 'system': return 'text-cyan-400'
      case 'prompt': return 'text-green-400'
      case 'result': return 'text-white/80'
      case 'error':  return 'text-red-400'
      default:       return 'text-white/0'
    }
  }

  const placeholder = lang === 'pt' ? 'digite um comando...' : 'type a command...'

  return (
    <div className="h-full flex flex-col bg-black/60 font-mono text-sm p-4 gap-1 overflow-auto">
      <div className="flex-1 overflow-auto">
        {lines.map((line, i) => (
          <div key={i} className={`leading-5 ${colorClass(line.type)}`}>
            {line.text || '\u00A0'}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="flex items-center gap-2 border-t border-white/10 pt-2 mt-1">
        <span className="text-green-400 shrink-0">vilanir@os:~$</span>
        <input
          autoFocus
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') handleCommand(input) }}
          className="flex-1 bg-transparent text-white outline-none caret-green-400 placeholder:text-white/30"
          placeholder={placeholder}
        />
      </div>
    </div>
  )
}
