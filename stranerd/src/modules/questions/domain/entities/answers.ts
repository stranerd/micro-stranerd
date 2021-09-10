import { BaseEntity } from '@utils/commons'
import { UserBio } from '../types'

export class AnswerEntity extends BaseEntity {
	public readonly id: string
	public readonly title: string
	public readonly body: string
	public readonly coins: number
	public readonly best: boolean
	public readonly questionId: string
	public readonly tags: string[]
	public readonly userId: string
	public readonly userBio: UserBio
	public readonly votes: { userId: string, vote: 1 | -1 }[]
	public readonly commentsCount: number
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({
		             id, title, body, coins, questionId,
		             createdAt, userId, userBio, tags,
		             best, votes, commentsCount, updatedAt
	             }: AnswerConstructorArgs) {
		super()
		this.id = id
		this.title = title
		this.body = body
		this.coins = coins
		this.questionId = questionId
		this.userId = userId
		this.tags = tags
		this.userBio = userBio
		this.best = best ?? false
		this.votes = votes
		this.commentsCount = commentsCount ?? 0
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}

	get totalVotes () {
		return this.votes.map((v) => v.vote)
			.reduce((acc, val) => acc + val, 0)
	}
}

type AnswerConstructorArgs = {
	id: string
	title: string
	body: string
	coins: number
	questionId: string
	tags: string[]
	createdAt: number
	updatedAt: number
	userId: string
	userBio: UserBio
	best: boolean
	votes: { userId: string, vote: 1 | -1 }[]
	commentsCount: number
}
