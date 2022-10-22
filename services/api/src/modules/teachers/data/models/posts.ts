import { EmbeddedUser, Media, PostData, PostMetaType } from '../../domain/types'

export interface PostFromModel extends PostToModel {
	_id: string
	meta: PostMetaType
	createdAt: number
	updatedAt: number
}

export interface PostToModel {
	courseId: string
	members: string[]
	title: string
	description: string
	data: PostData
	user: EmbeddedUser
	attachments: Media[]
}