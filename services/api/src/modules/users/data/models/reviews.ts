import { EmbeddedUser } from '../../domain/types'

export interface ReviewFromModel extends ReviewToModel {
	_id: string
	createdAt: number
	updatedAt: number
}

export interface ReviewToModel {
	review: string
	rating: number
	tutorId: string
	user: EmbeddedUser
}
