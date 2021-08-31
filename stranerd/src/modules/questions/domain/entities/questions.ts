import { BaseEntity } from '@utils/commons'
import { UserBio } from '../types/users'
import { BEST_ANSWERS_COUNT, QUESTION_DISCOUNT } from '@utils/constants'

export class QuestionEntity extends BaseEntity {
	public readonly id: string
	public readonly body: string
	public readonly coins: number
	public readonly tags: string[]
	public readonly subjectId: string
	public readonly userId: string
	public readonly userBio: UserBio
	public readonly bestAnswers: string[]
	public readonly answersCount: number
	public readonly commentsCount: number
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({
		             id, body, coins, subjectId,
		             bestAnswers, createdAt, userId, userBio,
		             answersCount, commentsCount, tags, updatedAt
	             }: QuestionConstructorArgs) {
		super()
		this.id = id
		this.body = body
		this.coins = coins
		this.tags = tags
		this.subjectId = subjectId
		this.userId = userId
		this.userBio = userBio
		this.bestAnswers = bestAnswers
		this.answersCount = answersCount ?? 0
		this.commentsCount = commentsCount ?? 0
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}

	get creditable () {
		return Math.floor(this.coins * QUESTION_DISCOUNT / BEST_ANSWERS_COUNT)
	}
}

type QuestionConstructorArgs = {
	id: string
	body: string
	coins: number
	tags: string[]
	subjectId: string
	userId: string
	userBio: UserBio
	bestAnswers: string[]
	answersCount: number
	commentsCount: number
	createdAt: number
	updatedAt: number
}
