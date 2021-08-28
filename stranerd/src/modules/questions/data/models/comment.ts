import { UserBio } from '../../../users/domain/types/users'
import { Document } from 'mongoose'

export interface CommentFromModel extends Document  {
	_id: string
	body: string
	userId: string
	baseId: string
	user: UserBio
	dates: {
		createdAt: number
	}
}

export interface CommentToModel {
	body: string
	userId: string
	baseId: string
	user: UserBio
}
