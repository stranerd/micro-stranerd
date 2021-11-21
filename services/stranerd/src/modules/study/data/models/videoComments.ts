import { UserBio } from '../../domain/types'

export interface VideoCommentFromModel extends VideoCommentToModel {
	_id: string
	createdAt: number
	updatedAt: number
}

export interface VideoCommentToModel {
	body: string
	userId: string
	videoId: string
	userBio: UserBio
}