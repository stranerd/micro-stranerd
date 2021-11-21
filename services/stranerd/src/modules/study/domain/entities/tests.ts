import { BaseEntity } from '@utils/commons'
import { TaskID, TestData } from '../types'

export class TestEntity extends BaseEntity {
	public readonly id: string
	public readonly data: TestData
	public readonly questions: string[]
	public readonly answers: Record<string, number>
	public readonly score: number
	public readonly userId: string
	public readonly taskIds: TaskID[]
	public readonly done: boolean
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({
		             id,
		             data,
		             questions,
		             answers,
		             score,
		             userId,
		             taskIds,
		             done,
		             createdAt,
		             updatedAt
	             }: TestConstructorArgs) {
		super()
		this.id = id
		this.data = data
		this.questions = questions
		this.answers = answers
		this.score = score
		this.userId = userId
		this.taskIds = taskIds
		this.done = done
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}
}

type TestConstructorArgs = {
	id: string
	data: TestData
	questions: string[]
	answers: Record<string, number>
	score: number
	userId: string
	taskIds: TaskID[]
	done: boolean
	createdAt: number
	updatedAt: number
}
