import { UserBio, UserRoles } from '../types'
import { BaseEntity } from '@utils/commons'

export class AnnouncementEntity extends BaseEntity {
	public readonly id: string
	public readonly admins: string[]
	public readonly classId: string
	public readonly userId: string
	public readonly userBio: UserBio
	public readonly userRoles: UserRoles
	public readonly body: string
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({
		             id,
		             admins,
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
		this.admins = admins
		this.classId = classId
		this.userId = userId
		this.userBio = userBio
		this.userRoles = userRoles
		this.body = body
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}
}

type AnnouncementConstructorArgs = {
	id: string,
	admins: string[],
	classId: string,
	userId: string,
	userBio: UserBio,
	userRoles: UserRoles,
	body: string
	createdAt: number
	updatedAt: number
}
