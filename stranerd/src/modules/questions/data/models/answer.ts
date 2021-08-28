import { UserBio } from '../../../users/domain/types/users'
import { Document } from 'mongoose'


export interface AnswerFromModel extends Document  {
	_id: string
	title: string
	body: string
	best?: boolean
	coins: number
	tags: string[]
	questionId: string
	subjectId: string
	userId: string
	user: UserBio
	ratings: { total: number, count: number }
	comments?: {
		count: number
	}
	dates: {
		createdAt: Date
	}
}

export interface AnswerToModel {
	title: string
	body: string
	coins: number
	tags: string[]
	questionId: string
	subjectId: string
	userId: string
	user: UserBio
}
