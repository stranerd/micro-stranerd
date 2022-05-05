import { ClassUsers, EventDataType, UserBio, UserRoles } from '../../domain/types'

export interface EventFromModel extends EventToModel {
	_id: string
	createdAt: number
	updatedAt: number
}

export interface EventToModel {
	classId: string
	userId: string
	userBio: UserBio
	userRoles: UserRoles
	title: string
	data: EventDataType
	users: Record<ClassUsers, string[]>
}