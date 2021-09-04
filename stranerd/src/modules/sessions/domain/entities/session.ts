import { BaseEntity } from '@utils/commons'
import { UserBio } from '../types/common'

export class SessionEntity extends BaseEntity {
	public readonly id: string
	public readonly message: string
	public readonly studentId: string
	public readonly studentBio: UserBio
	public readonly tutorId: string
	public readonly tutorBio: UserBio
	public readonly duration: number
	public readonly price: number
	public readonly accepted: boolean | null
	public readonly done: boolean
	public readonly cancelled: { student: boolean, tutor: boolean, busy: boolean }
	public readonly reviews: {
		student: { rating: number, comment: string } | null
		tutor: { rating: number, comment: string } | null
	}

	public readonly createdAt: number
	public readonly updatedAt: number
	public readonly endedAt: number | null

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
		this.accepted = accepted
		this.done = done
		this.cancelled = cancelled
		this.reviews = reviews
		this.createdAt = createdAt
		this.endedAt = endedAt
	}

	get wasCancelled () {
		return this.cancelled.busy || this.cancelled.student || this.cancelled.tutor
	}
}

type SessionConstructorArgs = {
	id: string, duration: number, price: number, message: string,
	studentId: string, tutorId: string, studentBio: UserBio, tutorBio: UserBio,
	accepted: boolean | null, done: boolean,
	cancelled: { tutor: boolean, student: boolean, busy: boolean },
	reviews: {
		student: { rating: number, comment: string } | null
		tutor: { rating: number, comment: string } | null
	},
	createdAt: number,
	updatedAt: number,
	endedAt: number | null
}
