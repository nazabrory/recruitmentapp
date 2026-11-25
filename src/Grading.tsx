import { useState } from 'react'
import { caseIds, staff, type Assessor, type ViewProps } from './model'

const copy = {
  id: {
    title: 'Tes teknis tertulis',
    prompt:
      'Gambarkan urutan kedua lapisan. Jelaskan perubahan ukuran butir dan usulkan satu pemeriksaan lapangan.',
    original: 'Buka foto asli',
    alt: 'Kolom dengan batupasir di atas serpih, panah ke atas dan dua catatan tulisan tangan.',
    transcript: 'Transkrip awal',
    doubtful: 'Kata yang belum pasti',
    check: 'Saya sudah mencocokkan transkrip dengan foto asli.',
    diagram: 'Urutan dan orientasi lapisan',
    reasoning: 'Pengamatan dan pemeriksaan lapangan',
    guide:
      'Beri 0 jika tidak dijawab, 1 jika sebagian benar, atau 2 jika lengkap dan benar.',
    save: 'Simpan nilai',
    saved: 'Nilai tersimpan',
    unsaved: 'Perubahan nilai belum disimpan.',
    choose: 'Pilih nilai',
  },
  en: {
    title: 'Handwritten Technical Test',
    prompt:
      'Sketch the two beds in order. Describe the grain-size change and suggest one field check.',
    original: 'Open original photo',
    alt: 'Column showing sandstone over shale, an upward arrow, and two handwritten observations.',
    transcript: 'Precomputed transcript',
    doubtful: 'Uncertain word',
    check: 'I checked the transcript against the original photo.',
    diagram: 'Bed order and orientation',
    reasoning: 'Observation and field check',
    guide:
      'Award 0 for absent, 1 for partly correct, or 2 for complete and correct.',
    save: 'Save grade',
    saved: 'Grade saved',
    unsaved: 'Grade changes are unsaved.',
    choose: 'Choose score',
  },
}
export default function Grading(props: ViewProps) {
  if (props.role !== 'ayu' && props.role !== 'bima') return null
  return <Assessment key={props.role} {...props} assessor={props.role} />
}
function Assessment({
  campaign,
  update,
  lang,
  assessor,
}: ViewProps & { assessor: Assessor }) {
  const id = caseIds.test
  const c = copy[lang]
  const existing = campaign.grades.find(
    (g) => g.assessor === assessor && g.applicationId === id,
  )
  const [verified, verify] = useState(false)
  const [diagram, setDiagram] = useState(existing?.diagram.toString() ?? '')
  const [reasoning, setReasoning] = useState(
    existing?.reasoning.toString() ?? '',
  )
  const gradeMatches =
    existing &&
    diagram === String(existing.diagram) &&
    reasoning === String(existing.reasoning)
  return (
    <section>
      <h2>{c.title}</h2>
      <h3>{campaign.applications.find((a) => a.id === id)?.name}</h3>
      <p>{c.prompt}</p>
      <figure>
        <a
          href="/samples/geology-response.jpg"
          target="_blank"
          rel="noreferrer"
        >
          <img
            style={{ width: '100%', maxWidth: 680 }}
            src="/samples/geology-response.jpg"
            alt={c.alt}
          />
          <figcaption>{c.original}</figcaption>
        </a>
      </figure>
      <article>
        <h3>{c.transcript}</h3>
        <blockquote lang="id">
          Ukuran butir bertambah ke atas. Periksa silang dengan{' '}
          <mark>singkapan?</mark> lain.
        </blockquote>
        {lang === 'en' && (
          <p>
            Grain size increases upward. Cross-check against another [outcrop?].
          </p>
        )}
        <p>
          {c.doubtful} · <i>singkapan</i>
        </p>
      </article>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          if (!verified || diagram === '' || reasoning === '') return
          update((state) => ({
            ...state,
            grades: [
              ...state.grades.filter(
                (g) => g.assessor !== assessor || g.applicationId !== id,
              ),
              {
                assessor,
                applicationId: id,
                diagram: Number(diagram),
                reasoning: Number(reasoning),
              },
            ],
          }))
        }}
      >
        <h3>{staff[assessor]}</h3>
        <p>{c.guide}</p>
        <label>
          <input
            type="checkbox"
            checked={verified}
            onChange={(e) => {
              verify(e.target.checked)
            }}
          />
          {c.check}
        </label>
        {(
          [
            [c.diagram, diagram, setDiagram],
            [c.reasoning, reasoning, setReasoning],
          ] as const
        ).map(([label, value, set]) => (
          <label key={label}>
            {label}
            <select
              required
              value={value}
              onChange={(e) => {
                set(e.target.value)
              }}
            >
              <option value="">{c.choose}</option>
              {[0, 1, 2].map((n) => (
                <option key={n}>{n}</option>
              ))}
            </select>
          </label>
        ))}
        <button disabled={!verified || diagram === '' || reasoning === ''}>
          {c.save}
        </button>
        {existing && (
          <p role="status">
            {gradeMatches
              ? `${c.saved} · ${staff[assessor]} · ${existing.diagram + existing.reasoning} / 4`
              : c.unsaved}
          </p>
        )}
      </form>
    </section>
  )
}
