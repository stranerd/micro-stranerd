import { BaseEntity } from '@utils/app/package'
import { ClassUsers, EmbeddedUser, EventDataType } from '../types'
import { generateDefaultUser } from '@modules/users'

export class EventEntity extends BaseEntity {
	public readonly id: string
	public readonly title: string
	public readonly classId: string
	public readonly user: EmbeddedUser
	public readonly data: EventDataType
	public readonly taskIds: string[]
	public readonly users: Record<ClassUsers, string[]>
	public readonly readAt: Record<string, number>
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
		             readAt,
		             createdAt,
		             updatedAt
	             }: EventConstructorArgs) {
		super()
		this.id = id
		this.title = title
		this.user = generateDefaultUser(user)
		this.data = data
		this.classId = classId
		this.users = users
		this.taskIds = taskIds
		this.readAt = readAt
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
	readAt: Record<string, number>
	createdAt: number
	updatedAt: number
}
