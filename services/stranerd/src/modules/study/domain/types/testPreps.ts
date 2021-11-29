import { PastQuestionType } from './pastQuestions'

export enum PrepType {
	pastQuestion = 'pastQuestion'
}

type PQType = {
	type: PrepType.pastQuestion
	questionType: PastQuestionType
	courseId: string
	year: number
	institutionId: string
}

export type PrepData = PQType