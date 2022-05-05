import { BaseEntity } from '@utils/commons'
import { EmbeddedUser, Media, QuestionData } from '../types'

export const BEST_ANSWERS_COUNT = 2

export class QuestionEntity extends BaseEntity {
	public readonly id: string
	public readonly body: string
	public readonly attachments: Media[]
	public readonly subject: string
	public readonly user: EmbeddedUser
	public readonly data: QuestionData
	public readonly bestAnswers: string[]
	public readonly answers: { id: string, userId: string }[]
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({
		             id, body, subject, attachments,
		             bestAnswers, createdAt, user, data,
		             answers, updatedAt
	             }: QuestionConstructorArgs) {
		super()
		this.id = id
		this.body = body
		this.attachments = attachments
		this.subject = subject
		this.user = user
		this.data = data
		this.bestAnswers = bestAnswers
		this.answers = answers
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}

	get isAnswered () {
		return this.bestAnswers.length > BEST_ANSWERS_COUNT - 1
	}
}

type QuestionConstructorArgs = {
	id: string
	body: string
	attachments: Media[]
	subject: string
	user: EmbeddedUser
	data: QuestionData
	bestAnswers: string[]
	answers: { id: string, userId: string }[]
	createdAt: number
	updatedAt: number
}
