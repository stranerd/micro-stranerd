import { BaseEntity } from '@utils/commons'
import { ClassUsers } from '../types'

export class GroupEntity extends BaseEntity {
	public readonly id: string
	public readonly name: string
	public readonly classId: string
	public readonly users: Record<ClassUsers, string[]>
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({ id, name, classId, users, createdAt, updatedAt }: GroupConstructorArgs) {
		super()
		this.id = id
		this.name = name
		this.classId = classId
		this.users = users
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}

	getAllUsers () {
		return [...this.users.admins, ...this.users.tutors, this.users.members]
	}
}

type GroupConstructorArgs = {
	id: string
	name: string
	users: Record<ClassUsers, string[]>
	classId: string
	createdAt: number
	updatedAt: number
}
