import {caseIds,type ViewProps} from './model'
export default function Screening({role,campaign,update,lang}:ViewProps){
  if(role!=='ayu'&&role!=='bima')return null
  return <section><h2>{campaign.applications[0].name}</h2><button onClick={()=>update(s=>({...s,ballots:[...s.ballots.filter(b=>b.assessor!==role||b.applicationId!==caseIds.clear),{assessor:role,applicationId:caseIds.clear,recommendation:'hold',privateNote:''}]}))}>{lang==='id'?'Rekomendasikan tunda':'Recommend Hold'}</button></section>
}
