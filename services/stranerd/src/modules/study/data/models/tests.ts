import { TaskID, TestData } from '../../domain/types'

export interface TestFromModel extends TestToModel {
	_id: string
	taskIds: TaskID[]
	createdAt: number
	updatedAt: number
}

export interface TestToModel {
	data: TestData
	questions: string[]
	answers: Record<string, number>
	done: boolean
	score: number
	userId: string
}