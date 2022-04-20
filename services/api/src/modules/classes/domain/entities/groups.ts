import { BaseEntity } from '@utils/commons'
import { ClassUsers, UserBio, UserRoles } from '../types'
import { DiscussionEntity } from './discussions'

export class GroupEntity extends BaseEntity {
	public readonly id: string
	public readonly name: string
	public readonly classId: string
	public readonly userId: string
	public readonly userBio: UserBio
	public readonly userRoles: UserRoles
	public readonly last: DiscussionEntity | null
	public readonly users: Record<ClassUsers, string[]>
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({
		             id,
		             name,
		             classId,
		             userId,
		             userBio,
		             userRoles,
		             last,
		             users,
		             createdAt,
		             updatedAt
	             }: GroupConstructorArgs) {
		super()
		this.id = id
		this.name = name
		this.userId = userId
		this.userBio = userBio
		this.userRoles = userRoles
		this.last = last
		this.classId = classId
		this.users = users
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}

	getAllUsers () {
		return Array.from(new Set(Object.values(this.users).flat()))
	}
}

type GroupConstructorArgs = {
	id: string
	name: string
	userId: string
	userBio: UserBio
	userRoles: UserRoles
	users: Record<ClassUsers, string[]>
	last: DiscussionEntity | null
	classId: string
	createdAt: number
	updatedAt: number
}
