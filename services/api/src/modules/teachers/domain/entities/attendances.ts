import { BaseEntity } from '@utils/app/package'
import { EmbeddedUser } from '../types'

export class AttendanceEntity extends BaseEntity {
	public readonly id: string
	public readonly courseId: string
	public readonly title: string
	public readonly user: EmbeddedUser
	public readonly members: string[]
	public readonly attended: string[]
	public readonly closedAt: number | null
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor ({
		             id, courseId, title, user, members, attended, closedAt, createdAt, updatedAt
	             }: AttendanceConstructorArgs) {
		super()
		this.id = id
		this.courseId = courseId
		this.title = title
		this.user = user
		this.members = members
		this.attended = attended
		this.closedAt = closedAt
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}
}

type AttendanceConstructorArgs = {
	id: string
	courseId: string
	title: string
	user: EmbeddedUser
	members: string[]
	attended: string[]
	closedAt: number | null
	createdAt: number
	updatedAt: number
}
