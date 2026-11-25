import { caseIds, type Campaign, type Stage } from './model'
const roster: [string, Stage][] = [
  ['Dara Paramita', 'applied'],
  ['Reno Pradana', 'applied'],
  ['Sari Mahendra', 'test'],
  ['Nadia Laras', 'interview'],
  ['Ardi Wisesa', 'screened'],
  ['Lintang Pratiwi', 'offer'],
  ['Dimas Wicaksono', 'applied'],
  ['Tia Permata', 'hired'],
]
export function seed(): Campaign {
  return {
    applications: roster.map(([name, stage], i) => ({
      id: 'app-0' + (i + 1),
      name,
      stage,
    })),
    draft: { name: '', email: '', cv: '', mapping: '', records: '', video: '' },
    submittedId: null,
    ballots: [caseIds.clear, caseIds.test].flatMap((applicationId) => [
      {
        applicationId,
        assessor: 'ayu',
        recommendation: 'accept',
        privateNote: '',
      },
      {
        applicationId,
        assessor: 'bima',
        recommendation: 'hold',
        privateNote: '',
      },
    ]),
    grades: [
      {
        applicationId: caseIds.test,
        assessor: 'bima',
        diagram: 2,
        reasoning: 1,
      },
    ],
  }
}
