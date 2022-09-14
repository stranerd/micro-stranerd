import { BaseEntity } from '@utils/app/package'
import { AnswerMeta, EmbeddedUser, Media } from '../types'

export class AnswerEntity extends BaseEntity {
	public readonly id: string
	public readonly body: string
	public readonly best: boolean
	public readonly questionId: string
	public readonly tagId: string
	public readonly attachments: Media[]
	public readonly user: EmbeddedUser
	public readonly meta: AnswerMeta
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({
		             id, body, questionId, tagId,
		             createdAt, user, attachments, meta,
		             best, updatedAt
	             }: AnswerConstructorArgs) {
		super()
		this.id = id
		this.body = body
		this.questionId = questionId
		this.tagId = tagId
		this.user = user
		this.attachments = attachments
		this.best = best ?? false
		this.meta = meta
		this.createdAt = createdAt
		this.updatedAt = updatedAt
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
	meta: AnswerMeta
}
