import { EmbeddedUser, Media } from '../../domain/types'

export interface FileFromModel extends FileToModel {
	_id: string
	createdAt: number
	updatedAt: number
}

export interface FileToModel {
	courseId: string
	members: string[]
	user: EmbeddedUser
	title: string
	media: Media
}