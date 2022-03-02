import { BaseEntity } from '@utils/commons'
import { SetData, SetSaved, UserBio, UserRoles } from '../types'

export class SetEntity extends BaseEntity {
	public readonly id: string
	public readonly name: string
	public readonly children: string[]
	public readonly saved: Record<SetSaved, string[]>
	public readonly parent: string
	public readonly userId: string
	public readonly userBio: UserBio
	public readonly userRoles: UserRoles
	public readonly data: SetData
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({
		             id,
		             name,
		             children,
		             saved,
		             parent,
		             userId,
		             userBio,
		             userRoles,
		             data,
		             createdAt,
		             updatedAt
	             }: SetConstructorArgs) {
		super()
		this.id = id
		this.name = name
		this.children = children
		this.saved = saved
		this.parent = parent
		this.userId = userId
		this.userBio = userBio
		this.userRoles = userRoles
		this.data = data
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}
}

type SetConstructorArgs = {
	id: string
	name: string
	children: string[]
	saved: Record<SetSaved, string[]>
	parent: string
	userId: string
	userBio: UserBio
	userRoles: UserRoles
	data: SetData
	createdAt: number
	updatedAt: number
}
