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
}

export interface PastQuestionTheoryToModel extends PastQuestionToModel {
	answer: string
	answerMedia: MediaOutput[]
}

export interface PastQuestionObjToModel extends PastQuestionToModel {
	correctIndex: number
	options: string[]
	optionsMedia: MediaOutput[][]
	explanation: string
	explanationMedia: MediaOutput[]
}

export type PastQuestionTheoryFromModel = PastQuestionTheoryToModel & PastQuestionFromModel
export type PastQuestionObjFromModel = PastQuestionObjToModel & PastQuestionFromModel