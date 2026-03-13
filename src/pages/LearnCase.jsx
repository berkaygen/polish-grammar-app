import { useParams, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const CASE_META = {
  nominative:   { label: 'Nominative',   pl: 'Mianownik',   question: 'Kto? Co?' },
  genitive:     { label: 'Genitive',     pl: 'Dopełniacz',  question: 'Kogo? Czego?' },
  accusative:   { label: 'Accusative',   pl: 'Biernik',     question: 'Kogo? Co?' },
  dative:       { label: 'Dative',       pl: 'Celownik',    question: 'Komu? Czemu?' },
  instrumental: { label: 'Instrumental', pl: 'Narzędnik',   question: 'Kim? Czym?' },
  locative:     { label: 'Locative',     pl: 'Miejscownik', question: 'O kim? O czym?' },
  vocative:     { label: 'Vocative',     pl: 'Wołacz',      question: '(direct address)' },
}

// ─── Reusable components ──────────────────────────────────────────────────────

function Section({ title, children }) {
  return (
    <section>
      <h2 className="text-base font-bold text-gray-900 mb-3">{title}</h2>
      {children}
    </section>
  )
}

function EndingsTable({ rows, columns }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wide">
          <tr>
            {columns.map(c => (
              <th key={c} className="text-left px-4 py-3">{c}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {rows.map((row, i) => (
            <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
              {row.map((cell, j) => (
                <td key={j} className={`px-4 py-3 ${j === 0 ? 'text-gray-600 font-medium text-xs' : j === 1 ? 'font-mono font-semibold text-blue-800 text-sm' : 'text-gray-700 text-xs italic'}`}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function UsesList({ items }) {
  return (
    <ol className="space-y-1.5">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3 text-sm text-gray-700">
          <span className="text-blue-400 font-bold shrink-0">{i + 1}.</span>
          <span dangerouslySetInnerHTML={{ __html: item }} />
        </li>
      ))}
    </ol>
  )
}

function Examples({ items }) {
  return (
    <div className="space-y-2">
      {items.map((ex, i) => (
        <div key={i} className="bg-gray-50 rounded-xl px-4 py-3">
          <div className="text-sm font-semibold text-gray-900 italic">{ex.pl}</div>
          <div className="text-xs text-gray-500 mt-0.5">{ex.en}</div>
          {ex.note && <div className="text-xs text-blue-600 mt-0.5">{ex.note}</div>}
        </div>
      ))}
    </div>
  )
}

function TipBox({ color, title, items }) {
  const colors = {
    blue:   { bg: 'bg-blue-50',   border: 'border-blue-100',   title: 'text-blue-900',   text: 'text-blue-800' },
    amber:  { bg: 'bg-amber-50',  border: 'border-amber-100',  title: 'text-amber-900',  text: 'text-amber-800' },
    red:    { bg: 'bg-red-50',    border: 'border-red-100',    title: 'text-red-900',    text: 'text-red-800' },
    green:  { bg: 'bg-green-50',  border: 'border-green-100',  title: 'text-green-900',  text: 'text-green-800' },
  }
  const c = colors[color] || colors.blue
  return (
    <div className={`${c.bg} rounded-xl px-5 py-4 border ${c.border}`}>
      <h3 className={`font-semibold ${c.title} mb-2`}>{title}</h3>
      <ul className={`space-y-1 text-sm ${c.text}`}>
        {items.map((item, i) => (
          <li key={i} dangerouslySetInnerHTML={{ __html: `• ${item}` }} />
        ))}
      </ul>
    </div>
  )
}

// ─── Nominative ───────────────────────────────────────────────────────────────

function NominativeContent() {
  return (
    <div className="space-y-6">
      <p className="text-gray-600 leading-relaxed">
        The Nominative is the <strong>base form</strong> of a noun — the form you find in dictionaries.
        It marks the <strong>subject</strong> of a sentence: the person or thing performing the action.
      </p>

      <Section title="Singular Endings">
        <EndingsTable
          columns={['Gender', 'Ending', 'Examples']}
          rows={[
            ['Masculine', '— (no ending)', 'pies (dog), student, dom (house), brat (brother)'],
            ['Feminine',  '-a',            'kobieta (woman), mama, Polska, siostra (sister)'],
            ['Neuter',    '-o or -e',      'okno (window), morze (sea), imię (name)'],
          ]}
        />
      </Section>

      <Section title="Plural Endings">
        <EndingsTable
          columns={['Type', 'Ending', 'Examples']}
          rows={[
            ['Masculine personal (virile)', '-i / -y / -owie', 'studenci, Polacy, panowie, bracia'],
            ['Other masculine',             '-y / -i',         'psy (dogs), koty (cats), stoły (tables)'],
            ['Feminine',                   '-y / -i',         'kobiety (women), siostry, noce (nights)'],
            ['Neuter',                     '-a',              'okna (windows), morza (seas), imiona'],
          ]}
        />
      </Section>

      <Section title="When to use Nominative">
        <UsesList items={[
          'As the <strong>subject</strong> of a verb: <em>Pies śpi.</em> / <em>Studenci uczą się.</em>',
          'After <strong>to jest</strong> (this is): <em>To jest moja siostra.</em>',
          'As a <strong>predicate noun</strong> after <em>to</em>: <em>To lekarz.</em> (This is a doctor.) — contrast with Instrumental after <em>być</em>.',
          'In <strong>titles, labels, headings</strong> standing alone.',
        ]} />
      </Section>

      <Section title="Worked Examples">
        <Examples items={[
          { pl: 'Mój brat mieszka w Warszawie.', en: 'My brother lives in Warsaw.', note: 'brat = Nominative (subject)' },
          { pl: 'Duży pies gryzie.', en: 'A big dog bites.', note: 'pies = Nom; duży agrees (masc sg Nom)' },
          { pl: 'To jest nowy samochód.', en: 'This is a new car.', note: 'samochód = Nom (after to jest)' },
          { pl: 'Studenci uczą się polskiego.', en: 'The students are studying Polish.', note: 'studenci = Nom pl virile' },
          { pl: 'Czerwone jabłko leży na stole.', en: 'A red apple is lying on the table.', note: 'jabłko = Nom (subject); czerwone = neut sg Nom' },
        ]} />
      </Section>

      <TipBox color="blue" title="Common pitfalls" items={[
        'The Nominative is the <strong>dictionary form</strong> — always look up nouns in this form.',
        'Do not confuse Nominative plural <em>-i/-y</em> (kobiety, psy) with Genitive singular which looks similar.',
        'After <em>być</em> (to be) for professions, use <strong>Instrumental</strong> not Nominative: <em>Jestem lekarzem</em>, not <em>Jestem lekarz</em>.',
        'Adjectives in Nominative must agree: <em>dobry pies</em> (masc), <em>dobra kobieta</em> (fem), <em>dobre dziecko</em> (neut).',
      ]} />
    </div>
  )
}

// ─── Genitive ─────────────────────────────────────────────────────────────────

function GenitiveContent() {
  return (
    <div className="space-y-6">
      <p className="text-gray-600 leading-relaxed">
        The Genitive is the most frequently used oblique case in Polish. It covers <strong>possession</strong>, <strong>absence/negation</strong>, <strong>quantity</strong>, and follows a large number of prepositions and verbs.
      </p>

      <Section title="Singular Endings">
        <EndingsTable
          columns={['Gender / Type', 'Ending', 'Examples']}
          rows={[
            ['Masculine animate',   '-a',       'psa (dog), brata (brother), ojca (father), lekarza'],
            ['Masculine inanimate', '-a or -u', 'stołu (table), domu (house), czasu (time), chleba (bread)'],
            ['Feminine (-a nouns)', '-y / -i',  'kobiety (woman), mamy, córki, Polski (Poland)'],
            ['Feminine (consonant)','-(y/i)',   'nocy (night), rzeczy (thing), myśli (thought)'],
            ['Neuter',             '-a',        'okna (window), morza (sea), dziecka (child)'],
          ]}
        />
        <p className="text-xs text-gray-400 mt-2">Masculine inanimate: -u is common for abstracts and rooms (czas, dom, pokój), -a for countable objects (chleb, ser, talerz).</p>
      </Section>

      <Section title="Plural Endings">
        <EndingsTable
          columns={['Type', 'Ending', 'Examples']}
          rows={[
            ['Masculine (most)',  '-ów',          'psów (dogs), kotów, studentów, stołów'],
            ['Masculine soft',    '-i / -y',      'gości (guests), koni (horses), noży (knives)'],
            ['Feminine',         '— (zero end.)', 'kobiet (women), sióstr, szkół'],
            ['Neuter',           '— (zero end.)', 'okien (windows), miast (cities), dzieci'],
          ]}
        />
        <p className="text-xs text-gray-400 mt-2">Zero endings often involve vowel insertion (okna→okien) or vowel alternation.</p>
      </Section>

      <Section title="When to use Genitive">
        <UsesList items={[
          '<strong>Possession</strong>: <em>dom mojego brata</em> (my brother\'s house), <em>imię psa</em> (dog\'s name)',
          'After <strong>nie ma</strong> (there is no): <em>Nie ma mleka.</em> / <em>Nie ma czasu.</em>',
          '<strong>Negation</strong> of Accusative verbs: <em>Widzę psa → Nie widzę psa.</em>',
          'After <strong>quantity words</strong>: <em>dużo wody</em> (a lot of water), <em>kilka kotów</em> (a few cats), <em>trochę czasu</em>',
          'After <strong>prepositions</strong>: do (to), od (from), z (from), bez (without), dla (for), obok (next to), koło (near), u (at someone\'s place)',
          'After verbs: <strong>szukać</strong> (to look for), <strong>słuchać</strong> (to listen to), <strong>uczyć się</strong> (to learn/study), <strong>potrzebować</strong> (to need)',
        ]} />
      </Section>

      <Section title="Worked Examples">
        <Examples items={[
          { pl: 'Nie ma chleba w domu.', en: 'There is no bread in the house.', note: 'chleba = Gen after nie ma' },
          { pl: 'Szukam mojej książki.', en: 'I am looking for my book.', note: 'książki = Gen after szukać' },
          { pl: 'Dużo czasu minęło.', en: 'A lot of time has passed.', note: 'czasu = Gen after dużo' },
          { pl: 'To jest dom sąsiada.', en: "This is the neighbour's house.", note: 'sąsiada = Gen (possession)' },
          { pl: 'Nie lubię zimy.', en: "I don't like winter.", note: 'zimy = Gen (negation of lubię → lubiłam zimę)' },
          { pl: 'Idę do szkoły.', en: 'I am going to school.', note: 'szkoły = Gen after preposition do' },
          { pl: 'Kawa bez cukru, proszę.', en: 'Coffee without sugar, please.', note: 'cukru = Gen after preposition bez' },
          { pl: 'To prezent dla mamy.', en: 'This is a gift for mum.', note: 'mamy = Gen after preposition dla' },
          { pl: 'Wracam od lekarza.', en: 'I am coming back from the doctor.', note: 'lekarza = Gen after preposition od' },
          { pl: 'Słucham polskiej muzyki.', en: 'I listen to Polish music.', note: 'polskiej muzyki = Gen after słuchać (adj + noun both in Gen)' },
          { pl: 'Potrzebuję nowego komputera.', en: 'I need a new computer.', note: 'nowego komputera = Gen after potrzebować (adj + noun both in Gen)' },
          { pl: 'Uczę się języka polskiego.', en: 'I am learning Polish.', note: 'języka polskiego = Gen after uczyć się' },
          { pl: 'Boję się ciemności.', en: 'I am afraid of the dark.', note: 'ciemności = Gen after bać się' },
          { pl: 'Nie widzę żadnych problemów.', en: "I don't see any problems.", note: 'żadnych problemów = Gen plural (negation shifts Acc → Gen)' },
          { pl: 'Kilka dużych miast jest blisko.', en: 'A few large cities are nearby.', note: 'dużych miast = Gen plural after kilka (quantity)' },
        ]} />
      </Section>

      <TipBox color="amber" title="Common pitfalls" items={[
        'Masculine inanimate -a vs -u: no strict rule, memorise common nouns (domu, stołu, but chleba, sera).',
        'Feminine zero plural is irregular: kobieta→kobiet, szkoła→szkół (ó→o). Must be memorised.',
        'After <strong>nie</strong>, the direct object shifts from Accusative to Genitive: <em>Mam czas → Nie mam czasu.</em>',
        'Adjective Genitive: masculine/neuter <em>-ego</em>, feminine <em>-ej</em>: <em>nowego domu, nowej kobiety.</em>',
      ]} />
    </div>
  )
}

// ─── Accusative ───────────────────────────────────────────────────────────────

function AccusativeContent() {
  return (
    <div className="space-y-6">
      <p className="text-gray-600 leading-relaxed">
        The Accusative marks the <strong>direct object</strong> — the noun that directly receives the action. It is the most common case for objects after transitive verbs. The key rule for masculine nouns is the <strong>animate/inanimate distinction</strong>.
      </p>

      <Section title="Singular Endings">
        <EndingsTable
          columns={['Gender / Type', 'Ending', 'Examples']}
          rows={[
            ['Masculine animate',    '= Genitive (-a)',  'widzę psa, kocham brata, znam lekarza'],
            ['Masculine inanimate',  '= Nominative (—)', 'kupuję chleb, widzę stół, czytam artykuł'],
            ['Feminine (-a nouns)',  '-ę',               'widzę kobietę, lubię mamę, czytam książkę'],
            ['Feminine (consonant)', '= Nominative',     'lubię noc, słyszę myśl'],
            ['Neuter',              '= Nominative',     'jem jabłko, widzę okno, kupuję mleko'],
          ]}
        />
      </Section>

      <Section title="The Animate / Inanimate Rule (Masculine)">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
            <div className="font-bold text-blue-900 mb-2">Animate (people &amp; animals)</div>
            <p className="text-sm text-blue-800 mb-2">Accusative = Genitive form (-a)</p>
            <div className="space-y-1 text-sm text-blue-700 italic">
              <div>Widzę <strong>psa</strong>. (dog)</div>
              <div>Znam <strong>brata</strong>. (brother)</div>
              <div>Lubię <strong>kota</strong>. (cat)</div>
              <div>Spotkałem <strong>lekarza</strong>. (doctor)</div>
            </div>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
            <div className="font-bold text-gray-900 mb-2">Inanimate (objects &amp; concepts)</div>
            <p className="text-sm text-gray-600 mb-2">Accusative = Nominative form (no change)</p>
            <div className="space-y-1 text-sm text-gray-700 italic">
              <div>Kupuję <strong>chleb</strong>. (bread)</div>
              <div>Widzę <strong>stół</strong>. (table)</div>
              <div>Oglądam <strong>film</strong>. (film)</div>
              <div>Czytam <strong>artykuł</strong>. (article)</div>
            </div>
          </div>
        </div>
      </Section>

      <Section title="When to use Accusative">
        <UsesList items={[
          '<strong>Direct object</strong> of transitive verbs: <em>lubić, widzieć, znać, czytać, kupować, jeść, pić, kochać, mieć…</em>',
          'After <strong>motion prepositions</strong> (indicating movement towards): <em>na, w, nad, pod, za, przed, przez</em>',
          '<strong>Duration</strong> expressions: <em>całą noc</em> (all night), <em>jedną godzinę</em> (one hour), <em>cały dzień</em>',
          'After <strong>przez</strong> (through, for): <em>przez las</em> (through the forest), <em>przez godzinę</em> (for an hour)',
        ]} />
      </Section>

      <Section title="Worked Examples">
        <Examples items={[
          { pl: 'Czytam interesującą książkę.', en: 'I am reading an interesting book.', note: 'książkę = Acc fem (-ę); interesującą = fem Acc adj' },
          { pl: 'Mam starszego brata.', en: 'I have an older brother.', note: 'brata = Acc masc anim (= Gen); starszego = masc anim Acc adj' },
          { pl: 'Kupuję nowy samochód.', en: 'I am buying a new car.', note: 'samochód = Acc masc inan (= Nom)' },
          { pl: 'Idziemy na spacer.', en: 'We are going for a walk.', note: 'spacer = Acc after na (motion)' },
          { pl: 'Znam tę kobietę.', en: 'I know this woman.', note: 'kobietę = Acc fem (-ę); tę = fem Acc demonstrative' },
        ]} />
      </Section>

      <TipBox color="red" title="Common pitfalls" items={[
        'The animate/inanimate rule applies <strong>only to masculine singular</strong>. Feminine and neuter do not have this distinction.',
        'Some masculine nouns are treated as animate even though not biologically alive: <em>zjem <strong>hot-doga</strong></em> (colloquial food items).',
        'Motion vs. static position: <em>na stole</em> (Locative, on the table — static) vs. <em>na stół</em> (Accusative, onto the table — motion).',
        'After negation, Accusative often shifts to Genitive: <em>Mam czas → Nie mam czasu.</em>',
      ]} />
    </div>
  )
}

// ─── Dative ───────────────────────────────────────────────────────────────────

function DativeContent() {
  return (
    <div className="space-y-6">
      <p className="text-gray-600 leading-relaxed">
        The Dative marks the <strong>indirect object</strong> — the person or thing that something is given to, said to, or done for. It is also required by specific verbs and four prepositions.
      </p>

      <Section title="Singular Endings">
        <EndingsTable
          columns={['Gender / Type', 'Ending', 'Examples']}
          rows={[
            ['Masculine / Neuter (regular)', '-owi',     'studentowi, kotowi, panu, dziecku'],
            ['Masc exceptions (common words)', '-u',     'bratu, ojcu, psu, panu, bogu, chłopcu'],
            ['Feminine (hard stem)',         '-e / -ie', 'kobiecie (kobieta), mamie (mama), Polsce (Polska)'],
            ['Feminine (-ka / -ga)',         '-ce / -dze','córce (córka), nodze (noga), ręce (ręka)'],
            ['Feminine (-ia / -ja)',         '-i',       'babci (babcia), kolacji (kolacja)'],
          ]}
        />
      </Section>

      <Section title="Plural Endings">
        <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
          <p className="text-sm text-blue-900"><strong>All genders: -om</strong></p>
          <p className="text-sm text-blue-800 mt-1 italic">studentom, kobietom, dzieciom, psom, kotom, domom</p>
        </div>
      </Section>

      <Section title="Important Irregular Datives">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {[
            ['brat', 'bratu'],['ojciec', 'ojcu'],['pies', 'psu'],
            ['pan', 'panu'],['Bóg', 'Bogu'],['ksiądz', 'księdzu'],
            ['człowiek', 'człowiekowi'],['przyjaciel', 'przyjacielowi'],
          ].map(([nom, dat]) => (
            <div key={nom} className="bg-gray-50 rounded-lg px-3 py-2 flex items-center gap-2">
              <span className="text-gray-500 text-xs">{nom}</span>
              <span className="text-gray-400">→</span>
              <span className="font-bold text-blue-800 text-sm">{dat}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="When to use Dative">
        <UsesList items={[
          '<strong>Indirect object</strong>: <em>Daję bratu prezent.</em> (I give my brother a gift.)',
          'After verbs: <strong>dawać/dać</strong> (give), <strong>mówić/powiedzieć</strong> (tell), <strong>pomagać</strong> (help), <strong>dziękować</strong> (thank), <strong>odpowiadać</strong> (answer), <strong>ufać</strong> (trust), <strong>wierzyć</strong> (believe), <strong>zazdrościć</strong> (envy)',
          'After <strong>dzięki</strong> (thanks to): <em>Dzięki tobie zdałem.</em>',
          'After <strong>ku</strong> (towards): <em>ku morzu</em> (towards the sea)',
          'After <strong>przeciwko</strong> (against): <em>przeciwko nam</em> (against us)',
          'After <strong>wbrew</strong> (contrary to, despite): <em>wbrew zasadom</em> (against the rules)',
        ]} />
      </Section>

      <Section title="Worked Examples">
        <Examples items={[
          { pl: 'Dziękuję panu za pomoc.', en: 'Thank you (sir) for your help.', note: 'panu = Dat (dziękować komuś)' },
          { pl: 'Pomagam siostrze w lekcjach.', en: 'I help my sister with lessons.', note: 'siostrze = Dat (pomagać komuś)' },
          { pl: 'Mówię dziecku bajkę.', en: 'I tell the child a fairy tale.', note: 'dziecku = Dat (mówić komuś)' },
          { pl: 'Dzięki tobie zdałem egzamin.', en: 'Thanks to you I passed the exam.', note: 'tobie = Dat (after dzięki)' },
          { pl: 'Ufam mojemu przyjacielowi.', en: 'I trust my friend.', note: 'przyjacielowi = Dat (ufać komuś)' },
        ]} />
      </Section>

      <TipBox color="blue" title="Common pitfalls" items={[
        'Most masculine nouns take <strong>-owi</strong>, but a handful of very common words take <strong>-u</strong>: brat→bratu, ojciec→ojcu, pies→psu, pan→panu. Memorise these.',
        'Feminine -ka nouns: k→c mutation: córka→córce, ręka→ręce, torba→torbie (b→bi).',
        'Do not confuse Dative -u (brat→bratu) with Locative -u (dom→w domu) — different cases with same ending.',
        'Plural Dative <strong>-om</strong> is completely regular: studentom, kobietom, dzieciom, psom.',
      ]} />
    </div>
  )
}

// ─── Instrumental ─────────────────────────────────────────────────────────────

function InstrumentalContent() {
  return (
    <div className="space-y-6">
      <p className="text-gray-600 leading-relaxed">
        The Instrumental has three main uses: describing <strong>means or tools</strong>, expressing <strong>company</strong> (with someone), and as the predicate after <strong>być</strong> (to be) for professions and states.
      </p>

      <Section title="Singular Endings">
        <EndingsTable
          columns={['Gender / Type', 'Ending', 'Examples']}
          rows={[
            ['Masculine (hard)', '-em',  'studentem, kotem (cat), domem, Polakiem'],
            ['Masculine (soft)', '-iem', 'lekarzem? No: lekarz→lekarzem; nauczycielem (nauczyciel)'],
            ['Neuter (-o)',      '-em',  'oknem (window), dzieckiem (dziecko)'],
            ['Neuter (-e)',      '-iem', 'morzem (morze), sercem (serce)'],
            ['Feminine (-a)',    '-ą',   'kobietą, mamą, siostrą, nocą'],
            ['Feminine (cons.)', '-ą',   'nocą (noc), myślą (myśl), solą (sól)'],
          ]}
        />
      </Section>

      <Section title="Plural Endings">
        <EndingsTable
          columns={['Type', 'Ending', 'Examples']}
          rows={[
            ['Most nouns',     '-ami',   'studentami, kobietami, domami, kotami'],
            ['Irregular',      '-mi',    'dziećmi (dzieci), ludźmi (ludzie), końmi (konie), pieniędzmi'],
          ]}
        />
      </Section>

      <Section title="When to use Instrumental">
        <UsesList items={[
          '<strong>Profession / state / identity after być</strong>: <em>Jestem studentem.</em> / <em>Ona jest lekarką.</em> / <em>Jestem Polakiem.</em>',
          '<strong>Means or tool</strong>: <em>piszę długopisem</em> (I write with a pen), <em>jadę pociągiem</em> (I travel by train), <em>płacę kartą</em> (I pay by card)',
          '<strong>Company</strong> with <em>z</em> (with): <em>idę z mamą</em>, <em>rozmawiam z kolegą</em>',
          '<strong>Static location</strong> prepositions: <em>nad</em> (above), <em>pod</em> (below), <em>za</em> (behind), <em>przed</em> (in front of), <em>między</em> (between) — when expressing <strong>position</strong> (not motion)',
          '<strong>Time expressions</strong>: <em>latem</em> (in summer), <em>zimą</em> (in winter), <em>rankiem</em> (in the morning), <em>wieczorem</em> (in the evening)',
        ]} />
      </Section>

      <Section title="Worked Examples">
        <Examples items={[
          { pl: 'Ona jest nauczycielką w szkole.', en: 'She is a teacher at school.', note: 'nauczycielką = Instr (after być)' },
          { pl: 'Jedzie pociągiem do Krakowa.', en: 'He is travelling by train to Kraków.', note: 'pociągiem = Instr (means of transport)' },
          { pl: 'Piszę list ołówkiem.', en: 'I am writing a letter with a pencil.', note: 'ołówkiem = Instr (tool)' },
          { pl: 'Mieszkam z rodziną.', en: 'I live with my family.', note: 'rodziną = Instr (after z, company)' },
          { pl: 'Obraz wisi nad kanapą.', en: 'The picture hangs above the sofa.', note: 'kanapą = Instr (after nad, static position)' },
        ]} />
      </Section>

      <TipBox color="green" title="Common pitfalls" items={[
        'Być + Instrumental for professions: <em>Jestem <strong>lekarzem</strong></em>, never <em>Jestem lekarz</em>.',
        '<strong>z</strong> (with) + Instrumental vs. <strong>z</strong> (from) + Genitive: <em>z mamą</em> (with mum, Instr) vs. <em>z domu</em> (from home, Gen).',
        'Motion vs. static for nad/pod/za/przed: <em>Idę <strong>za dom</strong></em> (Acc, motion) vs. <em>Stoję <strong>za domem</strong></em> (Instr, static).',
        'Some irregular instrumentals: dziecko→<strong>dzieckiem</strong>, człowiek→<strong>człowiekiem</strong>, przyjaciel→<strong>przyjacielem</strong>.',
      ]} />
    </div>
  )
}

// ─── Locative ─────────────────────────────────────────────────────────────────

function LocativeContent() {
  return (
    <div className="space-y-6">
      <p className="text-gray-600 leading-relaxed">
        The Locative is the only Polish case that <strong>cannot appear without a preposition</strong>. It expresses location, topic of speech, and is used after a specific set of prepositions.
        Its endings often cause <strong>consonant softening</strong>.
      </p>

      <Section title="Singular Endings">
        <EndingsTable
          columns={['Gender / Type', 'Ending', 'Examples']}
          rows={[
            ['Masculine (hard)',   '-e (+ softening)', 'stół→stole, brat→bracie, rok→roku, dom→domu'],
            ['Masculine -k/-g',    '-u',               'bank→banku, rok→roku, pociąg→pociągu'],
            ['Masculine soft',     '-u / -ie',         'nauczyciel→nauczycielu, hotel→hotelu'],
            ['Feminine (-a hard)', '-e / -ie',         'Polska→Polsce, mama→mamie, szkoła→szkole'],
            ['Feminine (-ka)',     '-ce',              'torba→torbie? torba→torbce? → torbie (b→bi)'],
            ['Feminine (cons.)',   '-y / -i',          'noc→nocy, myśl→myśli, rzecz→rzeczy'],
            ['Neuter (-o)',        '-e / -ie',         'okno→oknie, miasto→mieście, morze→morzu'],
            ['Neuter (-e)',        '-u',               'morze→morzu, serce→sercu'],
          ]}
        />
        <p className="text-xs text-gray-400 mt-2">
          Common consonant alternations: t→c (miasto→mieście), d→dz (woda→wodzie), s→ś, z→ź, n→ni, r→rz, ł→l, k→c, g→dz, ch→sz.
        </p>
      </Section>

      <Section title="Plural Endings">
        <div className="bg-green-50 border border-green-100 rounded-xl px-4 py-3">
          <p className="text-sm text-green-900"><strong>All genders: -ach</strong></p>
          <p className="text-sm text-green-800 mt-1 italic">w domach, o kobietach, w miastach, na stołach, w szkołach</p>
        </div>
      </Section>

      <Section title="Prepositions that require Locative">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { prep: 'w / we', meaning: 'in', ex: 'w Polsce, w domu, w szkole, we Francji' },
            { prep: 'na', meaning: 'on / at (static)', ex: 'na stole, na ulicy, na wakacjach' },
            { prep: 'przy', meaning: 'by / near / at', ex: 'przy oknie, przy stole, przy okazji' },
            { prep: 'o', meaning: 'about / concerning', ex: 'mówię o filmie, myślę o niej' },
            { prep: 'po', meaning: 'after / around', ex: 'po lekcji, chodzę po mieście, po polsku' },
          ].map(p => (
            <div key={p.prep} className="bg-gray-50 rounded-xl px-4 py-3">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="font-bold text-gray-900">{p.prep}</span>
                <span className="text-xs text-gray-500">({p.meaning})</span>
              </div>
              <p className="text-xs text-gray-600 italic">{p.ex}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Worked Examples">
        <Examples items={[
          { pl: 'Mieszkam w Warszawie.', en: 'I live in Warsaw.', note: 'Warszawie = Loc (w + city name)' },
          { pl: 'Książka leży na stole.', en: 'The book is lying on the table.', note: 'stole = Loc (na, static position)' },
          { pl: 'Rozmawiamy o nowym filmie.', en: 'We are talking about a new film.', note: 'filmie = Loc (o); nowym = Loc masc adj' },
          { pl: 'Siedzę przy oknie.', en: 'I am sitting by the window.', note: 'oknie = Loc (przy)' },
          { pl: 'Idę po zakupy po pracy.', en: 'I\'m going shopping after work.', note: 'pracy = Loc (po, after)' },
        ]} />
      </Section>

      <TipBox color="amber" title="Common pitfalls" items={[
        'The Locative <strong>always</strong> needs a preposition — it never appears alone.',
        'Consonant softening is mandatory: miasto→<strong>mieście</strong>, brat→<strong>bracie</strong>, woda→<strong>wodzie</strong>. Forgetting this is the most common mistake.',
        '<em>na</em> can be Locative (static) or Accusative (motion): <em>Leży <strong>na stole</strong></em> (Loc) vs. <em>Kładę <strong>na stół</strong></em> (Acc).',
        'Some masculine nouns take <em>-u</em> instead of <em>-e</em> in Locative: <em>w <strong>domu</strong></em>, <em>w <strong>banku</strong></em>, <em>w <strong>roku</strong></em>. Memorise these.',
        'Plural Locative <strong>-ach</strong> is completely regular for all genders.',
      ]} />
    </div>
  )
}

// ─── Vocative ─────────────────────────────────────────────────────────────────

function VocativeContent() {
  return (
    <div className="space-y-6">
      <p className="text-gray-600 leading-relaxed">
        The Vocative is used exclusively for <strong>directly addressing</strong> a person, animal, or personified object.
        It does not function as a grammatical role within the sentence — it stands apart, often marked by a comma.
        It is used less frequently in writing but is common in spoken Polish and formal address.
      </p>

      <Section title="Singular Endings">
        <EndingsTable
          columns={['Gender / Type', 'Ending', 'Examples']}
          rows={[
            ['Masculine (hard cons.)', '-e / -ie (+ softening)', 'brat→bracie, student→studencie, Piotr→Piotrze'],
            ['Masculine (-k, -g, -ch)', '-u',   'Marek→Marku, Franek→Franku, chłopiec→chłopcze*'],
            ['Masculine (-ec fleeting)', '-cze', 'ojciec→ojcze, chłopiec→chłopcze'],
            ['Masculine (-ek fleeting)', '-ku',  'Tomek→Tomku, Janek→Janku, Jacek→Jacku'],
            ['Masculine (-a nouns)',    '-o',    'tata→tato, kolega→kolego'],
            ['Feminine (hard -a)',      '-o',    'mama→mamo, kobieta→kobieto, Marta→Marto, Anna→Anno'],
            ['Feminine (-ka)',          '-ko',   'córka→córko, babka→babko'],
            ['Feminine (-ia/-ja)',      '-u',    'babcia→babciu, Kasia→Kasiu, pani→pani*'],
            ['Feminine (-nia)',         '-nio',  'Hania→Haniu, Zosia→Zosiu'],
            ['Neuter',                 '= Nom', 'dziecko→dziecko (rare)'],
            ['pan',                    'panie', 'Dzień dobry, panie Kowalski!'],
            ['pani',                   'pani',  'Dzień dobry, pani Kowalska! (unchanged)'],
          ]}
        />
        <p className="text-xs text-gray-400 mt-2">* The Vocative of <em>chłopiec</em> is <em>chłopcze</em>, not <em>chłopiecze</em> — the fleeting -ie- drops.</p>
      </Section>

      <Section title="Plural">
        <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
          <p className="text-sm text-blue-900">Plural Vocative = <strong>Plural Nominative</strong> for most nouns.</p>
          <p className="text-sm text-blue-800 mt-1 italic">Drodzy studenci! (Dear students!) &nbsp;·&nbsp; Panie i panowie! (Ladies and gentlemen!)</p>
        </div>
      </Section>

      <Section title="When to use Vocative">
        <UsesList items={[
          '<strong>Calling out to someone</strong>: <em>Mamo, chodź!</em> / <em>Piotrze, zadzwoń do mnie.</em>',
          '<strong>Formal address with title</strong>: <em>Dzień dobry, panie doktorze!</em> / <em>Przepraszam, pani profesor.</em>',
          '<strong>Exclamations</strong>: <em>Boże!</em> (Oh God! — Bóg→Boże), <em>Jezu!</em> (Jesus!)',
          '<strong>Writing letters</strong>: <em>Drogi Marku,</em> (Dear Marek,) / <em>Szanowna Pani,</em> (Dear Madam,)',
        ]} />
      </Section>

      <Section title="Worked Examples">
        <Examples items={[
          { pl: 'Chodź tu, Tomku!', en: 'Come here, Tomek!', note: 'Tomku = Voc of Tomek (-ek → -ku)' },
          { pl: 'Dziękuję, panie doktorze.', en: 'Thank you, Doctor.', note: 'panie doktorze = Voc (formal male address)' },
          { pl: 'Anno, zadzwoń do mnie.', en: 'Anna, call me.', note: 'Anno = Voc of Anna (-a → -o)' },
          { pl: 'Pomóż mi, bracie!', en: 'Help me, brother!', note: 'bracie = Voc of brat (t → c + ie)' },
          { pl: 'Co robisz, mamo?', en: 'What are you doing, mum?', note: 'mamo = Voc of mama (-a → -o)' },
        ]} />
      </Section>

      <TipBox color="blue" title="Common pitfalls" items={[
        '<em>pani</em> is <strong>unchanged</strong> in the Vocative: <em>Dzień dobry, pani Kowalska!</em> (not <em>paniо</em>).',
        'Masculine surnames ending in <em>-ski/-cki</em>: Vocative = Nominative. <em>Panie Kowalski!</em> (not <em>Panie Kowalskim</em>).',
        'The Vocative is used less in informal modern speech — using the Nominative (e.g. <em>Tomek!</em> instead of <em>Tomku!</em>) is increasingly common but considered less correct.',
        'Consonant softening applies here too: brat→<strong>bracie</strong>, student→<strong>studencie</strong>.',
      ]} />
    </div>
  )
}

// ─── Content map ──────────────────────────────────────────────────────────────

const CASE_CONTENT = {
  nominative:   NominativeContent,
  genitive:     GenitiveContent,
  accusative:   AccusativeContent,
  dative:       DativeContent,
  instrumental: InstrumentalContent,
  locative:     LocativeContent,
  vocative:     VocativeContent,
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LearnCase() {
  const { case: caseId } = useParams()
  const navigate = useNavigate()
  const meta = CASE_META[caseId]
  const ContentComponent = CASE_CONTENT[caseId]

  useEffect(() => {
    if (!meta) navigate('/learn/noun-cases', { replace: true })
  }, [caseId])

  if (!meta || !ContentComponent) return null

  // Navigation order for prev/next
  const caseIds = Object.keys(CASE_META)
  const currentIndex = caseIds.indexOf(caseId)
  const prevCase = currentIndex > 0 ? caseIds[currentIndex - 1] : null
  const nextCase = currentIndex < caseIds.length - 1 ? caseIds[currentIndex + 1] : null

  return (
    <div className="p-6 sm:p-8 max-w-3xl">

      {/* Breadcrumb */}
      <button
        onClick={() => navigate('/learn/noun-cases')}
        className="text-sm text-gray-500 hover:text-gray-800 mb-6 flex items-center gap-1 transition-colors cursor-pointer"
      >
        ← Noun Cases overview
      </button>

      {/* Page header */}
      <div className="flex items-start justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold tracking-widest text-gray-400 uppercase">Noun Cases</span>
            <span className="text-gray-300">/</span>
            <span className="text-xs font-semibold text-blue-600">{meta.pl}</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">{meta.label}</h1>
          <p className="text-sm text-gray-400 mt-0.5">Question: <span className="italic">{meta.question}</span></p>
        </div>
        <button
          onClick={() => navigate('/difficulty/noun-cases', { state: { preselectedCase: caseId } })}
          className="shrink-0 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors cursor-pointer"
        >
          Practise →
        </button>
      </div>

      {/* Grammar content */}
      <ContentComponent />

      {/* Prev / Next navigation */}
      <div className="mt-10 pt-8 border-t border-gray-100 flex items-center justify-between gap-4">
        {prevCase ? (
          <button
            onClick={() => navigate(`/learn/noun-cases/${prevCase}`)}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
          >
            ← {CASE_META[prevCase].label}
            <span className="text-xs text-gray-400">({CASE_META[prevCase].pl})</span>
          </button>
        ) : <div />}

        {nextCase ? (
          <button
            onClick={() => navigate(`/learn/noun-cases/${nextCase}`)}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors cursor-pointer ml-auto"
          >
            <span className="text-xs text-gray-400">({CASE_META[nextCase].pl})</span>
            {CASE_META[nextCase].label} →
          </button>
        ) : (
          <button
            onClick={() => navigate('/difficulty/noun-cases', { state: { preselectedCase: caseId } })}
            className="ml-auto bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors cursor-pointer"
          >
            Start Practising Noun Cases →
          </button>
        )}
      </div>

    </div>
  )
}
