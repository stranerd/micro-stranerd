import { BaseEntity } from '@utils/commons'
import { UserBio, UserRoles } from '../types'

export class FlashCardEntity extends BaseEntity {
	public readonly id: string
	public readonly title: string
	public readonly isPublic: boolean
	public readonly set: { question: string, answer: string }[]
	public readonly userId: string
	public readonly userBio: UserBio
	public readonly userRoles: UserRoles
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({
		             id,
		             title,
		             isPublic,
		             set,
		             userId,
		             userBio,
		             userRoles,
		             createdAt,
		             updatedAt
	             }: FlashCardConstructorArgs) {
		super()
		this.id = id
		this.title = title
		this.isPublic = isPublic
		this.set = set
		this.userId = userId
		this.userBio = userBio
		this.userRoles = userRoles
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}
}

type FlashCardConstructorArgs = {
	id: string
	title: string
	isPublic: boolean
	set: { question: string, answer: string }[]
	userId: string
	userBio: UserBio
	userRoles: UserRoles
	createdAt: number
	updatedAt: number
}