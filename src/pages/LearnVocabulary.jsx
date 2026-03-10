import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { VOCAB_CATEGORIES, VOCABULARY } from '../data/vocabulary'

export default function LearnVocabulary() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('verbs')
  const [search, setSearch] = useState('')

  const words = VOCABULARY.filter(w => {
    if (w.category !== activeTab) return false
    if (!search) return true
    const q = search.toLowerCase()
    return w.pl.toLowerCase().includes(q) || w.en.toLowerCase().includes(q)
  })

  const activeCategory = VOCAB_CATEGORIES.find(c => c.id === activeTab)
  const totalForTab = VOCABULARY.filter(w => w.category === activeTab).length

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <span className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center text-xl">📚</span>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Polish Vocabulary</h1>
            <p className="text-sm text-gray-500">Słownictwo Polskie</p>
          </div>
        </div>
        <p className="text-gray-600 mt-3">
          The most common Polish words you need to know. Each word includes an example sentence and a memory tip.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 flex-wrap">
        {VOCAB_CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => { setActiveTab(cat.id); setSearch('') }}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer ${
              activeTab === cat.id
                ? 'bg-purple-600 text-white shadow-sm'
                : 'bg-white border border-gray-200 text-gray-600 hover:border-purple-300 hover:text-purple-700'
            }`}
          >
            {cat.emoji} {cat.label} <span className="text-xs opacity-70">({cat.labelPl})</span>
          </button>
        ))}
      </div>

      {/* Search + count */}
      <div className="flex items-center gap-4 flex-wrap">
        <input
          type="text"
          placeholder={`Search ${activeCategory?.label.toLowerCase() || ''}…`}
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 min-w-[200px] px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100"
        />
        <span className="text-sm text-gray-400">
          {words.length}{search ? ` of ${totalForTab}` : ''} {activeCategory?.label.toLowerCase()}
        </span>
      </div>

      {/* Word table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-purple-50 text-purple-800">
                <th className="text-left px-5 py-3 font-semibold">Polish</th>
                <th className="text-left px-5 py-3 font-semibold">English</th>
                <th className="text-left px-5 py-3 font-semibold hidden md:table-cell">Example</th>
                <th className="text-left px-5 py-3 font-semibold hidden lg:table-cell">Tip</th>
              </tr>
            </thead>
            <tbody>
              {words.map((w, i) => (
                <tr key={w.pl} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                  <td className="px-5 py-3 font-medium text-gray-900">{w.pl}</td>
                  <td className="px-5 py-3 text-gray-700">{w.en}</td>
                  <td className="px-5 py-3 text-gray-500 hidden md:table-cell">
                    <span className="block">{w.example}</span>
                    <span className="block text-xs text-gray-400 italic">{w.exampleEn}</span>
                  </td>
                  <td className="px-5 py-3 text-gray-500 text-xs hidden lg:table-cell">{w.tip}</td>
                </tr>
              ))}
              {words.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-5 py-8 text-center text-gray-400">
                    No words match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Start Practising */}
      <div className="text-center pt-4">
        <button
          onClick={() => navigate('/difficulty/vocabulary')}
          className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-colors cursor-pointer"
        >
          Start Practising →
        </button>
      </div>
    </div>
  )
}
