import { EmbeddedUser } from '../../domain/types'

export interface FlashCardFromModel extends FlashCardToModel {
	_id: string
	createdAt: number
	updatedAt: number
}

export interface FlashCardToModel {
	title: string
	user: EmbeddedUser
	set: {
		question: string,
		answer: string
	}[]
}