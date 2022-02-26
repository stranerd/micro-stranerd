import { BaseEntity } from '@utils/commons'

export class GroupEntity extends BaseEntity {
	public readonly id: string
	public readonly name: string
	public readonly classId: string
	public readonly admins: string[]
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({ id, name, classId, admins, createdAt, updatedAt }: GroupConstructorArgs) {
		super()
		this.id = id
		this.name = name
		this.classId = classId
		this.admins = admins
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}
}

type GroupConstructorArgs = {
	id: string
	name: string
	admins: string[]
	classId: string
	createdAt: number
	updatedAt: number
}
