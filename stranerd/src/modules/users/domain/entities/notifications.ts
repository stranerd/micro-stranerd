import { BaseEntity } from '@utils/commons'

export class NotificationEntity extends BaseEntity {
	public readonly id: string
	public readonly body: string
	public readonly action: string
	public readonly userId: string
	public readonly seen: boolean
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({ id, body, action, userId, createdAt, seen, updatedAt }: NotificationConstructorArgs) {
		super()
		this.id = id
		this.body = body
		this.action = action
		this.userId = userId
		this.seen = seen
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}
}

type NotificationConstructorArgs = {
	id: string, body: string, action: string, userId: string
	createdAt: number, seen: boolean, updatedAt: number
}
