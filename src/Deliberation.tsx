import {caseIds,staff,type ViewProps} from './model'
export default function Deliberation({role,campaign,update,lang}:ViewProps){
  const app=campaign.applications.find(a=>a.id===caseIds.clear)!
  return <section><h2>{app.name}</h2><p>{app.decision==='accept'?(lang==='id'?'Lolos penyaringan':'Screened'):''}</p>{role==='coordinator'&&<button onClick={()=>update(s=>({...s,applications:s.applications.map(a=>a.id===app.id?{...a,stage:'screened',decision:'accept',recordedBy:staff.coordinator}:a)}))}>{lang==='id'?'Terima':'Accept'}</button>}</section>
}
