import { useParams, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { getTopic } from '../data/topics'

const CASES_OVERVIEW = [
  { id: 'nominative',   name: 'Nominative',   pl: 'Mianownik',   q: 'Kto? Co?',       ex: 'Pies śpi.',           tr: 'The dog sleeps.',        note: 'Subject of the sentence' },
  { id: 'genitive',     name: 'Genitive',     pl: 'Dopełniacz',  q: 'Kogo? Czego?',   ex: 'Nie ma psa.',         tr: 'There is no dog.',       note: 'Possession, negation, quantity' },
  { id: 'accusative',   name: 'Accusative',   pl: 'Biernik',     q: 'Kogo? Co?',      ex: 'Widzę psa.',          tr: 'I see the dog.',         note: 'Direct object' },
  { id: 'dative',       name: 'Dative',       pl: 'Celownik',    q: 'Komu? Czemu?',   ex: 'Daję psu kość.',      tr: 'I give the dog a bone.', note: 'Indirect object — to/for whom' },
  { id: 'instrumental', name: 'Instrumental', pl: 'Narzędnik',   q: 'Kim? Czym?',     ex: 'Jestem studentem.',   tr: 'I am a student.',        note: 'Means, company, professions' },
  { id: 'locative',     name: 'Locative',     pl: 'Miejscownik', q: 'O kim? O czym?', ex: 'Mieszkam w Polsce.',  tr: 'I live in Poland.',      note: 'Location — always with a preposition' },
  { id: 'vocative',     name: 'Vocative',     pl: 'Wołacz',      q: '—',              ex: 'Mamo, chodź!',        tr: 'Mum, come here!',        note: 'Direct address' },
]

// ─── Noun Cases content ───────────────────────────────────────────────────────

function NounCasesContent({ navigate }) {
  return (
    <div className="space-y-8">
      <p className="text-gray-600 leading-relaxed">
        Polish nouns change their endings depending on their grammatical role in the sentence.
        This system of endings is called <strong>cases</strong> (przypadki). There are 7 cases in Polish.
        Learning which ending to use — and when — is one of the most important skills in Polish grammar.
      </p>

      {/* Case table — rows are clickable */}
      <section>
        <h2 className="text-lg font-bold text-gray-900 mb-1">The 7 Cases at a Glance</h2>
        <p className="text-sm text-gray-400 mb-3">Click any case to read the full detailed explanation.</p>
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wide">
              <tr>
                <th className="text-left px-4 py-3">Case</th>
                <th className="text-left px-4 py-3">Polish</th>
                <th className="text-left px-4 py-3 hidden sm:table-cell">Answers</th>
                <th className="text-left px-4 py-3">Example</th>
                <th className="text-left px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {CASES_OVERVIEW.map((c, i) => (
                <tr
                  key={c.name}
                  onClick={() => navigate(`/learn/noun-cases/${c.id}`)}
                  className={`cursor-pointer transition-colors hover:bg-blue-50 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}
                >
                  <td className="px-4 py-3 font-semibold text-gray-900">{c.name}</td>
                  <td className="px-4 py-3 text-blue-700 font-medium">{c.pl}</td>
                  <td className="px-4 py-3 text-gray-500 hidden sm:table-cell">{c.q}</td>
                  <td className="px-4 py-3">
                    <span className="font-medium text-gray-800 italic">{c.ex}</span>
                    <span className="text-gray-400 ml-2 hidden sm:inline">({c.tr})</span>
                    <div className="text-xs text-gray-400 mt-0.5">{c.note}</div>
                  </td>
                  <td className="px-4 py-3 text-blue-400 text-xs">→</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Case cards */}
      <section>
        <h2 className="text-lg font-bold text-gray-900 mb-3">Explore Each Case in Detail</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {CASES_OVERVIEW.map(c => (
            <button
              key={c.id}
              onClick={() => navigate(`/learn/noun-cases/${c.id}`)}
              className="bg-white border-2 border-blue-100 hover:border-blue-300 hover:bg-blue-50 rounded-xl p-4 text-left transition-all cursor-pointer"
            >
              <div className="font-semibold text-gray-900 text-sm">{c.name}</div>
              <div className="text-xs text-blue-600 font-medium">{c.pl}</div>
              <div className="text-xs text-gray-400 mt-1 italic">{c.q}</div>
              <div className="text-xs text-blue-500 mt-2">Read more →</div>
            </button>
          ))}
        </div>
      </section>

      {/* Key endings */}
      <section>
        <h2 className="text-lg font-bold text-gray-900 mb-3">Key Noun Endings</h2>
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wide">
              <tr>
                <th className="text-left px-4 py-3">Case</th>
                <th className="text-left px-4 py-3">Masculine</th>
                <th className="text-left px-4 py-3">Feminine</th>
                <th className="text-left px-4 py-3">Neuter</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                { c: 'Nominative', m: '—', f: '-a', n: '-o / -e' },
                { c: 'Genitive',   m: '-a (animate) / -u (inanimate)', f: '-y / -i', n: '-a' },
                { c: 'Dative',     m: '-owi / -u (irreg.)', f: '-e / -ie', n: '-u' },
                { c: 'Accusative', m: '= Gen (animate) / = Nom (inanimate)', f: '-ę', n: '= Nom' },
                { c: 'Instrumental', m: '-em / -iem', f: '-ą', n: '-em / -iem' },
                { c: 'Locative',   m: '-e / -ie / -u', f: '-e / -ie / -y / -i', n: '-e / -u' },
                { c: 'Vocative',   m: '-e / -ie / -u', f: '-o / -i / -y', n: '= Nom' },
              ].map((r, i) => (
                <tr key={r.c} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                  <td className="px-4 py-3 font-semibold text-gray-900 text-xs">{r.c}</td>
                  <td className="px-4 py-3 font-mono text-blue-800 text-xs">{r.m}</td>
                  <td className="px-4 py-3 font-mono text-blue-800 text-xs">{r.f}</td>
                  <td className="px-4 py-3 font-mono text-blue-800 text-xs">{r.n}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-2">Endings vary by noun type and stem; these are the main patterns.</p>
      </section>

      {/* Prepositions */}
      <section>
        <h2 className="text-lg font-bold text-gray-900 mb-3">Prepositions and Their Cases</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { case: 'Genitive', pl: 'Dopełniacz', preps: 'do, od, z (from), bez, dla, obok, koło, spod, zza, u' },
            { case: 'Dative',   pl: 'Celownik',   preps: 'ku, dzięki, przeciwko, wbrew' },
            { case: 'Accusative', pl: 'Biernik', preps: 'przez, na (motion), w (motion), nad (motion), pod (motion), za (motion), przed (motion)' },
            { case: 'Instrumental', pl: 'Narzędnik', preps: 'z (with), nad, pod, za, przed, między (static position)' },
            { case: 'Locative',  pl: 'Miejscownik', preps: 'w, na (static), przy, o, po, po (after)' },
          ].map(p => (
            <div key={p.case} className="bg-gray-50 rounded-xl px-4 py-3">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="font-semibold text-sm text-gray-900">{p.case}</span>
                <span className="text-xs text-blue-600">{p.pl}</span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">{p.preps}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tips */}
      <section className="bg-blue-50 rounded-xl px-5 py-4 border border-blue-100">
        <h3 className="font-semibold text-blue-900 mb-2">Key things to remember</h3>
        <ul className="space-y-1 text-sm text-blue-800">
          <li>• The <strong>Locative</strong> is the only case that can never appear without a preposition.</li>
          <li>• After <strong>nie</strong> (not), the Accusative object usually becomes Genitive: <em>Mam czas / Nie mam czasu.</em></li>
          <li>• Animate masculine nouns use the <strong>Genitive form as Accusative</strong>: widzę psa, znam brata.</li>
          <li>• Common irregular Datives: brat → bratu, ojciec → ojcu, pies → psu, pan → panu.</li>
        </ul>
      </section>
    </div>
  )
}

// ─── Verb Conjugation content ─────────────────────────────────────────────────

function VerbConjugationContent() {
  return (
    <div className="space-y-8">
      <p className="text-gray-600 leading-relaxed">
        Polish verbs change their endings to agree with the subject in <strong>person</strong> and <strong>number</strong>.
        They also encode <strong>tense</strong>, <strong>aspect</strong> (perfective/imperfective), and in the past tense the <strong>gender</strong> of the subject.
      </p>

      {/* Present tense */}
      <section>
        <h2 className="text-lg font-bold text-gray-900 mb-3">Present Tense Conjugation</h2>
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wide">
              <tr>
                <th className="text-left px-4 py-3">Person</th>
                <th className="text-left px-4 py-3">czytać <span className="font-normal text-gray-400">(to read)</span></th>
                <th className="text-left px-4 py-3">mówić <span className="font-normal text-gray-400">(to speak)</span></th>
                <th className="text-left px-4 py-3">pisać <span className="font-normal text-gray-400">(to write)</span></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                { p: 'ja (I)',          v1: 'czytam',   v2: 'mówię',   v3: 'piszę' },
                { p: 'ty (you)',        v1: 'czytasz',  v2: 'mówisz',  v3: 'piszesz' },
                { p: 'on/ona/ono',      v1: 'czyta',    v2: 'mówi',    v3: 'pisze' },
                { p: 'my (we)',         v1: 'czytamy',  v2: 'mówimy',  v3: 'piszemy' },
                { p: 'wy (you pl.)',    v1: 'czytacie', v2: 'mówicie', v3: 'piszecie' },
                { p: 'oni/one (they)', v1: 'czytają',  v2: 'mówią',   v3: 'piszą' },
              ].map((r, i) => (
                <tr key={r.p} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                  <td className="px-4 py-3 text-gray-500 text-xs">{r.p}</td>
                  <td className="px-4 py-3 font-medium text-gray-900">{r.v1}</td>
                  <td className="px-4 py-3 font-medium text-gray-900">{r.v2}</td>
                  <td className="px-4 py-3 font-medium text-gray-900">{r.v3}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Past tense */}
      <section>
        <h2 className="text-lg font-bold text-gray-900 mb-3">Past Tense — Gender-Sensitive Endings</h2>
        <p className="text-sm text-gray-600 mb-3">Past tense endings encode both person and the <strong>gender of the subject</strong>.</p>
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wide">
              <tr>
                <th className="text-left px-4 py-3">Person</th>
                <th className="text-left px-4 py-3">Masculine</th>
                <th className="text-left px-4 py-3">Feminine</th>
                <th className="text-left px-4 py-3">Neuter / Pl.</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                { p: 'ja (I)',         m: 'czytałem',    f: 'czytałam',    n: '—' },
                { p: 'ty (you)',       m: 'czytałeś',    f: 'czytałaś',    n: '—' },
                { p: 'on / ona / ono', m: 'czytał',     f: 'czytała',     n: 'czytało' },
                { p: 'my (we)',        m: 'czytaliśmy',  f: 'czytałyśmy',  n: '—' },
                { p: 'wy (you pl.)',   m: 'czytaliście', f: 'czytałyście', n: '—' },
                { p: 'oni / one',      m: 'czytali',    f: 'czytały',     n: '—' },
              ].map((r, i) => (
                <tr key={r.p} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                  <td className="px-4 py-3 text-gray-500 text-xs">{r.p}</td>
                  <td className="px-4 py-3 font-medium text-gray-900">{r.m}</td>
                  <td className="px-4 py-3 font-medium text-gray-900">{r.f}</td>
                  <td className="px-4 py-3 text-gray-400">{r.n}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Aspect */}
      <section>
        <h2 className="text-lg font-bold text-gray-900 mb-3">Aspect: Perfective vs Imperfective</h2>
        <p className="text-sm text-gray-600 mb-3">
          Most Polish verbs come in <strong>pairs</strong>. The imperfective describes an ongoing or repeated action; the perfective describes a completed one.
        </p>
        <div className="rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wide">
              <tr>
                <th className="text-left px-4 py-3">Imperfective</th>
                <th className="text-left px-4 py-3">Perfective</th>
                <th className="text-left px-4 py-3">Meaning</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                { imp: 'czytać', perf: 'przeczytać', en: 'to read / to finish reading' },
                { imp: 'pisać',  perf: 'napisać',    en: 'to write / to finish writing' },
                { imp: 'robić',  perf: 'zrobić',     en: 'to do / to finish doing' },
                { imp: 'mówić',  perf: 'powiedzieć', en: 'to speak / to say (once, complete)' },
                { imp: 'uczyć się', perf: 'nauczyć się', en: 'to study / to learn (successfully)' },
              ].map((r, i) => (
                <tr key={r.imp} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                  <td className="px-4 py-3 font-medium text-gray-900">{r.imp}</td>
                  <td className="px-4 py-3 font-medium text-green-700">{r.perf}</td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{r.en}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Future tense */}
      <section>
        <h2 className="text-lg font-bold text-gray-900 mb-3">Future Tense</h2>
        <p className="text-sm text-gray-600 mb-4">
          Polish has <strong>two future tense forms</strong> determined by aspect.
        </p>

        {/* Simple future */}
        <div className="mb-5">
          <h3 className="text-sm font-bold text-gray-800 mb-1">1. Simple Future — Perfective verbs</h3>
          <p className="text-sm text-gray-600 mb-3">
            Perfective verbs have no present tense — their present-tense conjugation automatically means <strong>future</strong> (completed action).
          </p>
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                <tr>
                  <th className="text-left px-4 py-3">Person</th>
                  <th className="text-left px-4 py-3">przeczytać <span className="font-normal text-gray-400">(to read &amp; finish)</span></th>
                  <th className="text-left px-4 py-3">napisać <span className="font-normal text-gray-400">(to write &amp; finish)</span></th>
                  <th className="text-left px-4 py-3">zrobić <span className="font-normal text-gray-400">(to do &amp; finish)</span></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  { p: 'ja',          v1: 'przeczytam',   v2: 'napiszę',    v3: 'zrobię' },
                  { p: 'ty',          v1: 'przeczytasz',  v2: 'napiszesz',  v3: 'zrobisz' },
                  { p: 'on/ona/ono',  v1: 'przeczyta',    v2: 'napisze',    v3: 'zrobi' },
                  { p: 'my',          v1: 'przeczytamy',  v2: 'napiszemy',  v3: 'zrobimy' },
                  { p: 'wy',          v1: 'przeczytacie', v2: 'napiszecie', v3: 'zrobicie' },
                  { p: 'oni/one',     v1: 'przeczytają',  v2: 'napiszą',    v3: 'zrobią' },
                ].map((r, i) => (
                  <tr key={r.p} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                    <td className="px-4 py-3 text-gray-500 text-xs">{r.p}</td>
                    <td className="px-4 py-3 font-medium text-gray-900">{r.v1}</td>
                    <td className="px-4 py-3 font-medium text-gray-900">{r.v2}</td>
                    <td className="px-4 py-3 font-medium text-gray-900">{r.v3}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Compound future */}
        <div className="mb-5">
          <h3 className="text-sm font-bold text-gray-800 mb-1">2. Compound Future — Imperfective verbs</h3>
          <p className="text-sm text-gray-600 mb-2">
            Formed with the future of <strong>być</strong> (będę, będziesz…) + <strong>infinitive</strong> <em>or</em> <strong>past tense form</strong>. Both variants are equally correct.
          </p>
          <div className="overflow-x-auto rounded-xl border border-gray-200 mb-3">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                <tr>
                  <th className="text-left px-4 py-3">Person</th>
                  <th className="text-left px-4 py-3">będę + infinitive</th>
                  <th className="text-left px-4 py-3">będę + past form (m / f)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  { p: 'ja',          a: 'będę czytać',    b: 'będę czytał / czytała' },
                  { p: 'ty',          a: 'będziesz czytać', b: 'będziesz czytał / czytała' },
                  { p: 'on/ona/ono',  a: 'będzie czytać',  b: 'będzie czytał / czytała / czytało' },
                  { p: 'my',          a: 'będziemy czytać', b: 'będziemy czytali / czytały' },
                  { p: 'wy',          a: 'będziecie czytać', b: 'będziecie czytali / czytały' },
                  { p: 'oni/one',     a: 'będą czytać',    b: 'będą czytali / czytały' },
                ].map((r, i) => (
                  <tr key={r.p} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                    <td className="px-4 py-3 text-gray-500 text-xs">{r.p}</td>
                    <td className="px-4 py-3 font-medium text-gray-900">{r.a}</td>
                    <td className="px-4 py-3 font-medium text-gray-900">{r.b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* być future */}
          <div className="bg-gray-50 rounded-xl px-4 py-3">
            <p className="text-xs font-bold text-gray-600 uppercase tracking-wide mb-2">Future of być (to be)</p>
            <div className="flex flex-wrap gap-2">
              {['będę', 'będziesz', 'będzie', 'będziemy', 'będziecie', 'będą'].map(f => (
                <span key={f} className="font-mono font-bold text-gray-900 bg-white border border-gray-200 rounded px-2 py-1 text-sm">{f}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Contrast */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-green-50 border border-green-100 rounded-xl px-4 py-3">
            <div className="text-xs font-bold text-green-700 uppercase mb-1">Perfective → Simple future</div>
            <div className="font-bold text-gray-900 italic mb-0.5">Przeczytam książkę.</div>
            <div className="text-xs text-gray-500">I will read (and finish) the book.</div>
            <div className="text-xs text-green-700 mt-1">Completed, definite result</div>
          </div>
          <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
            <div className="text-xs font-bold text-blue-700 uppercase mb-1">Imperfective → Compound future</div>
            <div className="font-bold text-gray-900 italic mb-0.5">Będę czytać książkę.</div>
            <div className="text-xs text-gray-500">I will be reading a book.</div>
            <div className="text-xs text-blue-700 mt-1">Ongoing, no defined endpoint</div>
          </div>
        </div>
      </section>

      {/* Conditional */}
      <section>
        <h2 className="text-lg font-bold text-gray-900 mb-2">Conditional Mood</h2>
        <p className="text-sm text-gray-600 mb-3">
          Formed by adding <strong>-by-</strong> to the past-tense stem, followed by the same gender/person endings.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { form: 'zrobiłbym', desc: 'I (masc.) would do' },
            { form: 'zrobiłabym', desc: 'I (fem.) would do' },
            { form: 'zrobiłbyś', desc: 'you (masc.) would do' },
            { form: 'zrobiłabyś', desc: 'you (fem.) would do' },
            { form: 'zrobiłby', desc: 'he would do' },
            { form: 'zrobiłaby', desc: 'she would do' },
          ].map(r => (
            <div key={r.form} className="bg-gray-50 rounded-lg px-4 py-2.5 flex items-baseline gap-3">
              <span className="font-mono font-bold text-gray-900 text-sm">{r.form}</span>
              <span className="text-xs text-gray-500">{r.desc}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-green-50 rounded-xl px-5 py-4 border border-green-100">
        <h3 className="font-semibold text-green-900 mb-2">Key things to remember</h3>
        <ul className="space-y-1 text-sm text-green-800">
          <li>• Perfective verbs have no present tense — their present-tense conjugation means <em>simple future</em>: <em>przeczytam</em> = I will read (and finish).</li>
          <li>• Imperfective future uses <em>będę</em> + infinitive or past form: <em>będę czytać / będę czytał</em>.</li>
          <li>• The past-tense ending encodes gender: <em>czytałem</em> (I, male) vs <em>czytałam</em> (I, female).</li>
          <li>• <em>być</em> (to be) is highly irregular — present: jestem, jesteś, jest, jesteśmy, jesteście, są; future: będę, będziesz, będzie…</li>
        </ul>
      </section>
    </div>
  )
}

// ─── Adjective Agreement content ──────────────────────────────────────────────

function AdjectiveAgreementContent() {
  return (
    <div className="space-y-8">
      <p className="text-gray-600 leading-relaxed">
        In Polish, adjectives must <strong>agree</strong> with the noun they modify in three ways:
        <strong> gender</strong> (masculine/feminine/neuter), <strong>case</strong>, and <strong>number</strong> (singular/plural).
        This means the same adjective can have many different forms.
      </p>

      {/* Gender in nominative */}
      <section>
        <h2 className="text-lg font-bold text-gray-900 mb-3">Nominative Singular — Three Genders</h2>
        <div className="grid grid-cols-3 gap-3">
          {[
            { gender: 'Masculine', en: 'dobry', note: 'dobry chłopiec (a good boy)' },
            { gender: 'Feminine',  en: 'dobra',  note: 'dobra kobieta (a good woman)' },
            { gender: 'Neuter',    en: 'dobre',  note: 'dobre dziecko (a good child)' },
          ].map(g => (
            <div key={g.gender} className="bg-gray-50 rounded-xl px-4 py-3 text-center">
              <div className="text-xs text-gray-400 mb-1">{g.gender}</div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{g.en}</div>
              <div className="text-xs text-gray-500 italic">{g.note}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Full declension */}
      <section>
        <h2 className="text-lg font-bold text-gray-900 mb-3">Full Declension of <em>dobry</em> (good)</h2>
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wide">
              <tr>
                <th className="text-left px-4 py-3">Case</th>
                <th className="text-left px-4 py-3">Masc (sg)</th>
                <th className="text-left px-4 py-3">Fem (sg)</th>
                <th className="text-left px-4 py-3">Neut (sg)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                { c: 'Nominative', m: 'dobry', f: 'dobra', n: 'dobre' },
                { c: 'Genitive',   m: 'dobrego', f: 'dobrej', n: 'dobrego' },
                { c: 'Dative',     m: 'dobremu', f: 'dobrej', n: 'dobremu' },
                { c: 'Accusative (inan.)', m: 'dobry', f: 'dobrą', n: 'dobre' },
                { c: 'Accusative (anim.)', m: 'dobrego', f: 'dobrą', n: 'dobre' },
                { c: 'Instrumental', m: 'dobrym', f: 'dobrą', n: 'dobrym' },
                { c: 'Locative',   m: 'dobrym', f: 'dobrej', n: 'dobrym' },
                { c: 'Vocative',   m: 'dobry', f: 'dobra', n: 'dobre' },
              ].map((r, i) => (
                <tr key={r.c} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                  <td className="px-4 py-3 text-gray-600 text-xs">{r.c}</td>
                  <td className="px-4 py-3 font-medium text-gray-900">{r.m}</td>
                  <td className="px-4 py-3 font-medium text-gray-900">{r.f}</td>
                  <td className="px-4 py-3 font-medium text-gray-900">{r.n}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Plural */}
      <section>
        <h2 className="text-lg font-bold text-gray-900 mb-3">Plural Forms</h2>
        <p className="text-sm text-gray-600 mb-3">
          Polish distinguishes between <strong>virile plural</strong> (groups that include male persons) and <strong>non-virile plural</strong> (everything else).
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-gray-50 rounded-xl px-4 py-3">
            <div className="font-semibold text-gray-900 mb-1">Virile (male persons)</div>
            <div className="text-2xl font-bold text-yellow-700 mb-1">dobrzy</div>
            <div className="text-xs text-gray-500 italic">dobrzy mężczyźni (good men)</div>
          </div>
          <div className="bg-gray-50 rounded-xl px-4 py-3">
            <div className="font-semibold text-gray-900 mb-1">Non-virile (all other nouns)</div>
            <div className="text-2xl font-bold text-yellow-700 mb-1">dobre</div>
            <div className="text-xs text-gray-500 italic">dobre kobiety / dobre dzieci</div>
          </div>
        </div>
      </section>

      <section className="bg-yellow-50 rounded-xl px-5 py-4 border border-yellow-100">
        <h3 className="font-semibold text-yellow-900 mb-2">Key things to remember</h3>
        <ul className="space-y-1 text-sm text-yellow-800">
          <li>• An adjective <em>always</em> matches its noun in gender, case and number — check all three.</li>
          <li>• Genitive/Dative/Locative masculine and neuter share the same adjective forms.</li>
          <li>• In predicate position (after <em>być</em>), the adjective still agrees: <em>Ta książka jest ciekawa.</em></li>
          <li>• Possessives (mój, twój, nasz…) decline like adjectives.</li>
        </ul>
      </section>
    </div>
  )
}

// ─── Word Order content ───────────────────────────────────────────────────────

function WordOrderContent() {
  return (
    <div className="space-y-8">
      <p className="text-gray-600 leading-relaxed">
        Polish word order is considerably more flexible than English because <strong>grammatical cases</strong> (not position) show each word's role.
        Instead of being fixed, the position of words signals <strong>emphasis</strong> and <strong>focus</strong>.
        The new or most important information typically appears at the <strong>end</strong> of a sentence.
      </p>

      {/* Basic SVO */}
      <section>
        <h2 className="text-lg font-bold text-gray-900 mb-3">Default Order: Subject — Verb — Object</h2>
        <p className="text-sm text-gray-600 mb-3">
          The neutral, unmarked order is SVO. It carries no special emphasis — it simply states a fact.
        </p>
        <div className="bg-gray-50 rounded-xl px-5 py-4 border border-gray-200">
          <div className="text-xl font-bold text-gray-900 mb-1">Ania czyta książkę.</div>
          <div className="text-sm text-gray-500 italic mb-2">Ania reads a book.</div>
          <div className="flex gap-3 text-xs">
            <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-mono">Ania → Subject (Nom)</span>
            <span className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded font-mono">czyta → Verb</span>
            <span className="bg-orange-100 text-orange-800 px-2 py-0.5 rounded font-mono">książkę → Object (Acc)</span>
          </div>
        </div>
      </section>

      {/* Emphasis examples */}
      <section>
        <h2 className="text-lg font-bold text-gray-900 mb-3">Changing Emphasis by Moving Words</h2>
        <p className="text-sm text-gray-600 mb-4">
          The cases stay the same — only the position shifts. The word at the <strong>end</strong> receives the most stress and carries the new information.
        </p>
        <div className="space-y-3">
          {[
            {
              sentence: 'Ania czyta książkę.',
              emphasis: 'Neutral — no special focus.',
              translation: 'Ania reads a book.',
            },
            {
              sentence: 'Książkę czyta Ania.',
              emphasis: 'Focus on Ania — it is Ania (not someone else) who reads it.',
              translation: 'It\'s Ania who reads the book.',
            },
            {
              sentence: 'Ania książkę czyta.',
              emphasis: 'Focus on the book — it\'s the book (not something else) that Ania reads.',
              translation: 'It\'s a book that Ania reads.',
            },
            {
              sentence: 'Tę książkę Ania już czytała.',
              emphasis: 'Topicalised — the book is known/given, new info is that Ania already read it.',
              translation: 'That book, Ania has already read.',
            },
          ].map((ex, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-xl px-5 py-4">
              <div className="text-lg font-bold text-gray-900 italic mb-1">{ex.sentence}</div>
              <div className="text-xs text-gray-400 mb-1">{ex.translation}</div>
              <div className="text-sm text-gray-600">{ex.emphasis}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Clitic pronouns */}
      <section>
        <h2 className="text-lg font-bold text-gray-900 mb-3">Clitic (Short-form) Pronouns</h2>
        <p className="text-sm text-gray-600 mb-3">
          Short pronoun forms (clitics) have <strong>strict position rules</strong>: they must appear in the <strong>second position</strong> in a clause and can never start a sentence.
        </p>
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wide">
              <tr>
                <th className="text-left px-4 py-3">Pronoun</th>
                <th className="text-left px-4 py-3">Short form</th>
                <th className="text-left px-4 py-3">Long form</th>
                <th className="text-left px-4 py-3">Example</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                { p: 'me (dat.)',   s: 'mi', l: 'mnie', ex: 'Daj mi to. (Give it to me.)' },
                { p: 'you (dat.)', s: 'ci', l: 'tobie', ex: 'Mówię ci. (I\'m telling you.)' },
                { p: 'him (acc.)', s: 'go', l: 'jego',  ex: 'Widzę go. (I see him.)' },
                { p: 'him (dat.)', s: 'mu', l: 'jemu',  ex: 'Daję mu. (I give (to) him.)' },
                { p: 'herself/himself (refl.)', s: 'się', l: 'siebie', ex: 'Myję się. (I wash myself.)' },
              ].map((r, i) => (
                <tr key={r.p} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                  <td className="px-4 py-3 text-gray-500 text-xs">{r.p}</td>
                  <td className="px-4 py-3 font-bold text-orange-700">{r.s}</td>
                  <td className="px-4 py-3 text-gray-600">{r.l}</td>
                  <td className="px-4 py-3 text-gray-600 italic text-xs">{r.ex}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-orange-50 rounded-xl px-5 py-4 border border-orange-100">
        <h3 className="font-semibold text-orange-900 mb-2">Key things to remember</h3>
        <ul className="space-y-1 text-sm text-orange-800">
          <li>• New/important information goes <strong>last</strong> in a Polish sentence.</li>
          <li>• Known/topical information goes <strong>first</strong>.</li>
          <li>• Clitic pronouns must be in <strong>second position</strong> — never sentence-initial.</li>
          <li>• The subject can be omitted entirely when it is clear from context (<em>pro-drop</em>): <em>Idę do domu.</em> (I'm going home.)</li>
        </ul>
      </section>
    </div>
  )
}

// ─── Content map ──────────────────────────────────────────────────────────────

const CONTENT = {
  'noun-cases': NounCasesContent,
  'verb-conjugation': VerbConjugationContent,
  'adjective-agreement': AdjectiveAgreementContent,
  'word-order': WordOrderContent,
}

// ─── Learn page ───────────────────────────────────────────────────────────────

export default function Learn() {
  const { topic } = useParams()
  const navigate = useNavigate()
  const t = getTopic(topic)
  const ContentComponent = CONTENT[topic]

  useEffect(() => {
    if (!t || !ContentComponent) navigate('/', { replace: true })
  }, [topic])

  if (!t || !ContentComponent) return null

  return (
    <div className="p-6 sm:p-8 max-w-3xl">

      {/* Page header */}
      <div className="flex items-start justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl ${t.iconBg} shrink-0`}>
            {t.emoji}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{t.label}</h1>
            <p className="text-sm text-gray-400">{t.labelPl}</p>
            <p className="text-xs text-gray-400 mt-0.5">{t.subtitle}</p>
          </div>
        </div>
        <button
          onClick={() => navigate(`/difficulty/${topic}`)}
          className={`shrink-0 ${t.btnBg} text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors cursor-pointer`}
        >
          Start Practising →
        </button>
      </div>

      {/* Grammar content */}
      <ContentComponent navigate={navigate} />

      {/* Bottom CTA */}
      <div className="mt-10 pt-8 border-t border-gray-100">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <div className="font-semibold text-gray-900">Ready to practise?</div>
            <div className="text-sm text-gray-400">Choose your difficulty and start a session.</div>
          </div>
          <button
            onClick={() => navigate(`/difficulty/${topic}`)}
            className={`${t.btnBg} text-white font-semibold px-6 py-3 rounded-xl transition-colors cursor-pointer`}
          >
            Start Practising {t.label} →
          </button>
        </div>
      </div>

    </div>
  )
}
