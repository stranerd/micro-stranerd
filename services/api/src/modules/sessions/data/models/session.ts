import { EmbeddedUser } from '../../domain/types'

export interface SessionFromModel extends SessionToModel {
	_id: string
	startedAt: number | null
	endedAt: number | null
	createdAt: number,
	updatedAt: number,
	accepted: boolean | null
	taskIds: string[]
	done: boolean
	cancelled: { tutor: boolean, student: boolean }
}

export interface SessionToModel {
	message: string
	student: EmbeddedUser
	tutor: EmbeddedUser
	duration: number
	price: number
	isScheduled: boolean
	scheduledAt: number | null
}