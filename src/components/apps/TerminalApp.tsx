'use client'

import { useState, useRef, useEffect } from 'react'

const INITIAL_OUTPUT = [
  { type: 'system', text: 'Vilanir OS — Terminal v1.0' },
  { type: 'system', text: 'Digite "help" para ver os comandos disponíveis.' },
  { type: 'blank', text: '' },
  { type: 'output', text: '> whoami' },
  { type: 'result', text: 'José Vilanir — Full Stack | Mobile | Data Engineer' },
  { type: 'blank', text: '' },
  { type: 'output', text: '> cat experiencia.txt' },
  { type: 'result', text: '╔══════════════════════════════════════╗' },
  { type: 'result', text: '║  DATAPREV — Empresa de Tecnologia   ║' },
  { type: 'result', text: '║  Governo Federal do Brasil           ║' },
  { type: 'result', text: '╠══════════════════════════════════════╣' },
  { type: 'result', text: '║  Cargo:   Data Engineer              ║' },
  { type: 'result', text: '║  Período: 2 anos                     ║' },
  { type: 'result', text: '╠══════════════════════════════════════╣' },
  { type: 'result', text: '║  Stack:                              ║' },
  { type: 'result', text: '║  → Apache Spark (PySpark)            ║' },
  { type: 'result', text: '║  → Hadoop (HDFS, YARN, MapReduce)    ║' },
  { type: 'result', text: '║  → Python (Pandas, NumPy)            ║' },
  { type: 'result', text: '║  → Apache Hive (HQL)                 ║' },
  { type: 'result', text: '║  → Oracle Database (PL/SQL)          ║' },
  { type: 'result', text: '║  → ETL Pipelines & Data Lakes        ║' },
  { type: 'result', text: '╚══════════════════════════════════════╝' },
  { type: 'blank', text: '' },
]

const COMMANDS: Record<string, string[]> = {
  help: [
    'Comandos disponíveis:',
    '  whoami     — Identidade do desenvolvedor',
    '  exp        — Experiência profissional',
    '  skills     — Stack técnica completa',
    '  contact    — Formas de contato',
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
}

interface Line {
  type: string
  text: string
}

export default function TerminalApp() {
  const [lines, setLines] = useState<Line[]>(INITIAL_OUTPUT)
  const [input, setInput] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [lines])

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase()
    const newLines: Line[] = [
      ...lines,
      { type: 'prompt', text: `vilanir@os:~$ ${cmd}` },
    ]

    if (trimmed === 'clear') {
      setLines([{ type: 'system', text: 'Terminal limpo. Digite "help" para ajuda.' }])
      setInput('')
      return
    }

    const result = COMMANDS[trimmed]
    if (result) {
      result.forEach((r) => newLines.push({ type: 'result', text: r }))
    } else if (trimmed !== '') {
      newLines.push({ type: 'error', text: `comando não encontrado: ${cmd}. Digite "help".` })
    }

    newLines.push({ type: 'blank', text: '' })
    setLines(newLines)
    setInput('')
  }

  const colorClass = (type: string) => {
    switch (type) {
      case 'system': return 'text-cyan-400'
      case 'prompt': return 'text-green-400'
      case 'output': return 'text-yellow-300'
      case 'result': return 'text-white/80'
      case 'error': return 'text-red-400'
      default: return 'text-white/0'
    }
  }

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

      {/* Input */}
      <div className="flex items-center gap-2 border-t border-white/10 pt-2 mt-1">
        <span className="text-green-400 shrink-0">vilanir@os:~$</span>
        <input
          autoFocus
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleCommand(input)
          }}
          className="flex-1 bg-transparent text-white outline-none caret-green-400 placeholder:text-white/30"
          placeholder="digite um comando..."
        />
      </div>
    </div>
  )
}
