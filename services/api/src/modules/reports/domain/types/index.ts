import { EmbeddedUser } from '@modules/users'
import { MediaOutput } from '@utils/commons'

export { EmbeddedUser }
export type Media = MediaOutput

export enum ReportType {
	users = 'users',
	questions = 'questions',
	answers = 'answers',
	pastQuestions = 'pastQuestions'
}

type UserReportType = EmbeddedUser

type QuestionReportType = {
	body: string
	user: EmbeddedUser
}
type AnswerReportType = {
	title: string
	body: string
	questionId: string
	user: EmbeddedUser
}

type PastQuestionType = {
	question: string
	questionMedia: Media[]
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
} | {
	type: ReportType.pastQuestions,
	reported: PastQuestionType
}