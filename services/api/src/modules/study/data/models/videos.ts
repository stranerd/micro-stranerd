import { EmbeddedUser, Media } from '../../domain/types'

export interface VideoFromModel extends VideoToModel {
	_id: string
	createdAt: number
	updatedAt: number
}

export interface VideoToModel {
	isHosted: boolean
	link: string | null
	media: Media | null
	user: EmbeddedUser
	title: string
	description: string
}