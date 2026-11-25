import {useState, useSyncExternalStore, type FormEvent} from 'react'
import type {Draft,ViewProps} from './model'
import {intakeCopy} from './intakeCopy'
import './intake.css'

function subscribeToHashChange(onChange: () => void) {
  window.addEventListener('hashchange', onChange)
  return () => window.removeEventListener('hashchange', onChange)
}

export default function Candidate({lang, campaign, update: change}: ViewProps) {
  const t = intakeCopy[lang]
  const draft = campaign.draft
  const hash = useSyncExternalStore(subscribeToHashChange, () => location.hash)
  const [error, setError] = useState(false)

  function update(patch: Partial<Draft>) {
    change(previous => ({...previous, draft: {...previous.draft, ...patch}}))
    setError(false)
  }

  function fillSample() {
    update({
      name: 'Nala Kirana',
      email: 'nala@example.test',
      cv: 'field',
      mapping: t.sampleField,
      records: t.sampleNotes,
    })
  }

  function submit(event: FormEvent) {
    event.preventDefault()
    if (![draft.name, draft.email, draft.cv, draft.mapping, draft.records].every(value => value.trim())) {
      setError(true)
      return
    }

    const id = crypto.randomUUID()
    change(previous => {
      if (previous.submittedId) return previous
      return {
        ...previous,
        submittedId: id,
        applications: [...previous.applications, {
          id, name: previous.draft.name.trim(), stage: 'applied', materials: {...previous.draft},
        }],
      }
    })
  }

  const media = `/samples/intake/${draft.video}-${lang}`
  if (hash.startsWith('#status/')) {
    const id = hash.slice('#status/'.length)
    const own = campaign.applications.find(application => application.id === id && id === campaign.submittedId)
    return <section className="intake">
      <h2>{t.status}</h2>
      {own ? <><h3>{own.name}</h3><h4>{t.milestones}</h4><p>{t.shared}</p></> : <p>{t.missing}</p>}
      <a href="#apply">{t.apply}</a>
    </section>
  }

  if (campaign.submittedId) {
    return <section className="intake">
      <h2>{t.received}</h2>
      <aside className="mailbox">
        <h3>{t.mail}</h3>
        <p>{draft.email}</p>
        <a href={`#status/${campaign.submittedId}`}>{t.link}</a>
      </aside>
    </section>
  }
  return <section className="intake"><h2>{t.heading}</h2><p>{t.intro}</p>
    <form onSubmit={submit}>
      <section className="intake-section">
        <button type="button" className="sample-action secondary" onClick={fillSample}>{t.sample}</button>
        <div className="contact-fields">
          <div><label htmlFor="candidate-name">{t.name}</label>
            <input id="candidate-name" required maxLength={100} autoComplete="off" placeholder="Nala Kirana"
              value={draft.name} onChange={e => update({name:e.target.value})} /></div>
          <div><label htmlFor="candidate-email">{t.email}</label>
            <input id="candidate-email" required type="email" maxLength={254} autoComplete="off" placeholder="nala@example.test"
              value={draft.email} onChange={e => update({email:e.target.value})} /></div>
        </div>
        <div><label htmlFor="candidate-cv">{t.cv}</label>
          <select id="candidate-cv" required value={draft.cv} onChange={e => update({cv:e.target.value})}>
            <option value="">{t.choose}</option><option value="field">{t.cvName}</option>
          </select>
          {draft.cv && <a className="original-link" href={`/samples/intake/cv-${lang}.html`} target="_blank" rel="noreferrer">{t.original}</a>}
        </div>
      </section>
      <section className="intake-section">
        <h3>{t.questions}</h3>
        <div><label htmlFor="candidate-field">{t.field}</label>
          <p id="field-prompt" className="field-hint">{t.fieldHelp}</p>
          <textarea id="candidate-field" aria-describedby="field-prompt" required maxLength={1200}
            value={draft.mapping} onChange={e => update({mapping:e.target.value})} /></div>
        <div><label htmlFor="candidate-notes">{t.notes}</label>
          <p id="notes-prompt" className="field-hint">{t.notesHelp}</p>
          <textarea id="candidate-notes" aria-describedby="notes-prompt" required maxLength={1200}
            value={draft.records} onChange={e => update({records:e.target.value})} /></div>
      </section>
      <section className="intake-section">
        <div><label htmlFor="candidate-video">{t.video}</label>
          <p id="video-prompt" className="field-hint">{t.optional}</p>
          <select id="candidate-video" aria-describedby="video-prompt" value={draft.video} onChange={e => update({video:e.target.value})}>
            <option value="">{t.skip}</option><option value="field">{t.fieldClip}</option><option value="core">{t.coreClip}</option>
          </select>
        </div>
        {draft.video && <video key={media} aria-label={t.video} controls playsInline preload="metadata" src={media + '.mp4'}>
          <track default kind="captions" src={media + '.vtt'} srcLang={lang} label={lang === 'id' ? 'Bahasa Indonesia' : 'English'} />
        </video>}
      </section>
      {error && <p role="alert">{t.required}</p>}
      <button className="submit-action" type="submit">{t.send}</button>
    </form>
</section>
}
