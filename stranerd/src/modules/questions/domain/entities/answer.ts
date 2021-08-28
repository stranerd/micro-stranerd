import { UserBio } from '../../../users/domain/types/users'
import { generateDefaultBio } from '../../../users/domain/entities/users'
import { BaseEntity } from '@stranerd/api-commons'
import { catchDivideByZero, extractTextFromHTML, trimToLength } from '@utils/commons'

export class AnswerEntity extends BaseEntity {
	public readonly id: string
	public readonly title: string
	public readonly body: string
	public readonly coins: number
	public readonly best: boolean
	public readonly questionId: string
	public readonly subjectId: string
	public readonly tags: string[]
	public readonly userId: string
	public readonly user: UserBio
	public readonly ratings: { total: number, count: number }
	public readonly commentsCount: number
	public readonly createdAt: number

	constructor ({
		             id, title, body, coins, questionId, tags,
		             subjectId, createdAt, userId, user,
		             best, ratings, comments
	             }: AnswerConstructorArgs) {
		super()
		this.id = id
		this.title = title
		this.body = body
		this.coins = coins
		this.tags = tags
		this.questionId = questionId
		this.subjectId = subjectId
		this.userId = userId
		this.user = generateDefaultBio(user)
		this.best = best ?? false
		this.ratings = { total: ratings?.total ?? 0, count: ratings?.count ?? 0 }
		this.commentsCount = comments?.count ?? 0
		this.createdAt = createdAt
	}

	get averageRating () {
		return catchDivideByZero(this.ratings.total, this.votes)
	}

	get votes () {
		return this.ratings.count
	}

	get userName () {
		return this.user.firstName + this.user.lastName
	}

	get avatar () {
		return this.user.photo
	}

	get trimmedTitle () {
		return trimToLength(this.strippedTitle, 200)
	}

	get trimmedBody () {
		return trimToLength(this.strippedBody, 200)
	}

	get strippedTitle () {
		return extractTextFromHTML(this.title)
	}

	get strippedBody () {
		return extractTextFromHTML(this.body)
	}

	get isModified () {
		return this.best || this.ratings.count > 0
	}

	get canBeEdited () {
		return !this.isModified
	}

	get canBeDeleted () {
		return !this.isModified
	}
}

type AnswerConstructorArgs = {
	id: string
	title: string
	body: string
	coins: number
	tags: string[]
	questionId: string
	subjectId: string
	createdAt: number
	userId: string
	user: UserBio
	best?: boolean
	ratings?: {
		total: number
		count: number
	}
	comments?: { count: number }
}
