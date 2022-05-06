import { AnswerType, PastQuestionType, TestData } from '../../domain/types'

export interface TestFromModel extends TestToModel {
	_id: string
	taskIds: string[]
	createdAt: number
	updatedAt: number
}

export interface TestToModel {
	name: string
	questionType: PastQuestionType
	data: TestData
	questions: string[]
	answers: Record<string, AnswerType>
	done: boolean
	score: number
	userId: string
	prepId: string
}