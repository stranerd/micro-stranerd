import { EmbeddedUser, Media } from '../../domain/types'

export interface DiscussionFromModel extends DiscussionToModel {
	_id: string
	createdAt: number
	updatedAt: number
}

export interface DiscussionToModel {
	user: EmbeddedUser
	content: string
	media: Media | null
	links: { original: string, normalized: string }[]
	groupId: string
	classId: string
}