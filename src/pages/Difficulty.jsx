import { useState } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { getQuestions, sampleQuestions } from '../data/questions'

const TOPIC_LABELS = {
  'noun-cases': 'Noun Cases',
  'verb-conjugation': 'Verb Conjugation',
  'adjective-agreement': 'Adjective Agreement',
  'word-order': 'Sentence Word Order',
  'vocabulary': 'Polish Vocabulary',
}

const TOPIC_COLORS = {
  'noun-cases':          { active: 'border-blue-500 bg-blue-50 text-blue-700',   ring: 'focus:ring-blue-300' },
  'verb-conjugation':    { active: 'border-green-500 bg-green-50 text-green-700', ring: 'focus:ring-green-300' },
  'adjective-agreement': { active: 'border-yellow-500 bg-yellow-50 text-yellow-700', ring: 'focus:ring-yellow-300' },
  'word-order':          { active: 'border-orange-500 bg-orange-50 text-orange-700', ring: 'focus:ring-orange-300' },
  'vocabulary':          { active: 'border-purple-500 bg-purple-50 text-purple-700', ring: 'focus:ring-purple-300' },
}

const TOPIC_START_COLORS = {
  'noun-cases':          'bg-blue-600 hover:bg-blue-700 disabled:bg-blue-200',
  'verb-conjugation':    'bg-green-600 hover:bg-green-700 disabled:bg-green-200',
  'adjective-agreement': 'bg-yellow-500 hover:bg-yellow-600 disabled:bg-yellow-200',
  'word-order':          'bg-orange-500 hover:bg-orange-600 disabled:bg-orange-200',
  'vocabulary':          'bg-purple-600 hover:bg-purple-700 disabled:bg-purple-200',
}

const DIFFICULTIES = [
  { id: 'beginner',     label: 'Beginner',     desc: 'Learning the rules for the first time' },
  { id: 'intermediate', label: 'Intermediate', desc: 'Knows the rules, needs practice' },
  { id: 'advanced',     label: 'Advanced',     desc: 'Edge cases and exceptions' },
]

const COUNTS = [5, 10, 20]

const ALL_CASES = [
  { id: 'nominative',   label: 'Nominative',   pl: 'Mianownik' },
  { id: 'genitive',     label: 'Genitive',     pl: 'Dopełniacz' },
  { id: 'accusative',   label: 'Accusative',   pl: 'Biernik' },
  { id: 'dative',       label: 'Dative',       pl: 'Celownik' },
  { id: 'instrumental', label: 'Instrumental', pl: 'Narzędnik' },
  { id: 'locative',     label: 'Locative',     pl: 'Miejscownik' },
  { id: 'vocative',     label: 'Vocative',     pl: 'Wołacz' },
]

const ALL_VOCAB_CATEGORIES = [
  { id: 'verbs',      label: 'Verbs',      pl: 'Czasowniki' },
  { id: 'nouns',      label: 'Nouns',      pl: 'Rzeczowniki' },
  { id: 'adjectives', label: 'Adjectives', pl: 'Przymiotniki' },
  { id: 'pronouns',   label: 'Pronouns',   pl: 'Zaimki' },
]

export default function Difficulty() {
  const { topic } = useParams()
  const navigate = useNavigate()
  const { state: navState } = useLocation()
  const [difficulty, setDifficulty] = useState(null)
  const [count, setCount] = useState(10)
  const [selectedCases, setSelectedCases] = useState(() => {
    if (navState?.preselectedCase) return new Set([navState.preselectedCase])
    return new Set(ALL_CASES.map(c => c.id))
  })
  const [selectedVocabCats, setSelectedVocabCats] = useState(
    () => new Set(ALL_VOCAB_CATEGORIES.map(c => c.id))
  )

  const colors = TOPIC_COLORS[topic] || TOPIC_COLORS['noun-cases']
  const startColor = TOPIC_START_COLORS[topic] || TOPIC_START_COLORS['noun-cases']
  const topicLabel = TOPIC_LABELS[topic] || topic
  const isNounCases = topic === 'noun-cases'
  const isVocabulary = topic === 'vocabulary'
  const hasSubtypeFilter = isNounCases || isVocabulary

  const subtypeItems = isNounCases ? ALL_CASES : isVocabulary ? ALL_VOCAB_CATEGORIES : []
  const selectedSubtypes = isNounCases ? selectedCases : selectedVocabCats
  const setSelectedSubtypes = isNounCases ? setSelectedCases : setSelectedVocabCats

  const toggleSubtype = (id) => {
    setSelectedSubtypes(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const toggleAll = () => {
    if (selectedSubtypes.size === subtypeItems.length) {
      setSelectedSubtypes(new Set())
    } else {
      setSelectedSubtypes(new Set(subtypeItems.map(c => c.id)))
    }
  }

  // Available question count for the current selection
  const availableCount = difficulty && hasSubtypeFilter
    ? getQuestions(topic, difficulty).filter(q => selectedSubtypes.has(q.subtype)).length
    : null

  const canStart = difficulty &&
    (!hasSubtypeFilter || (selectedSubtypes.size > 0 && availableCount > 0))

  const handleStart = () => {
    let pool = getQuestions(topic, difficulty)
    if (hasSubtypeFilter) {
      pool = pool.filter(q => selectedSubtypes.has(q.subtype))
    }
    const drawn = sampleQuestions(pool, count)
    navigate('/exercise', {
      state: { topic, difficulty, count, questions: drawn },
    })
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-lg w-full space-y-8">
        <div>
          <button
            onClick={() => navigate(`/learn/${topic}`)}
            className="text-sm text-gray-500 hover:text-gray-800 mb-6 flex items-center gap-1 transition-colors"
          >
            ← Back to {TOPIC_LABELS[topic] || 'topic'}
          </button>
          <h1 className="text-3xl font-bold text-gray-900">{topicLabel}</h1>
          <p className="text-gray-500 mt-1">Set up your practice session</p>
        </div>

        {/* Difficulty selection */}
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Choose difficulty</h2>
          <div className="space-y-2">
            {DIFFICULTIES.map(d => (
              <button
                key={d.id}
                onClick={() => setDifficulty(d.id)}
                className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all cursor-pointer ${
                  difficulty === d.id
                    ? colors.active
                    : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="font-medium">{d.label}</span>
                <span className="text-sm ml-2 opacity-70">— {d.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Session length selection */}
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Session length</h2>
          <div className="flex gap-3">
            {COUNTS.map(n => (
              <button
                key={n}
                onClick={() => setCount(n)}
                className={`flex-1 py-3 rounded-xl border-2 font-semibold text-lg transition-all cursor-pointer ${
                  count === n
                    ? colors.active
                    : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                }`}
              >
                {n}
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-400">questions per session</p>
        </div>

        {/* Subtype selection — Noun Cases or Vocabulary */}
        {hasSubtypeFilter && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                {isNounCases ? 'Select cases' : 'Select categories'}
              </h2>
              <button
                onClick={toggleAll}
                className={`text-xs transition-colors cursor-pointer ${
                  isVocabulary ? 'text-purple-600 hover:text-purple-800' : 'text-blue-600 hover:text-blue-800'
                }`}
              >
                {selectedSubtypes.size === subtypeItems.length ? 'Deselect all' : 'Select all'}
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {subtypeItems.map(c => {
                const checked = selectedSubtypes.has(c.id)
                const checkedBorder = isVocabulary ? 'border-purple-400 bg-purple-50' : 'border-blue-400 bg-blue-50'
                const checkedBox = isVocabulary ? 'bg-purple-500 border-purple-500 text-white' : 'bg-blue-500 border-blue-500 text-white'
                const checkedText = isVocabulary ? 'text-purple-800' : 'text-blue-800'
                return (
                  <button
                    key={c.id}
                    onClick={() => toggleSubtype(c.id)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl border-2 text-left transition-all cursor-pointer ${
                      checked ? checkedBorder : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <span className={`w-4 h-4 rounded border-2 flex-shrink-0 flex items-center justify-center text-xs ${
                      checked ? checkedBox : 'border-gray-300'
                    }`}>
                      {checked && '✓'}
                    </span>
                    <span>
                      <span className={`block text-sm font-medium ${checked ? checkedText : 'text-gray-700'}`}>
                        {c.label}
                      </span>
                      <span className="block text-xs text-gray-400">{c.pl}</span>
                    </span>
                  </button>
                )
              })}
            </div>
            {selectedSubtypes.size === 0 && (
              <p className="text-xs text-red-500">
                Select at least one {isNounCases ? 'case' : 'category'} to start.
              </p>
            )}
            {availableCount !== null && selectedSubtypes.size > 0 && (
              <p className={`text-xs ${availableCount === 0 ? 'text-red-500' : 'text-gray-400'}`}>
                {availableCount === 0
                  ? `No questions available for this difficulty + ${isNounCases ? 'case' : 'category'} combination.`
                  : `${availableCount} question${availableCount !== 1 ? 's' : ''} available${availableCount < count ? ` — session will have ${availableCount}` : ''}`}
              </p>
            )}
          </div>
        )}

        {/* Start button */}
        <button
          onClick={handleStart}
          disabled={!canStart}
          className={`w-full py-4 rounded-xl text-white font-semibold text-lg transition-all cursor-pointer disabled:cursor-not-allowed ${startColor}`}
        >
          {!difficulty
            ? 'Select a difficulty to start'
            : hasSubtypeFilter && selectedSubtypes.size === 0
              ? `Select at least one ${isNounCases ? 'case' : 'category'}`
              : hasSubtypeFilter && availableCount === 0
                ? 'No questions for this selection'
                : `Start ${Math.min(count, availableCount ?? count)} questions →`}
        </button>
      </div>
    </div>
  )
}
