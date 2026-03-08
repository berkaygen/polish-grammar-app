import { useNavigate } from 'react-router-dom'
import { TOPICS } from '../data/topics'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="p-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome</h1>
        <p className="text-gray-500 mt-2">
          Choose a topic to read the grammar explanation, then start practising with multiple-choice questions.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {TOPICS.map(t => (
          <button
            key={t.id}
            onClick={() => navigate(`/learn/${t.id}`)}
            className={`bg-white border-2 ${t.cardBorder} rounded-2xl p-6 text-left shadow-sm hover:shadow-md transition-all cursor-pointer`}
          >
            <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl text-2xl ${t.iconBg} mb-4`}>
              {t.emoji}
            </div>
            <h2 className="text-lg font-semibold text-gray-900">{t.label}</h2>
            <p className="text-xs font-medium text-gray-400 mb-1">{t.labelPl}</p>
            <p className="text-sm text-gray-500">{t.subtitle}</p>
            <p className="text-xs text-gray-400 italic">{t.subtitlePl}</p>
            <div className={`mt-4 inline-block text-xs font-semibold px-3 py-1 rounded-full ${t.tagBg}`}>
              Read &amp; Practise →
            </div>
          </button>
        ))}
      </div>

      <p className="mt-8 text-xs text-gray-400">
        340 questions across 4 topics · 3 difficulty levels
      </p>
    </div>
  )
}
