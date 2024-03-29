import { BaseEntity } from '@utils/app/package'
import { EmbeddedUser } from '../types'
import { generateDefaultUser } from '@modules/users'

export class FlashCardEntity extends BaseEntity {
	public readonly id: string
	public readonly title: string
	public readonly set: { question: string, answer: string }[]
	public readonly user: EmbeddedUser
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({ id, title, set, user, createdAt, updatedAt }: FlashCardConstructorArgs) {
		super()
		this.id = id
		this.title = title
		this.set = set
		this.user = generateDefaultUser(user)
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}
}

type FlashCardConstructorArgs = {
	id: string
	title: string
	set: { question: string, answer: string }[]
	user: EmbeddedUser
	createdAt: number
	updatedAt: number
}