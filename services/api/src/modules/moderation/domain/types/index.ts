export { EmbeddedUser } from '@modules/users'

export enum ReportType {
	users = 'users',
	questions = 'questions',
	answers = 'answers',
	pastQuestions = 'pastQuestions',
	flashCards = 'flashCards'
}

export type Reported = {
	type: ReportType,
	id: string
}