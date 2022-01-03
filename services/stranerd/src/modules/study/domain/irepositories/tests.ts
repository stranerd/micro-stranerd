import { TestEntity } from '../entities/tests'
import { TestToModel } from '../../data/models/tests'
import { QueryParams, QueryResults } from '@utils/commons'
import { AnswerType, TaskID } from '../types'

export interface ITestRepository {
	add: (data: TestToModel) => Promise<TestEntity>
	update: (id: string, userId: string, data: Partial<TestToModel>) => Promise<TestEntity | null>
	get: (query: QueryParams) => Promise<QueryResults<TestEntity>>
	find: (id: string, userId: string) => Promise<TestEntity | null>
	updateAnswer: (id: string, userId: string, questionId: string, answer: AnswerType) => Promise<boolean>
	updateTaskIds: (id: string, taskIds: TaskID[]) => Promise<void>
	delete: (id: string, userId: string) => Promise<boolean>
}
