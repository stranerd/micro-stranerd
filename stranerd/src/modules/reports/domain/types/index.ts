import { UserBio } from '@modules/users'

export { UserBio }

export enum ReportType {
	users = 'users',
	questions = 'questions',
	answers = 'answers'
}

type UserReportType = {
	bio: UserBio
	userId: string
}

type QuestionReportType = {
	body: string
	userId: string
}
type AnswerReportType = {
	title: string
	body: string
	questionId: string
	userId: string
}

export type ReportData = {
	type: ReportType.users,
	reported: UserReportType
} | {
	type: ReportType.questions,
	reported: QuestionReportType
} | {
	type: ReportType.answers,
	reported: AnswerReportType
}