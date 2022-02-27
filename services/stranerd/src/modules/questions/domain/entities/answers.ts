import { BaseEntity } from '@utils/commons'
import { Media, UserBio, UserRoles } from '../types'

export class AnswerEntity extends BaseEntity {
	public readonly id: string
	public readonly title: string
	public readonly body: string
	public readonly best: boolean
	public readonly questionId: string
	public readonly attachments: Media[]
	public readonly userId: string
	public readonly userBio: UserBio
	public readonly userRoles: UserRoles
	public readonly votes: { userId: string, vote: 1 | -1 }[]
	public readonly commentsCount: number
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({
		             id, title, body, questionId,
		             createdAt, userId, userBio, userRoles, attachments,
		             best, votes, commentsCount, updatedAt
	             }: AnswerConstructorArgs) {
		super()
		this.id = id
		this.title = title
		this.body = body
		this.questionId = questionId
		this.userId = userId
		this.attachments = attachments
		this.userBio = userBio
		this.userRoles = userRoles
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
	questionId: string
	attachments: Media[]
	createdAt: number
	updatedAt: number
	userId: string
	userBio: UserBio
	userRoles: UserRoles
	best: boolean
	votes: { userId: string, vote: 1 | -1 }[]
	commentsCount: number
}
