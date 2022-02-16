import { BaseEntity } from '@utils/commons'
import { UserBio, UserRoles } from '../types'

export class ReviewEntity extends BaseEntity {
	public readonly id: string
	public readonly review: string
	public readonly rating: number
	public readonly tutorId: string
	public readonly userId: string
	public readonly userBio: UserBio
	public readonly userRoles: UserRoles
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({
		             id,
		             review,
		             rating,
		             tutorId,
		             createdAt,
		             updatedAt,
		             userId,
		             userBio,
		             userRoles
	             }: ReviewConstructorArgs) {
		super()
		this.id = id
		this.review = review
		this.rating = rating
		this.tutorId = tutorId
		this.userId = userId
		this.userBio = userBio
		this.userRoles = userRoles
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}
}

type ReviewConstructorArgs = {
	id: string, review: string, rating: number
	tutorId: string, userId: string, userBio: UserBio, userRoles: UserRoles
	createdAt: number, updatedAt: number,
}
