import { MediaOutput } from '@utils/commons'

export interface PastQuestionFromModel extends PastQuestionToModel {
	_id: string
	createdAt: number
	updatedAt: number
}

export interface PastQuestionToModel {
	order: number
	institutionId: string
	courseId: string
	year: number
	question: string
	questionMedia: MediaOutput[]
	answer: string
}

export interface PastQuestionTheoryToModel extends PastQuestionToModel {
	answerMedia: MediaOutput[]
}

export interface PastQuestionObjToModel extends PastQuestionToModel {
}

export type PastQuestionTheoryFromModel = PastQuestionTheoryToModel & PastQuestionFromModel
export type PastQuestionObjFromModel = PastQuestionObjToModel & PastQuestionFromModel