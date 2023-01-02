import { BaseEntity } from '@utils/app/package'
import { EmbeddedUser } from '../types'
import { generateDefaultUser } from '@modules/users'

export class CourseEntity extends BaseEntity {
	public readonly id: string
	public readonly title: string
	public readonly level: string
	public readonly user: EmbeddedUser
	public readonly members: string[]
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({
		             id, title, level, user, members, createdAt, updatedAt
	             }: CourseConstructorArgs) {
		super()
		this.id = id
		this.title = title
		this.level = level
		this.user = generateDefaultUser(user)
		this.members = members
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}
}

type CourseConstructorArgs = {
	id: string
	title: string
	level: string
	user: EmbeddedUser
	members: string[]
	createdAt: number
	updatedAt: number
}
