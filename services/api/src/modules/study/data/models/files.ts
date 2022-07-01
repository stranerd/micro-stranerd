import { EmbeddedUser, Media } from '../../domain/types'

export interface FileFromModel extends FileToModel {
	_id: string
	createdAt: number
	updatedAt: number
}

export interface FileToModel {
	user: EmbeddedUser
	title: string
	media: Media
}