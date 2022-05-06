import { BaseEntity } from '@utils/commons'
import { AnswerType, PastQuestionType, TestData } from '../types'

export class TestEntity extends BaseEntity {
	public readonly id: string
	public readonly name: string
	public readonly data: TestData
	public readonly questionType: PastQuestionType
	public readonly questions: string[]
	public readonly answers: Record<string, AnswerType>
	public readonly score: number
	public readonly userId: string
	public readonly prepId: string
	public readonly taskIds: string[]
	public readonly done: boolean
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({
		             id,
		             name,
		             data,
		             questions,
		             questionType,
		             answers,
		             score,
		             userId,
		             prepId,
		             taskIds,
		             done,
		             createdAt,
		             updatedAt
	             }: TestConstructorArgs) {
		super()
		this.id = id
		this.name = name
		this.data = data
		this.questions = questions
		this.questionType = questionType
		this.answers = answers
		this.score = score
		this.userId = userId
		this.prepId = prepId
		this.taskIds = taskIds
		this.done = done
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}
}

type TestConstructorArgs = {
	id: string
	name: string
	data: TestData
	questionType: PastQuestionType,
	questions: string[]
	answers: Record<string, AnswerType>
	score: number
	userId: string
	prepId: string
	taskIds: string[]
	done: boolean
	createdAt: number
	updatedAt: number
}
