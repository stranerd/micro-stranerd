import { ClassUsers, Media, UserBio, UserRoles } from '../types'
import { BaseEntity } from '@utils/commons'

export class ClassEntity extends BaseEntity {
	public readonly id: string
	public readonly userId: string
	public readonly userBio: UserBio
	public readonly userRoles: UserRoles
	public readonly name: string
	public readonly description: string
	public readonly avatar: Media
	public readonly users: Record<ClassUsers | 'requests', string[]>
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({
		             id,
		             userId,
		             userBio,
		             userRoles,
		             name,
		             description,
		             avatar,
		             users,
		             createdAt,
		             updatedAt
	             }: ClassConstructorArgs) {
		super()
		this.id = id
		this.userId = userId
		this.userBio = userBio
		this.userRoles = userRoles
		this.name = name
		this.description = description
		this.avatar = avatar
		this.users = users
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}

	getAllMembers () {
		return Object.fromEntries(
			Object.entries(this.users)
				.filter(([key]) => key !== 'requests')
				.map((e) => e)
		) as Record<ClassUsers, string[]>
	}
}

type ClassConstructorArgs = {
	id: string,
	userId: string
	userBio: UserBio
	userRoles: UserRoles
	name: string
	description: string
	avatar: Media
	users: Record<ClassUsers | 'requests', string[]>
	createdAt: number
	updatedAt: number
}
