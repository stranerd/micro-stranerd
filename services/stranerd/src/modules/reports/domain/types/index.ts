import { UserBio } from '@modules/users'
import { MediaOutput } from '@utils/common'

export { UserBio }

export enum ReportType {
	users = 'users',
	questions = 'questions',
	answers = 'answers',
	pastQuestions = 'pastQuestions'
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

type PastQuestionType = {
	question: string
	questionMedia: MediaOutput[]
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