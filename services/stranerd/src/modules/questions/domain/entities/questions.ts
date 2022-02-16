import { BaseEntity, MediaOutput } from '@utils/commons'
import { UserBio, UserRoles } from '../types'

export const BEST_ANSWERS_COUNT = 2

export class QuestionEntity extends BaseEntity {
	public readonly id: string
	public readonly body: string
	public readonly tags: string[]
	public readonly attachments: MediaOutput[]
	public readonly subjectId: string
	public readonly userId: string
	public readonly userBio: UserBio
	public readonly userRoles: UserRoles
	public readonly bestAnswers: string[]
	public readonly answers: { id: string, userId: string }[]
	public readonly commentsCount: number
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({
		             id, body, subjectId, attachments,
		             bestAnswers, createdAt, userId, userBio, userRoles,
		             answers, commentsCount, tags, updatedAt
	             }: QuestionConstructorArgs) {
		super()
		this.id = id
		this.body = body
		this.attachments = attachments
		this.tags = tags
		this.subjectId = subjectId
		this.userId = userId
		this.userBio = userBio
		this.userRoles = userRoles
		this.bestAnswers = bestAnswers
		this.answers = answers
		this.commentsCount = commentsCount ?? 0
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
	tags: string[]
	attachments: MediaOutput[]
	subjectId: string
	userId: string
	userBio: UserBio
	userRoles: UserRoles
	bestAnswers: string[]
	answers: { id: string, userId: string }[]
	commentsCount: number
	createdAt: number
	updatedAt: number
}
