import { UserBio } from '../../domain/types'

export interface FlashCardFromModel extends FlashCardToModel {
	_id: string
	createdAt: number
	updatedAt: number
}

export interface FlashCardToModel {
	userId: string
	userBio: UserBio
	set: {
		question: string,
		answer: string
	}[]
	tags: string[]
}