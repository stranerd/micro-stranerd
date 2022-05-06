import { ClassUsers, EmbeddedUser, EventDataType, TaskID } from '../../domain/types'

export interface EventFromModel extends EventToModel {
	_id: string
	createdAt: number
	updatedAt: number
	taskIds: TaskID[]
}

export interface EventToModel {
	classId: string
	user: EmbeddedUser
	title: string
	data: EventDataType
	users: Record<ClassUsers, string[]>
}