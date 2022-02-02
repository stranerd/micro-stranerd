import { UserBio } from '../../domain/types'

export interface PlaylistFromModel extends PlaylistToModel {
	_id: string
	createdAt: number
	updatedAt: number
}

export interface PlaylistToModel {
	isPublic: boolean
	links: string[]
	userId: string
	userBio: UserBio
	title: string
	description: string
	tags: string[]
}