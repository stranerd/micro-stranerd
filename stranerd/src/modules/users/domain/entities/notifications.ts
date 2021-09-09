import { BaseEntity } from '@utils/commons'

export class NotificationEntity extends BaseEntity {
	public readonly id: string
	public readonly body: string
	public readonly action: string
	public readonly data: Record<string, any>
	public readonly userId: string
	public readonly seen: boolean
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({ id, body, action, data, userId, createdAt, seen, updatedAt }: NotificationConstructorArgs) {
		super()
		this.id = id
		this.body = body
		this.action = action
		this.data = data ?? {}
		this.userId = userId
		this.seen = seen
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}
}

type NotificationConstructorArgs = {
	id: string, body: string, action: string, userId: string, data: Record<string, any>
	createdAt: number, seen: boolean, updatedAt: number
}
