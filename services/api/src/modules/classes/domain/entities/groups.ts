import { BaseEntity } from '@utils/app/package'
import { ClassUsers, EmbeddedUser } from '../types'
import { generateDefaultUser } from '@modules/users'

export class GroupEntity extends BaseEntity {
	public readonly id: string
	public readonly name: string
	public readonly classId: string
	public readonly user: EmbeddedUser
	public readonly users: Record<ClassUsers, string[]>
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({
		             id,
		             name,
		             classId,
		             user,
		             users,
		             createdAt,
		             updatedAt
	             }: GroupConstructorArgs) {
		super()
		this.id = id
		this.name = name
		this.user = generateDefaultUser(user)
		this.classId = classId
		this.users = users
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}

	getAllUsers () {
		return Array.from(new Set(Object.values(this.users).flat()))
	}

	getEmbedded () {
		return {
			id: this.id,
			classId: this.classId,
			name: this.name
		}
	}
}

type GroupConstructorArgs = {
	id: string
	name: string
	user: EmbeddedUser
	users: Record<ClassUsers, string[]>
	classId: string
	createdAt: number
	updatedAt: number
}
