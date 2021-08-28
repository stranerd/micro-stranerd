import { UserBio } from '../../../users/domain/types/users'
import { generateDefaultBio } from '../../../users/domain/entities/users'
import { BaseEntity } from '@stranerd/api-commons'
import { extractTextFromHTML, getStringCount, trimToLength } from '@utils/commons'
import { BEST_ANSWERS_COUNT, QUESTION_DISCOUNT } from '@utils/constants'

export class QuestionEntity extends BaseEntity {
	public readonly id: string
	public readonly body: string
	public readonly coins: number
	public readonly tags: string[]
	public readonly subjectId: string
	public readonly userId: string
	public readonly user: UserBio
	public readonly answerId: { first: string | null, second: string | null }
	public readonly answers: number
	public readonly commentsCount: number
	public readonly createdAt: number

	constructor ({
		             id, body, coins, subjectId,
		             answerId, createdAt, userId, user, comments,
		             answers, tags
	             }: QuestionConstructorArgs) {
		super()
		this.id = id
		this.body = body
		this.coins = coins
		this.tags = tags
		this.subjectId = subjectId
		this.userId = userId
		this.user = generateDefaultBio(user)
		this.answerId = { first: answerId?.first ?? null, second: answerId?.second ?? null }
		this.answers = answers ?? 0
		this.commentsCount = comments?.count ?? 0
		this.createdAt = createdAt
	}

	get isAnswered () {
		return this.answerId.first && this.answerId.second
	}

	get creditable () {
		return Math.floor(this.coins * QUESTION_DISCOUNT / BEST_ANSWERS_COUNT)
	}

	get userName () {
		return this.user.firstName + this.user.lastName
	}

	get avatar () {
		return this.user.photo
	}

	get trimmedBody () {
		return trimToLength(this.strippedBody, 100)
	}

	get strippedBody () {
		return extractTextFromHTML(this.body)
	}

	get isModified () {
		return this.answers > 0
	}

	get canBeEdited () {
		return !this.isModified
	}

	get canBeDeleted () {
		return !this.isModified
	}

	get attachments () {
		return getStringCount(this.body, '<img')
	}
}

type QuestionConstructorArgs = {
	id: string
	body: string
	coins: number
	tags: string[]
	subjectId: string
	createdAt: number
	userId: string
	user: UserBio
	answerId?: { first?: string | null, second?: string | null }
	answers?: number
	comments?: { count: number }
}
