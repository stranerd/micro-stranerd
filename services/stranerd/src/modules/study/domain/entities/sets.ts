import { BaseEntity } from '@utils/commons'
import { UserBio, UserRoles } from '../types'
import { SetSaved } from '@modules/study/domain/types/sets'

export class SetEntity extends BaseEntity {
	public readonly id: string
	public readonly name: string
	public readonly isPublic: boolean
	public readonly tags: string[]
	public readonly children: string[]
	public readonly saved: Record<SetSaved, string[]>
	public readonly parent: string | null
	public readonly userId: string
	public readonly userBio: UserBio
	public readonly userRoles: UserRoles
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
		             userRoles,
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
		this.userRoles = userRoles
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
	saved: Record<SetSaved, string[]>
	parent: string | null
	userId: string
	userBio: UserBio
	userRoles: UserRoles
	createdAt: number
	updatedAt: number
}
