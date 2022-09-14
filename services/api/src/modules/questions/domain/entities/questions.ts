import { BaseEntity } from '@utils/app/package'
import { EmbeddedUser, Media, QuestionMeta } from '../types'

export const BEST_ANSWERS_COUNT = 1

export class QuestionEntity extends BaseEntity {
	public readonly id: string
	public readonly body: string
	public readonly attachments: Media[]
	public readonly tagId: string
	public readonly user: EmbeddedUser
	public readonly bestAnswers: string[]
	public readonly answers: { id: string, userId: string }[]
	public readonly meta: QuestionMeta
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({
		             id, body, tagId, attachments,
		             bestAnswers, createdAt, user,
		             meta, answers, updatedAt
	             }: QuestionConstructorArgs) {
		super()
		this.id = id
		this.body = body
		this.attachments = attachments
		this.tagId = tagId
		this.user = user
		this.bestAnswers = bestAnswers
		this.answers = answers
		this.meta = meta
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
	tagId: string
	user: EmbeddedUser
	bestAnswers: string[]
	answers: { id: string, userId: string }[]
	meta: QuestionMeta
	createdAt: number
	updatedAt: number
}
