import { MediaOutput } from '@utils/commons'
import { PastQuestionData } from '../../domain/types'

export interface PastQuestionFromModel extends PastQuestionToModel {
	_id: string
	createdAt: number
	updatedAt: number
}

export interface PastQuestionToModel {
	institutionId: string
	courseId: string
	year: number
	question: string
	questionMedia: MediaOutput[]
	data: PastQuestionData
}