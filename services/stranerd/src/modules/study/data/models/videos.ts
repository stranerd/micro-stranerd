import { Media, UserBio, UserRoles } from '../../domain/types'

export interface VideoFromModel extends VideoToModel {
	_id: string
	createdAt: number
	updatedAt: number
}

export interface VideoToModel {
	isPublic: boolean
	isHosted: boolean
	preview: Media
	link: string | null
	media: Media | null
	userId: string
	userBio: UserBio
	userRoles: UserRoles
	title: string
	description: string
	tags: string[]
}