import { useState } from 'react'
import { caseIds, staff, type Decision, type ViewProps } from './model'
import { evidence } from './evidence'

const weights = [40, 35, 25]
const scores = { clear: [90, 90, 80], gap: [65, 60, null] }
const copy = {
  id: {title:'Penyaringan lamaran', choose:'Lamaran untuk ditinjau', brief:'Ringkasan penyaringan', original:'Dokumen asli', close:'Tutup dokumen', rubric:'Rubrik kampanye', approved:'Versi 1 · Disetujui oleh Ratna Dewi', total:'Skor tertimbang', missing:'Perlu ditinjau', withheld:'Total ditunda sampai bukti lengkap.', ballot:'Rekomendasi asesor', note:'Catatan pribadi', save:'Simpan rekomendasi', saved:'Rekomendasi tersimpan', decisions:['Terima','Tunda','Tolak'], source:'Buka sumber', intro:'Tinjau ringkasan berbasis bukti dan cocokkan klaim dengan dokumen kandidat.', next:'Pilih rekomendasi'},
  en: {title:'Application screening', choose:'Application to review', brief:'Screening Brief', original:'Original document', close:'Close document', rubric:'Campaign Rubric', approved:'Version 1 · Approved by Ratna Dewi', total:'Weighted score', missing:'Needs review', withheld:'Total withheld until the evidence is complete.', ballot:'Assessor recommendation', note:'Private note', save:'Save recommendation', saved:'Recommendation saved', decisions:['Accept','Hold','Reject'], source:'Open source', intro:'Review the evidence-based brief and check each claim against the Candidate’s materials.', next:'Choose a recommendation'},
}
const decisions: Decision[] = ['accept','hold','reject']

export default function Screening(props: ViewProps) {
  const [which, setWhich] = useState<'clear'|'gap'>('clear')
  const {lang, campaign, role} = props
  const c = copy[lang]
  if (role !== 'ayu' && role !== 'bima') return null
  return <section><h2>{c.title}</h2><p>{c.intro}</p>
    <label>{c.choose}<select value={which} onChange={e=>setWhich(e.target.value as typeof which)}>
      {(['clear','gap'] as const).map(key=><option key={key} value={key}>{campaign.applications.find(a=>a.id===caseIds[key])?.name}</option>)}
    </select></label>
    <Review key={role + which} {...props} which={which} assessor={role}/>
  </section>
}

function Review({lang,campaign,update,which,assessor}: ViewProps & {which:'clear'|'gap', assessor:'ayu'|'bima'}) {
  const applicationId = caseIds[which]
  const originalBallot = campaign.ballots.find(b=>b.assessor===assessor && b.applicationId===applicationId)
  const [choice,setChoice] = useState<Decision|''>(originalBallot?.recommendation ?? '')
  const [note,setNote] = useState(originalBallot?.privateNote ?? '')
  const [saved,setSaved] = useState(false)
  const [source,setSource] = useState<number|null>(null)
  const c = copy[lang]
  const material = evidence[lang][which]
  const values = scores[which]
  const total = values.every(v=>v!==null) ? values.reduce<number>((n,v,i)=>n+(v??0)*weights[i]/100,0) : null
  return <>
    <article><h3>{c.brief}</h3><ul>{material.map((m,i)=><li key={i}><p>{m.claim}</p><a href={`/samples/screening/${which}-${lang}.html#passage-${i+1}`} target="_blank" rel="noreferrer" onClick={()=>setSource(i)}>{c.source} · {m.source}</a></li>)}</ul>
    {source!==null && <section aria-label={c.original} className="source-paper"><h4>{material[source].source}</h4><p>{campaign.applications.find(a=>a.id===applicationId)?.name}</p><blockquote><mark>{material[source].passage}</mark></blockquote><button type="button" onClick={()=>setSource(null)}>{c.close}</button></section>}</article>
    <article><h3>{c.rubric}</h3><p>{c.approved}</p>{material.map((m,i)=><section key={i}><h4>{evidence[lang].criteria[i]} · {weights[i]}%</h4><strong>{values[i]===null ? c.missing : values[i]+' / 100'}</strong><p>{m.rationale}</p></section>)}
    <p><strong>{c.total}</strong> · {total===null ? c.withheld : new Intl.NumberFormat(lang).format(total)+' / 100'}</p></article>
    <form onSubmit={e=>{e.preventDefault(); if(!choice)return; update(state=>({...state,ballots:[...state.ballots.filter(b=>b.assessor!==assessor||b.applicationId!==applicationId),{applicationId,assessor,recommendation:choice,privateNote:note}]}));setSaved(true)}}>
    <h3>{c.ballot} · {staff[assessor]}</h3><label>{c.ballot}<select required value={choice} onChange={e=>{setChoice(e.target.value as Decision);setSaved(false)}}><option value="">{c.next}</option>{decisions.map((d,i)=><option value={d} key={d}>{c.decisions[i]}</option>)}</select></label>
    <label>{c.note}<textarea value={note} onChange={e=>{setNote(e.target.value);setSaved(false)}}/></label><button>{c.save}</button>{saved&&<p role="status">{c.saved}</p>}</form>
  </>
}
