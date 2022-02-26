import { Media, UserBio, UserRoles } from '../types'
import { BaseEntity } from '@utils/commons'

export class ClassEntity extends BaseEntity {
	public readonly id: string
	public readonly userId: string
	public readonly userBio: UserBio
	public readonly userRoles: UserRoles
	public readonly name: string
	public readonly description: string
	public readonly avatar: Media
	public readonly users: {
		members: string[]
		admins: string[]
		tutors: string[]
		requests: string[]
	}
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

	getAllAdmins () {
		return [this.userId, ...this.users.admins]
	}
}

type ClassConstructorArgs = {
	id: string,
	userId: string,
	userBio: UserBio,
	userRoles: UserRoles,
	name: string,
	description: string
	avatar: Media,
	users: {
		members: string[]
		admins: string[]
		tutors: string[]
		requests: string[]
	}
	createdAt: number
	updatedAt: number
}
