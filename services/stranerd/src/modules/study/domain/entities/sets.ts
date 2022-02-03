import { BaseEntity } from '@utils/commons'
import { UserBio } from '../types'

export class SetEntity extends BaseEntity {
	public readonly id: string
	public readonly name: string
	public readonly isPublic: boolean
	public readonly tags: string[]
	public readonly children: string[]
	public readonly saved: {
		notes: string[]
		videos: string[]
		flashCards: string[]
		testPreps: string[]
	}
	public readonly parent: string | null
	public readonly userId: string
	public readonly userBio: UserBio
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({
		             id,
		             name,
		             children,
		             isPublic,
		             saved,
		             tags,
		             parent,
		             userId,
		             userBio,
		             createdAt,
		             updatedAt
	             }: SetConstructorArgs) {
		super()
		this.id = id
		this.name = name
		this.isPublic = isPublic
		this.children = children
		this.saved = saved
		this.tags = tags
		this.parent = parent
		this.userId = userId
		this.userBio = userBio
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}
}

type SetConstructorArgs = {
	id: string
	name: string
	isPublic: boolean
	tags: string[]
	children: string[]
	saved: {
		notes: string[]
		videos: string[]
		flashCards: string[]
		testPreps: string[]
	}
	parent: string | null
	userId: string
	userBio: UserBio
	createdAt: number
	updatedAt: number
}
