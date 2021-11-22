import { BaseEntity } from '@utils/commons'
import { UserBio } from '../types'

export class SetEntity extends BaseEntity {
	public readonly id: string
	public readonly name: string
	public readonly isRoot: boolean
	public readonly saved: {
		notes: string[]
		videos: string[]
		flashCards: string[]
		testPreps: string[]
	}
	public readonly userId: string
	public readonly userBio: UserBio
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({
		             id,
		             name,
		             isRoot,
		             saved,
		             userId,
		             userBio,
		             createdAt,
		             updatedAt
	             }: SetConstructorArgs) {
		super()
		this.id = id
		this.name = name
		this.isRoot = isRoot
		this.saved = saved
		this.userId = userId
		this.userBio = userBio
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}
}

type SetConstructorArgs = {
	id: string
	name: string
	isRoot: boolean
	saved: {
		notes: string[]
		videos: string[]
		flashCards: string[]
		testPreps: string[]
	}
	userId: string
	userBio: UserBio
	createdAt: number
	updatedAt: number
}
