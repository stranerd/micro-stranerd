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
	content: string
	media: Media | null
	links: { original: string, normalized: string }[]
	groupId: string
	classId: string
}