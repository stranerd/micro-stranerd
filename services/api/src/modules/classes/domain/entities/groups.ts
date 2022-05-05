import { BaseEntity } from '@utils/commons'
import { ClassUsers, EmbeddedUser } from '../types'
import { DiscussionEntity } from './discussions'

export class GroupEntity extends BaseEntity {
	public readonly id: string
	public readonly name: string
	public readonly classId: string
	public readonly user: EmbeddedUser
	public readonly last: DiscussionEntity | null
	public readonly users: Record<ClassUsers, string[]>
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({
		             id,
		             name,
		             classId,
		             user,
		             last,
		             users,
		             createdAt,
		             updatedAt
	             }: GroupConstructorArgs) {
		super()
		this.id = id
		this.name = name
		this.user = user
		this.last = last
		this.classId = classId
		this.users = users
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}

	getAllUsers () {
		return Array.from(new Set(Object.values(this.users).flat()))
	}
}

type GroupConstructorArgs = {
	id: string
	name: string
	user: EmbeddedUser
	users: Record<ClassUsers, string[]>
	last: DiscussionEntity | null
	classId: string
	createdAt: number
	updatedAt: number
}
