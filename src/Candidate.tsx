import type {ViewProps} from './model'
export default function Candidate({campaign,update,lang}:ViewProps){
  if(campaign.submittedId)return <h2>{lang==='id'?'Lamaran diterima':'Application received'}</h2>
  return <button onClick={()=>update(s=>s.submittedId?s:{...s,submittedId:'sample',applications:[...s.applications,{id:'sample',name:'Nala Kirana',stage:'applied'}]})}>{lang==='id'?'Kirim contoh lamaran':'Submit sample Application'}</button>
}
