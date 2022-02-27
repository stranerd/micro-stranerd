import { ClassUsers, Media, UserBio, UserRoles } from '../../domain/types'

export interface ClassFromModel extends ClassToModel {
	_id: string
	users: Record<ClassUsers, string[]>
	requests: string[]
	createdAt: number
	updatedAt: number
}

export interface ClassToModel {
	name: string
	description: string
	avatar: Media | null
	userId: string
	userBio: UserBio
	userRoles: UserRoles
}