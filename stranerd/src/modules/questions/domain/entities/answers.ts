import { BaseEntity } from '@utils/commons'
import { UserBio } from '../types/users'

export class AnswerEntity extends BaseEntity {
	public readonly id: string
	public readonly title: string
	public readonly body: string
	public readonly coins: number
	public readonly best: boolean
	public readonly questionId: string
	public readonly userId: string
	public readonly userBio: UserBio
	public readonly ratings: { total: number, count: number }
	public readonly commentsCount: number
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({
		             id, title, body, coins, questionId,
		             createdAt, userId, userBio,
		             best, ratings, commentsCount, updatedAt
	             }: AnswerConstructorArgs) {
		super()
		this.id = id
		this.title = title
		this.body = body
		this.coins = coins
		this.questionId = questionId
		this.userId = userId
		this.userBio = userBio
		this.best = best ?? false
		this.ratings = { total: ratings.total ?? 0, count: ratings.count ?? 0 }
		this.commentsCount = commentsCount ?? 0
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}
}

type AnswerConstructorArgs = {
	id: string
	title: string
	body: string
	coins: number
	questionId: string
	createdAt: number
	updatedAt: number
	userId: string
	userBio: UserBio
	best: boolean
	ratings: {
		total: number
		count: number
	}
	commentsCount: number
}
