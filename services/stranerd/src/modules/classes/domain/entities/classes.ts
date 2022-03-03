import { ClassUsers, Media, UserBio, UserRoles } from '../types'
import { BaseEntity } from '@utils/commons'

export class ClassEntity extends BaseEntity {
	public readonly id: string
	public readonly userId: string
	public readonly userBio: UserBio
	public readonly userRoles: UserRoles
	public readonly name: string
	public readonly description: string
	public readonly photo: Media | null
	public readonly users: Record<ClassUsers, string[]>
	public readonly requests: string[]
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({
		             id,
		             userId,
		             userBio,
		             userRoles,
		             name,
		             description,
		             photo,
		             users,
		             requests,
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
		this.photo = photo
		this.users = users
		this.requests = requests
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}

	getAllUsers () {
		return Array.from(new Set(Object.values(this.users).flat()))
	}
}

type ClassConstructorArgs = {
	id: string,
	userId: string
	userBio: UserBio
	userRoles: UserRoles
	name: string
	description: string
	photo: Media | null
	users: Record<ClassUsers, string[]>
	requests: string[]
	createdAt: number
	updatedAt: number
}
