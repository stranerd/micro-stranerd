import { TaskID, UserBio } from '../../domain/types/common'

export interface SessionFromModel extends SessionToModel {
	_id: string
	startedAt: number | null
	endedAt: number | null
	createdAt: number,
	updatedAt: number,
	accepted: boolean | null
	taskId: TaskID
	done: boolean
	reviews: {
		student: { rating: number, comment: string } | null
		tutor: { rating: number, comment: string } | null
	}
	cancelled: { tutor: boolean, student: boolean, busy: boolean }
}

export interface SessionToModel {
	message: string
	studentId: string
	studentBio: UserBio
	tutorId: string
	tutorBio: UserBio
	duration: number
	price: number
}
