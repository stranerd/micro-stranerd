import { BaseEntity } from '@utils/commons'

export class CourseEntity extends BaseEntity {
	public readonly id: string
	public readonly name: string
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({ id, name, createdAt, updatedAt }: CourseConstructorArgs) {
		super()
		this.id = id
		this.name = name
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}
}

type CourseConstructorArgs = { id: string, name: string, createdAt: number, updatedAt: number }
