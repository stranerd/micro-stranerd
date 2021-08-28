import { UserBio } from '../../../users/domain/types/users'
import { Document } from 'mongoose'

export interface QuestionFromModel extends Document {
	_id: string
	body: string
	coins: number
	tags: string[]
	subjectId: string
	userId: string
	user: UserBio
	answerId?: { first: string | null, second: string | null }
	answers?: number
	comments?: {
		count: number
	}
	dates: {
		createdAt: number
	}
}

export interface QuestionToModel {
	body: string
	coins: number
	tags: string[]
	subjectId: string
	userId: string
	user: UserBio
	answerId?: { first: string | null, second: string | null }
}
