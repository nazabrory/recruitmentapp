import {useState} from 'react'
import {caseIds, staff, type Decision, type Application, type ViewProps} from './model'

const copy = {
  id:{title:'Musyawarah',select:'Lamaran untuk musyawarah',stage:'Tahap saat ini',recommendation:'Rekomendasi',grades:'Penilaian tes teknis',none:'Belum disampaikan',decision:'Keputusan akhir kandidat',choose:'Pilih keputusan',record:'Catat keputusan akhir',by:'Dicatat oleh',diagram:'Diagram',reason:'Pengamatan',accept:'Terima',hold:'Tunda',reject:'Tolak',applied:'Lamaran masuk',screened:'Lolos penyaringan',test:'Tes',interview:'Wawancara',offer:'Penawaran',hired:'Diterima bekerja'},
  en:{title:'Deliberation',select:'Application for Deliberation',stage:'Current stage',recommendation:'Recommendation',grades:'Technical Test assessment',none:'Pending',decision:'Final Candidate Decision',choose:'Select decision',record:'Record final decision',by:'Recorded by',diagram:'Diagram',reason:'Observation',accept:'Accept',hold:'Hold',reject:'Reject',applied:'Applied',screened:'Screened',test:'Test',interview:'Interview',offer:'Offer',hired:'Hired'},
}
export default function Deliberation(props:ViewProps) {
  const {lang,campaign,role,update} = props
  const id = campaign.deliberationApplicationId ?? caseIds.clear
  if(role==='candidate')return null
  const c=copy[lang]
  const app=campaign.applications.find(a=>a.id===id)
  if(!app)return null
  return <section><h2>{c.title}</h2><label>{c.select}<select value={id} onChange={e=>{const selected=e.target.value; update(state=>({...state,deliberationApplicationId:selected}))}}>{campaign.applications.map(a=><option value={a.id} key={a.id}>{a.name}</option>)}</select></label>
  <article><h3>{app.name}</h3><p>{c.stage} · <strong>{c[app.stage]}</strong></p>
  {(['ayu','bima'] as const).map(assessor=>{
    const ballot=campaign.ballots.find(b=>b.assessor===assessor&&b.applicationId===id)
    const grade=campaign.grades.find(g=>g.assessor===assessor&&g.applicationId===id)
    return <section key={assessor}><h4>{staff[assessor]}</h4><p>{c.recommendation} · <strong>{ballot?c[ballot.recommendation]:c.none}</strong></p><p>{c.grades} · {grade ? `${grade.diagram+grade.reasoning} / 4 (${c.diagram} ${grade.diagram}/2 · ${c.reason} ${grade.reasoning}/2)` : c.none}</p></section>
  })}</article>
  {app.decision&&<p role="status">{c[app.decision]} · {c.by} {app.recordedBy}</p>}
  {role==='coordinator'&&!app.decision&&<DecisionForm key={app.id} {...props} app={app}/>}</section>
}
function DecisionForm({app,lang,update}:ViewProps & {app:Application}){
  const [choice,setChoice]=useState<Decision|''>(app.decision??'')
  const c=copy[lang]
  return <form onSubmit={e=>{e.preventDefault();if(!choice)return;update(state=>({...state,applications:state.applications.map(a=>a.id!==app.id||a.decision?a:{...a,decision:choice,recordedBy:staff.coordinator,stage:choice==='accept'&&a.stage==='applied'?'screened':a.stage})}))}}>
  <label>{c.decision}<select required value={choice} onChange={e=>setChoice(e.target.value as Decision)}><option value="">{c.choose}</option>{(['accept','hold','reject'] as const).map(d=><option key={d} value={d}>{c[d]}</option>)}</select></label><button disabled={!choice}>{c.record}</button></form>
}
