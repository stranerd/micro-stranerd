import { BaseEntity } from '@utils/commons'
import { UserBio } from '@modules/users/domain/types/users'

export class SessionEntity extends BaseEntity {
	public readonly id: string
	public readonly message: string
	public readonly studentId: string
	public readonly studentBio: UserBio
	public readonly tutorId: string
	public readonly tutorBio: UserBio
	public readonly duration: number
	public readonly price: number
	public readonly accepted: boolean
	public readonly done: boolean
	public readonly cancelled: { student: boolean, tutor: boolean, busy: boolean }
	public readonly reviews: {
		student?: { rating: number, comment: string }
		tutor?: { rating: number, comment: string }
	}

	public readonly createdAt: number
	public readonly endedAt?: number

	constructor ({
		             id, duration, price, message,
		             studentId, tutorId, studentBio, tutorBio,
		             accepted, done, createdAt, cancelled, reviews, endedAt
	             }: SessionConstructorArgs) {
		super()
		this.id = id
		this.message = message
		this.studentId = studentId
		this.studentBio = studentBio
		this.tutorId = tutorId
		this.tutorBio = tutorBio
		this.duration = duration
		this.price = price
		this.accepted = accepted ?? false
		this.done = done ?? false
		this.cancelled = cancelled
		this.reviews = reviews
		this.createdAt = createdAt
		this.endedAt = endedAt
	}

	get studentAvatar () {
		return this.studentBio.photo
	}

	get tutorAvatar () {
		return this.tutorBio.photo
	}

	get wasCancelled () {
		return this.cancelled.busy || this.cancelled.student || this.cancelled.tutor
	}
}

type SessionConstructorArgs = {
	id: string, duration: number, price: number, message: string,
	studentId: string, tutorId: string, studentBio: UserBio, tutorBio: UserBio,
	accepted: boolean, done: boolean,
	cancelled: { tutor: boolean, student: boolean, busy: boolean },
	reviews: {
		student?: { rating: number, comment: string }
		tutor?: { rating: number, comment: string }
	},
	createdAt: number, 
	endedAt?: number
}
