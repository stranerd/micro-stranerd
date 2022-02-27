import { ClassUsers, Media, UserBio, UserRoles } from '../../domain/types'

export interface ClassFromModel extends ClassToModel {
	_id: string
	createdAt: number
	updatedAt: number
}

export interface ClassToModel {
	name: string
	description: string
	avatar: Media | null
	users: Record<ClassUsers | 'requests', string[]>
	userId: string
	userBio: UserBio
	userRoles: UserRoles
}