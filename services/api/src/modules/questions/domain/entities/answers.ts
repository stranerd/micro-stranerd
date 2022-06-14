import { BaseEntity } from '@utils/commons'
import { AnswerMeta, EmbeddedUser, Media } from '../types'

export class AnswerEntity extends BaseEntity {
	public readonly id: string
	public readonly body: string
	public readonly best: boolean
	public readonly questionId: string
	public readonly tagId: string
	public readonly attachments: Media[]
	public readonly user: EmbeddedUser
	public readonly votes: { userId: string, vote: 1 | -1 }[]
	public readonly meta: AnswerMeta
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({
		             id, body, questionId, tagId,
		             createdAt, user, attachments, meta,
		             best, votes, updatedAt
	             }: AnswerConstructorArgs) {
		super()
		this.id = id
		this.body = body
		this.questionId = questionId
		this.tagId = tagId
		this.user = user
		this.attachments = attachments
		this.best = best ?? false
		this.votes = votes
		this.meta = meta
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
	body: string
	questionId: string
	tagId: string
	attachments: Media[]
	createdAt: number
	updatedAt: number
	user: EmbeddedUser
	best: boolean
	votes: { userId: string, vote: 1 | -1 }[]
	meta: AnswerMeta
}
