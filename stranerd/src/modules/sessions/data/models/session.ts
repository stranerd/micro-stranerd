import { UserBio } from '@modules/users/domain/types/users'

export interface SessionFromModel {
	_id: string
	message: string
	studentId: string
	studentBio: UserBio
	tutorId: string
	tutorBio: UserBio
	duration: number
	accepted: boolean
	done: boolean
	price: number
	cancelled: { tutor: boolean, student: boolean, busy: boolean }
	reviews: {
		student?: { rating: number, comment: string }
		tutor?: { rating: number, comment: string }
	}
	createdAt: number,
	endedAt?: number
}

export interface SessionToModel {
	message: string
	studentId: string
	studentBio: UserBio
	tutorId: string
	tutorBio: UserBio
	duration: number
	price: number
	accepted: boolean
	done: boolean
	reviews: {
		student?: { rating: number, comment: string }
		tutor?: { rating: number, comment: string }
	}
	cancelled: { tutor: boolean, student: boolean, busy: boolean }
}
