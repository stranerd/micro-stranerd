import { ClassUsers, UserBio, UserRoles } from '../types'
import { BaseEntity } from '@utils/commons'

export class AnnouncementEntity extends BaseEntity {
	public readonly id: string
	public readonly users: Record<ClassUsers, string[]>
	public readonly classId: string
	public readonly userId: string
	public readonly userBio: UserBio
	public readonly userRoles: UserRoles
	public readonly body: string
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({
		             id,
		             users,
		             classId,
		             userId,
		             userBio,
		             userRoles,
		             body,
		             createdAt,
		             updatedAt
	             }: AnnouncementConstructorArgs) {
		super()
		this.id = id
		this.users = users
		this.classId = classId
		this.userId = userId
		this.userBio = userBio
		this.userRoles = userRoles
		this.body = body
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}

	getAllUsers () {
		return [...this.users.admins, ...this.users.tutors, this.users.members]
	}
}

type AnnouncementConstructorArgs = {
	id: string
	users: Record<ClassUsers, string[]>
	classId: string
	userId: string
	userBio: UserBio
	userRoles: UserRoles
	body: string
	createdAt: number
	updatedAt: number
}
