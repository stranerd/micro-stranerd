import { ClassUsers, EmbeddedUser } from '../types'
import { BaseEntity } from '@utils/app/package'

export class AnnouncementEntity extends BaseEntity {
	public readonly id: string
	public readonly users: Record<ClassUsers, string[]>
	public readonly classId: string
	public readonly reminder: number | null
	public readonly user: EmbeddedUser
	public readonly body: string
	public readonly readAt: Record<string, number>
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({
		             id,
		             users,
		             classId,
		             reminder,
		             user,
		             body,
		             readAt,
		             createdAt,
		             updatedAt
	             }: AnnouncementConstructorArgs) {
		super()
		this.id = id
		this.users = users
		this.classId = classId
		this.reminder = reminder
		this.user = user
		this.body = body
		this.readAt = readAt
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}

	getAllUsers () {
		return Array.from(new Set(Object.values(this.users).flat()))
	}
}

type AnnouncementConstructorArgs = {
	id: string
	users: Record<ClassUsers, string[]>
	classId: string
	reminder: number | null
	user: EmbeddedUser
	body: string
	readAt: Record<string, number>
	createdAt: number
	updatedAt: number
}
