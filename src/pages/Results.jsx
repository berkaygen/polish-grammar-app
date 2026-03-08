import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getQuestions, sampleQuestions } from '../data/questions'

const TOPIC_LABELS = {
  'noun-cases': 'Noun Cases',
  'verb-conjugation': 'Verb Conjugation',
  'adjective-agreement': 'Adjective Agreement',
  'word-order': 'Sentence Word Order',
}

const DIFFICULTY_LABELS = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
}

const TOPIC_BUTTON = {
  'noun-cases':          'bg-blue-600 hover:bg-blue-700',
  'verb-conjugation':    'bg-green-600 hover:bg-green-700',
  'adjective-agreement': 'bg-yellow-500 hover:bg-yellow-600',
  'word-order':          'bg-orange-500 hover:bg-orange-600',
}

const TOPIC_BAR = {
  'noun-cases':          'bg-blue-500',
  'verb-conjugation':    'bg-green-500',
  'adjective-agreement': 'bg-yellow-500',
  'word-order':          'bg-orange-500',
}

function getMessage(score, count) {
  const pct = score / count
  if (pct >= 0.9) return { pl: 'Świetnie!', en: 'Excellent!', color: 'text-green-600', emoji: '🏆' }
  if (pct >= 0.6) return { pl: 'Dobrze!', en: 'Good job!', color: 'text-blue-600', emoji: '👍' }
  return { pl: 'Ćwicz dalej!', en: 'Keep practising!', color: 'text-orange-500', emoji: '💪' }
}

export default function Results() {
  const location = useLocation()
  const navigate = useNavigate()
  const state = location.state

  useEffect(() => {
    if (!state) navigate('/', { replace: true })
  }, [])

  if (!state) return null

  const { score, count, topic, difficulty } = state
  const msg = getMessage(score, count)
  const pct = Math.round((score / count) * 100)
  const barColor = TOPIC_BAR[topic] || 'bg-blue-500'
  const btnColor = TOPIC_BUTTON[topic] || 'bg-blue-600 hover:bg-blue-700'

  const handleTryAgain = () => {
    const pool = getQuestions(topic, difficulty)
    const drawn = sampleQuestions(pool, count)
    navigate('/exercise', { state: { topic, difficulty, count, questions: drawn } })
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full space-y-6">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center space-y-4">
          <p className="text-4xl">{msg.emoji}</p>
          <h1 className="text-2xl font-bold text-gray-900">Session Complete</h1>

          {/* Score */}
          <div className="space-y-2">
            <p className="text-6xl font-bold text-gray-900">{score}<span className="text-3xl text-gray-400">/{count}</span></p>
            <p className={`text-xl font-semibold ${msg.color}`}>{msg.pl} <span className="text-gray-500 font-normal text-base">({msg.en})</span></p>
          </div>

          {/* Score bar */}
          <div className="space-y-1">
            <div className="w-full bg-gray-100 rounded-full h-3">
              <div
                className={`${barColor} h-3 rounded-full transition-all`}
                style={{ width: `${pct}%` }}
              />
            </div>
            <p className="text-sm text-gray-400">{pct}% correct</p>
          </div>

          <div className="text-sm text-gray-500 space-y-1 pt-2 border-t border-gray-100">
            <p><span className="font-medium">Topic:</span> {TOPIC_LABELS[topic]}</p>
            <p><span className="font-medium">Difficulty:</span> {DIFFICULTY_LABELS[difficulty]}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button
            onClick={handleTryAgain}
            className={`w-full py-3 ${btnColor} text-white font-semibold rounded-xl transition-colors cursor-pointer`}
          >
            Try Again — {count} new questions
          </button>
          <button
            onClick={() => navigate('/')}
            className="w-full py-3 bg-white border-2 border-gray-200 hover:border-gray-400 text-gray-700 font-semibold rounded-xl transition-colors cursor-pointer"
          >
            Change Topic
          </button>
        </div>
      </div>
    </div>
  )
}
