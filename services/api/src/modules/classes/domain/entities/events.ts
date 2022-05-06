import { BaseEntity } from '@utils/commons'
import { ClassUsers, EmbeddedUser, EventDataType } from '../types'

export class EventEntity extends BaseEntity {
	public readonly id: string
	public readonly title: string
	public readonly classId: string
	public readonly user: EmbeddedUser
	public readonly data: EventDataType
	public readonly taskIds: string[]
	public readonly users: Record<ClassUsers, string[]>
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({
		             id,
		             title,
		             classId,
		             user,
		             data,
		             users,
		             taskIds,
		             createdAt,
		             updatedAt
	             }: EventConstructorArgs) {
		super()
		this.id = id
		this.title = title
		this.user = user
		this.data = data
		this.classId = classId
		this.users = users
		this.taskIds = taskIds
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}

	getAllUsers () {
		return Array.from(new Set(Object.values(this.users).flat()))
	}
}

type EventConstructorArgs = {
	id: string
	title: string
	user: EmbeddedUser
	users: Record<ClassUsers, string[]>
	data: EventDataType
	taskIds: string[]
	classId: string
	createdAt: number
	updatedAt: number
}
