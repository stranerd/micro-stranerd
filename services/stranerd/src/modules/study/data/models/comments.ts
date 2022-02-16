import { CommentData, UserBio, UserRoles } from '../../domain/types'

export interface CommentFromModel extends CommentToModel {
	_id: string
	createdAt: number
	updatedAt: number
}

export interface CommentToModel {
	body: string
	data: CommentData
	userId: string
	userBio: UserBio
	userRoles: UserRoles
}