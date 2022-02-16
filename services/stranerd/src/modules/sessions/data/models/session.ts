import { TaskID, UserBio, UserRoles } from '../../domain/types'

export interface SessionFromModel extends SessionToModel {
	_id: string
	startedAt: number | null
	endedAt: number | null
	createdAt: number,
	updatedAt: number,
	accepted: boolean | null
	taskIds: TaskID[]
	done: boolean
	cancelled: { tutor: boolean, student: boolean }
}

export interface SessionToModel {
	message: string
	studentId: string
	studentBio: UserBio
	studentRoles: UserRoles
	tutorId: string
	tutorBio: UserBio
	tutorRoles: UserRoles
	duration: number
	price: number
	isScheduled: boolean
	scheduledAt: number | null
}