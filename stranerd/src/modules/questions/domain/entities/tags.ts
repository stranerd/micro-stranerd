import { BaseEntity } from '@utils/commons'

export class TagEntity extends BaseEntity {
	public readonly id: string
	public readonly name: string
	public readonly count: number
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({ id, count, createdAt, updatedAt }: TagConstructorArgs) {
		super()
		this.id = this.name = id
		this.count = count
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}
}

type TagConstructorArgs = { id: string, count: number, createdAt: number, updatedAt: number }
