import { Media, UserBio, UserRoles } from '../../domain/types'

export interface DiscussionFromModel extends DiscussionToModel {
	_id: string
	createdAt: number
	updatedAt: number
}

export interface DiscussionToModel {
	userId: string
	userBio: UserBio
	userRoles: UserRoles
	content: string | null
	media: Media | null
	groupId: string
}