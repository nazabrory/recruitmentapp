export type Language = 'id' | 'en'
export type Assessor = 'ayu' | 'bima'
export type Role = 'candidate' | Assessor | 'coordinator'
export type Decision = 'accept' | 'hold' | 'reject'
export type Stage = 'applied' | 'screened' | 'test' | 'interview' | 'offer' | 'hired'
export interface Draft {
  name: string
  email: string
  cv: string
  mapping: string
  records: string
  video: string
}
export interface Application {
  id: string
  name: string
  stage: Stage
  decision?: Decision
  recordedBy?: string
  materials?: Draft
}
export interface BallotEntry {
  applicationId: string
  assessor: Assessor
  recommendation: Decision
  privateNote: string
}
export interface Grade {
  applicationId: string
  assessor: Assessor
  diagram: number
  reasoning: number
}
export interface Campaign {
  deliberationApplicationId?: string
  applications: Application[]
  ballots: BallotEntry[]
  grades: Grade[]
  draft: Draft
  submittedId: string | null
}
export interface ViewProps {
  lang: Language
  role: Role
  campaign: Campaign
  update: (change: (previous: Campaign) => Campaign) => void
}
export const staff = {ayu: 'Ayu Lestari', bima: 'Bima Nugraha', coordinator: 'Ratna Dewi'}
export const caseIds = {clear:'app-01', gap:'app-02', test:'app-03'}
