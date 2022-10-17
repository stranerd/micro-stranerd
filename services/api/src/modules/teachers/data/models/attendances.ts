import { EmbeddedUser } from '../../domain/types'

export interface AttendanceFromModel extends AttendanceToModel {
	_id: string
	attended: string[]
	closedAt: number | null
	createdAt: number
	updatedAt: number
}

export interface AttendanceToModel {
	courseId: string
	members: string[]
	user: EmbeddedUser
	title: string
}