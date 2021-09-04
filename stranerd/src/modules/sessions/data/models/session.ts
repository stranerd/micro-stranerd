import { UserBio } from '@modules/users/domain/types/users'

export interface SessionFromModel extends SessionToModel {
	_id: string
	endedAt: number | null
	createdAt: number,
	updatedAt: number,
	accepted: boolean | null
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
