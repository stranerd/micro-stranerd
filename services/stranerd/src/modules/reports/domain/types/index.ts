import { UserBio, UserRoles } from '@modules/users'
import { MediaOutput } from '@utils/common'

export { UserBio, UserRoles }

export enum ReportType {
	users = 'users',
	questions = 'questions',
	answers = 'answers',
	pastQuestions = 'pastQuestions'
}

type UserReportType = {
	userRoles: UserRoles
	userBio: UserBio
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