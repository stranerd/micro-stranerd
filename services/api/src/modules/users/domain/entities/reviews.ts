import { BaseEntity } from '@utils/app/package'
import { EmbeddedUser } from '../types'

export class ReviewEntity extends BaseEntity {
	public readonly id: string
	public readonly review: string
	public readonly rating: number
	public readonly tutorId: string
	public readonly user: EmbeddedUser
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({
		             id,
		             review,
		             rating,
		             tutorId,
		             createdAt,
		             updatedAt,
		             user
	             }: ReviewConstructorArgs) {
		super()
		this.id = id
		this.review = review
		this.rating = rating
		this.tutorId = tutorId
		this.user = user
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}
}

type ReviewConstructorArgs = {
	id: string, review: string, rating: number
	tutorId: string, user: EmbeddedUser, createdAt: number, updatedAt: number,
}
