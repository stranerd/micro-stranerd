import { ClassUsers, EmbeddedUser } from '../types'
import { BaseEntity } from '@utils/commons'

export class AnnouncementEntity extends BaseEntity {
	public readonly id: string
	public readonly users: Record<ClassUsers, string[]>
	public readonly classId: string
	public readonly user: EmbeddedUser
	public readonly body: string
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({
		             id,
		             users,
		             classId,
		             user,
		             body,
		             createdAt,
		             updatedAt
	             }: AnnouncementConstructorArgs) {
		super()
		this.id = id
		this.users = users
		this.classId = classId
		this.user = user
		this.body = body
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
	user: EmbeddedUser
	body: string
	createdAt: number
	updatedAt: number
}
