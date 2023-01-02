import { BaseEntity } from '@utils/app/package'
import { EmbeddedUser, SetSaved } from '../types'
import { generateDefaultUser } from '@modules/users'

export class SetEntity extends BaseEntity {
	public readonly id: string
	public readonly name: string
	public readonly saved: Record<SetSaved, string[]>
	public readonly user: EmbeddedUser
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({
		             id,
		             name,
		             saved,
		             user,
		             createdAt,
		             updatedAt
	             }: SetConstructorArgs) {
		super()
		this.id = id
		this.name = name ? name : 'My Library'
		this.saved = saved
		this.user = generateDefaultUser(user)
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}
}

type SetConstructorArgs = {
	id: string
	name: string
	saved: Record<SetSaved, string[]>
	user: EmbeddedUser
	createdAt: number
	updatedAt: number
}
