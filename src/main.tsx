import { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { seed } from './seed'
import { staff, type Language, type Role, type ViewProps } from './model'
import Candidate from './Candidate'
import Screening from './Screening'
import Grading from './Grading'
import Deliberation from './Deliberation'
import './style.css'

const texts = {
  en: {
    perspective: 'Perspective',
    candidate: 'Candidate',
    assessor: 'Assessor',
    coordinator: 'Coordinator',
    role: 'Junior Geologist',
    company: 'PT Bumi Lestari',
    status: 'Accepting applications',
    location: 'Makassar, Indonesia',
    work: 'Field geology',
    applications: 'Applications',
    screen: 'Screening',
    test: 'Technical Test',
    meeting: 'Deliberation',
    reset: 'Reset walkthrough',
    confirm: 'Restore the eight original Applications and Ballots?',
    cancel: 'Cancel',
    restore: 'Restore showcase',
    campaign: 'Hiring campaign',
    subtitle: 'Field mapping and sample documentation',
    sample: 'Fictional campaign',
    billing: 'Campaign Subscription · Simulated payment',
  },
  id: {
    perspective: 'Peran',
    candidate: 'Kandidat',
    assessor: 'Asesor',
    coordinator: 'Koordinator',
    role: 'Geolog Junior',
    company: 'PT Bumi Lestari',
    status: 'Menerima lamaran',
    location: 'Makassar, Indonesia',
    work: 'Geologi lapangan',
    applications: 'Lamaran',
    screen: 'Penyaringan',
    test: 'Tes teknis',
    meeting: 'Musyawarah',
    reset: 'Atur ulang demo',
    confirm: 'Pulihkan delapan lamaran awal dan rekomendasi asesor?',
    cancel: 'Batal',
    restore: 'Pulihkan demo',
    campaign: 'Kampanye rekrutmen',
    subtitle: 'Pemetaan lapangan dan dokumentasi sampel',
    sample: 'Kampanye fiktif',
    billing: 'Langganan kampanye · Simulasi pembayaran',
  },
}
type Session = {
  campaign: ReturnType<typeof seed>
  role: Role
  lang: Language
  tab: 'screen' | 'test' | 'meeting'
}
const initial = (): Session => ({
  campaign: seed(),
  role: 'candidate',
  lang: 'id',
  tab: 'screen',
})
const localKey = 'bumi-showcase-v1'
const candidateRoute = () =>
  location.hash === '#apply' || location.hash.startsWith('#status/')
function restore(): Session {
  try {
    const stored = localStorage.getItem(localKey)
    const s: Session = stored ? JSON.parse(stored) : initial()
    return candidateRoute() ? { ...s, role: 'candidate' } : s
  } catch {
    return initial()
  }
}
function App() {
  const [s, set] = useState(restore)
  const [confirm, open] = useState(false)
  useEffect(() => {
    document.documentElement.lang = s.lang
    localStorage.setItem(localKey, JSON.stringify(s))
  }, [s])
  useEffect(() => {
    const visit = () => {
      if (candidateRoute()) set((prev) => ({ ...prev, role: 'candidate' }))
    }
    window.addEventListener('hashchange', visit)
    return () => window.removeEventListener('hashchange', visit)
  }, [])
  const c = texts[s.lang]
  function switchRole(role: Role) {
    if (role !== 'candidate')
      history.replaceState(null, '', location.pathname + location.search)
    set((prev) => ({
      ...prev,
      role,
      tab: role === 'coordinator' ? 'meeting' : 'screen',
    }))
  }
  const props: ViewProps = {
    lang: s.lang,
    role: s.role,
    campaign: s.campaign,
    update: (change) =>
      set((prev) => ({ ...prev, campaign: change(prev.campaign) })),
  }
  const tabs = ['screen', 'test', 'meeting'] as const
  return (
    <>
      <header>
        <strong>{c.company}</strong>
        <div className="tools">
          <button
            onClick={() =>
              set((prev) => ({ ...prev, lang: s.lang === 'id' ? 'en' : 'id' }))
            }
          >
            {s.lang === 'id' ? 'English' : 'Bahasa Indonesia'}
          </button>
          <label>
            {c.perspective}
            <select
              value={s.role}
              onChange={(e) => switchRole(e.target.value as Role)}
            >
              <option value="candidate">{c.candidate}</option>
              {(['ayu', 'bima'] as const).map((k) => (
                <option key={k} value={k}>
                  {c.assessor} · {staff[k]}
                </option>
              ))}
              <option value="coordinator">
                {c.coordinator} · {staff.coordinator}
              </option>
            </select>
          </label>
        </div>
      </header>
      <main>
        <section className="mast">
          <div>
            <small>{c.campaign}</small>
            <h1>{c.role}</h1>
            <p>{c.subtitle}</p>
            <span>
              {c.location} · {c.work}
            </span>
          </div>
          <strong className="open">{c.status}</strong>
        </section>
        {s.role !== 'candidate' && (
          <div className="workspace">
            <b>
              {s.campaign.applications.length} {c.applications}
            </b>
            {s.role !== 'coordinator' && (
              <nav>
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    aria-pressed={s.tab === tab}
                    onClick={() => set((prev) => ({ ...prev, tab }))}
                  >
                    {c[tab]}
                  </button>
                ))}
              </nav>
            )}
          </div>
        )}
        <div className="panel">
          {s.role === 'candidate' ? (
            <Candidate {...props} />
          ) : s.role === 'coordinator' || s.tab === 'meeting' ? (
            <Deliberation {...props} />
          ) : s.tab === 'test' ? (
            <Grading {...props} />
          ) : (
            <Screening {...props} />
          )}
        </div>
        <footer>
          <span>
            {c.sample} · {s.role === 'coordinator' ? c.billing : c.company}
          </span>
          <button onClick={() => open(true)}>{c.reset}</button>
        </footer>
        {confirm && (
          <section role="alertdialog" aria-label={c.reset}>
            <p>{c.confirm}</p>
            <button onClick={() => open(false)}>{c.cancel}</button>
            <button
              onClick={() => {
                history.replaceState(null, '', location.pathname)
                set(initial())
                open(false)
              }}
            >
              {c.restore}
            </button>
          </section>
        )}
      </main>
    </>
  )
}
createRoot(document.getElementById('root')!).render(<App />)
