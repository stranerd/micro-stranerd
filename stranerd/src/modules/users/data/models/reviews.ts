import { UserBio } from '../../domain/types/users'

export interface ReviewFromModel extends ReviewToModel {
	id: string
	createdAt: number
	updatedAt: number
}

export interface ReviewToModel {
	review: string
	rating: number
	tutorId: string
	userId: string
	userBio: UserBio
}
