import { Media, UserBio, UserRoles } from '../../domain/types'

export interface ClassFromModel extends ClassToModel {
	_id: string
	users: {
		admins: string[]
		tutors: string[]
		members: string[]
		requests: string[]
	}
	createdAt: number
	updatedAt: number
}

export interface ClassToModel {
	name: string
	description: string
	avatar: Media
	userId: string
	userBio: UserBio
	userRoles: UserRoles
}