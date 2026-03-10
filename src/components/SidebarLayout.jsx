import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { TOPICS } from '../data/topics'

const CASES = [
  { id: 'nominative',   label: 'Nominative',   pl: 'Mianownik' },
  { id: 'genitive',     label: 'Genitive',     pl: 'Dopełniacz' },
  { id: 'accusative',   label: 'Accusative',   pl: 'Biernik' },
  { id: 'dative',       label: 'Dative',       pl: 'Celownik' },
  { id: 'instrumental', label: 'Instrumental', pl: 'Narzędnik' },
  { id: 'locative',     label: 'Locative',     pl: 'Miejscownik' },
  { id: 'vocative',     label: 'Vocative',     pl: 'Wołacz' },
]

export default function SidebarLayout() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const isNounCasesLearn = pathname.startsWith('/learn/noun-cases')
  const activeCaseId = isNounCasesLearn ? pathname.split('/')[3] ?? null : null
  const activeLearnTopic = isNounCasesLearn
    ? 'noun-cases'
    : TOPICS.find(t => pathname === `/learn/${t.id}`)?.id ?? null

  return (
    <div className="flex h-screen bg-slate-50">

      {/* Sidebar */}
      <aside className="hidden md:flex w-64 flex-shrink-0 bg-white border-r border-gray-100 flex-col">

        {/* Logo */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-3 px-5 py-5 hover:bg-gray-50 transition-colors cursor-pointer text-left"
        >
          <span className="text-2xl">🇵🇱</span>
          <div>
            <div className="text-sm font-bold text-gray-900 leading-tight">Polish Grammar</div>
            <div className="text-xs text-gray-400">Exercise App</div>
          </div>
        </button>

        <div className="border-t border-gray-100" />

        {/* Nav content — scrollable */}
        <nav className="flex-1 overflow-y-auto py-3 space-y-5">

          {/* LEARN section */}
          <div>
            <div className="px-5 py-1">
              <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">Learn</span>
            </div>
            {TOPICS.map(t => {
              const isActive = activeLearnTopic === t.id
              const isNounCases = t.id === 'noun-cases'
              const showSubItems = isNounCases && isNounCasesLearn

              return (
                <div key={t.id}>
                  <button
                    onClick={() => navigate(`/learn/${t.id}`)}
                    className={`w-full flex items-center gap-3 px-5 py-2.5 text-left transition-colors cursor-pointer ${
                      isActive ? t.navActive : t.navHover
                    }`}
                  >
                    <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-base shrink-0 ${t.iconBg}`}>
                      {t.emoji}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className={`text-sm font-medium truncate ${isActive ? '' : 'text-gray-700'}`}>
                        {t.label}
                      </div>
                      <div className="text-xs text-gray-400 truncate">{t.labelPl}</div>
                    </div>
                    {isNounCases && (
                      <span className="text-gray-400 text-xs">{showSubItems ? '▼' : '▶'}</span>
                    )}
                  </button>

                  {/* Case sub-items — shown when on any noun-cases learn path */}
                  {showSubItems && (
                    <div className="ml-5 border-l border-blue-100 pl-3 pb-1">
                      {CASES.map(c => {
                        const isCaseActive = activeCaseId === c.id
                        return (
                          <button
                            key={c.id}
                            onClick={() => navigate(`/learn/noun-cases/${c.id}`)}
                            className={`w-full flex items-center gap-2 px-2 py-1.5 text-left rounded-lg transition-colors cursor-pointer ${
                              isCaseActive
                                ? 'bg-blue-50 text-blue-700'
                                : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
                            }`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${isCaseActive ? 'bg-blue-500' : 'bg-gray-300'}`} />
                            <span className={`text-xs ${isCaseActive ? 'font-semibold' : ''}`}>{c.label}</span>
                            <span className="text-xs text-gray-400 ml-auto">{c.pl}</span>
                          </button>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* PRACTICE section */}
          <div>
            <div className="px-5 py-1">
              <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">Practice</span>
            </div>
            {TOPICS.map(t => (
              <button
                key={t.id}
                onClick={() => navigate(`/difficulty/${t.id}`)}
                className={`w-full flex items-center gap-3 px-5 py-2.5 text-left transition-colors cursor-pointer ${t.navHover}`}
              >
                <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-base shrink-0 ${t.iconBg}`}>
                  {t.emoji}
                </span>
                <div className="min-w-0">
                  <div className="text-sm font-medium text-gray-700 truncate">{t.label}</div>
                  <div className="text-xs text-gray-400 truncate">{t.labelPl}</div>
                </div>
              </button>
            ))}
          </div>

        </nav>

        {/* Footer */}
        <div className="border-t border-gray-100 px-5 py-4">
          <p className="text-xs text-gray-400">520 questions · 5 topics · 3 levels</p>
        </div>

      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>

    </div>
  )
}
