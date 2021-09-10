import { MediaOutput } from '@utils/commons'

export type UserBio = {
	email: string
	firstName: string
	lastName: string
	photo: MediaOutput | null
}

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