import { BaseEntity } from '@utils/commons'
import { EmbeddedUser, Media } from '../types'

export class AnswerEntity extends BaseEntity {
	public readonly id: string
	public readonly title: string
	public readonly body: string
	public readonly best: boolean
	public readonly questionId: string
	public readonly attachments: Media[]
	public readonly user: EmbeddedUser
	public readonly votes: { userId: string, vote: 1 | -1 }[]
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({
		             id, title, body, questionId,
		             createdAt, user, attachments,
		             best, votes, updatedAt
	             }: AnswerConstructorArgs) {
		super()
		this.id = id
		this.title = title
		this.body = body
		this.questionId = questionId
		this.user = user
		this.attachments = attachments
		this.best = best ?? false
		this.votes = votes
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
	user: EmbeddedUser
	best: boolean
	votes: { userId: string, vote: 1 | -1 }[]
}
