import {staff,type ViewProps} from './model'
export default function Grading({campaign,lang}:ViewProps){
  return <section><h2>{lang==='id'?'Tes teknis':'Technical Test'}</h2>{campaign.grades.map(g=><p key={g.applicationId+g.assessor}>{staff[g.assessor]} · {g.diagram+g.reasoning}/4</p>)}</section>
}
