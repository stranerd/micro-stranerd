import { BaseEntity } from '@utils/commons'
import { ClassUsers, EventDataType, UserBio, UserRoles } from '../types'

export class EventEntity extends BaseEntity {
	public readonly id: string
	public readonly title: string
	public readonly classId: string
	public readonly userId: string
	public readonly userBio: UserBio
	public readonly userRoles: UserRoles
	public readonly data: EventDataType
	public readonly users: Record<ClassUsers, string[]>
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({
		             id,
		             title,
		             classId,
		             userId,
		             userBio,
		             userRoles,
		             data,
		             users,
		             createdAt,
		             updatedAt
	             }: EventConstructorArgs) {
		super()
		this.id = id
		this.title = title
		this.userId = userId
		this.userBio = userBio
		this.userRoles = userRoles
		this.data = data
		this.classId = classId
		this.users = users
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
	userId: string
	userBio: UserBio
	userRoles: UserRoles
	users: Record<ClassUsers, string[]>
	data: EventDataType
	classId: string
	createdAt: number
	updatedAt: number
}
