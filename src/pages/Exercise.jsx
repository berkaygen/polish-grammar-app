import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const TOPIC_LABELS = {
  'noun-cases': 'Noun Cases',
  'verb-conjugation': 'Verb Conjugation',
  'adjective-agreement': 'Adjective Agreement',
  'word-order': 'Sentence Word Order',
}

const TOPIC_PROGRESS = {
  'noun-cases':          'bg-blue-500',
  'verb-conjugation':    'bg-green-500',
  'adjective-agreement': 'bg-yellow-500',
  'word-order':          'bg-orange-500',
}

const DIFFICULTY_LABELS = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
}

const OPTIONS = ['A', 'B', 'C', 'D']

export default function Exercise() {
  const location = useLocation()
  const navigate = useNavigate()
  const state = location.state

  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [answered, setAnswered] = useState(false)
  const [score, setScore] = useState(0)

  useEffect(() => {
    if (!state) navigate('/', { replace: true })
  }, [])

  if (!state) return null

  const { questions, topic, difficulty, count } = state
  const q = questions[index]
  const isCorrect = selected === q.answer
  const isLast = index === questions.length - 1
  const progressPct = (index / questions.length) * 100
  const progressColor = TOPIC_PROGRESS[topic] || 'bg-blue-500'

  const handleSelect = (option) => {
    if (answered) return
    setSelected(option)
    setAnswered(true)
    if (option === q.answer) setScore(s => s + 1)
  }

  const handleNext = () => {
    if (isLast) {
      navigate('/results', { state: { topic, difficulty, count, score } })
    } else {
      setIndex(i => i + 1)
      setSelected(null)
      setAnswered(false)
    }
  }

  const getButtonClass = (option) => {
    const base = 'w-full text-left px-4 py-3 rounded-xl border-2 font-medium transition-all '
    if (!answered) {
      return base + 'border-gray-200 bg-white text-gray-800 hover:border-blue-400 hover:bg-blue-50 cursor-pointer'
    }
    if (option === q.answer) {
      return base + 'border-green-500 bg-green-50 text-green-800 cursor-default'
    }
    if (option === selected) {
      return base + 'border-red-400 bg-red-50 text-red-800 cursor-default'
    }
    return base + 'border-gray-100 bg-gray-50 text-gray-400 cursor-default'
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-xl w-full space-y-6">
        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-500">
            <span>{TOPIC_LABELS[topic]} · {DIFFICULTY_LABELS[difficulty]}</span>
            <span>Question {index + 1} of {questions.length}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`${progressColor} h-2 rounded-full transition-all duration-300`}
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        {/* Question card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
          <p className="text-lg font-medium text-gray-900 leading-relaxed">{q.question}</p>

          <div className="space-y-2">
            {q.options.map((opt, i) => {
              const letter = OPTIONS[i]
              return (
                <button
                  key={letter}
                  onClick={() => handleSelect(letter)}
                  className={getButtonClass(letter)}
                >
                  <span className="font-bold mr-2 text-gray-400">{letter}.</span>
                  <span>{opt}</span>
                  {answered && letter === q.answer && (
                    <span className="ml-2 text-green-600">✓</span>
                  )}
                  {answered && letter === selected && letter !== q.answer && (
                    <span className="ml-2 text-red-500">✗</span>
                  )}
                </button>
              )
            })}
          </div>

          {/* Feedback */}
          {answered && (
            <div className={`p-4 rounded-xl border-l-4 ${isCorrect ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-400'}`}>
              <p className={`font-semibold mb-1 ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                {isCorrect ? '✅ Correct!' : `❌ Incorrect — correct answer: ${q.answer}. ${q.options[OPTIONS.indexOf(q.answer)]}`}
              </p>
              <p className="text-sm text-gray-700">{q.explanation}</p>
            </div>
          )}
        </div>

        {/* Next button */}
        {answered && (
          <button
            onClick={handleNext}
            className="w-full py-3 bg-gray-900 hover:bg-gray-700 text-white font-semibold rounded-xl transition-colors cursor-pointer"
          >
            {isLast ? 'See Results →' : 'Next Question →'}
          </button>
        )}
      </div>
    </div>
  )
}
