import { BaseEntity } from '@utils/app/package'
import { EmbeddedUser } from '../types'

export class CourseEntity extends BaseEntity {
	public readonly id: string
	public readonly title: string
	public readonly level: string
	public readonly user: EmbeddedUser
	public readonly students: string[]
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({
		             id, title, level, user, students, createdAt, updatedAt
	             }: CourseConstructorArgs) {
		super()
		this.id = id
		this.title = title
		this.level = level
		this.user = user
		this.students = students
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}
}

type CourseConstructorArgs = {
	id: string
	title: string
	level: string
	user: EmbeddedUser
	students: string[]
	createdAt: number
	updatedAt: number
}
