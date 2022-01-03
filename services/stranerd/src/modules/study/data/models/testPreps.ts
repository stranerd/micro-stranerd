import { PrepData } from '../../domain/types'

export interface TestPrepFromModel extends TestPrepToModel {
	_id: string
	createdAt: number
	updatedAt: number
}

export interface TestPrepToModel {
	name: string
	data: PrepData
	questions: number
	time: number
}