import { BaseEntity } from '@utils/commons'

export class SubjectEntity extends BaseEntity {
	public readonly id: string
	public readonly name: string
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({ id, name, createdAt, updatedAt }: SubjectConstructorArgs) {
		super()
		this.id = id
		this.name = name
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}
}

type SubjectConstructorArgs = { id: string, name: string, createdAt: number, updatedAt: number }
