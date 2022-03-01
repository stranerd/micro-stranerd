import { UserBio, UserRoles } from '../../domain/types'

export interface FlashCardFromModel extends FlashCardToModel {
	_id: string
	createdAt: number
	updatedAt: number
}

export interface FlashCardToModel {
	title: string
	isPublic: boolean
	userId: string
	userBio: UserBio
	userRoles: UserRoles
	set: {
		question: string,
		answer: string
	}[]
}