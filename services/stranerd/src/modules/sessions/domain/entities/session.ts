import { BaseEntity } from '@utils/commons'
import { TaskID, UserBio } from '../types'

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
	public readonly taskId: TaskID
	public readonly cancelled: { student: boolean, tutor: boolean, busy: boolean }
	public readonly createdAt: number
	public readonly updatedAt: number
	public readonly startedAt: number | null
	public readonly endedAt: number | null

	constructor ({
		             id, duration, price, message,
		             studentId, tutorId, studentBio, tutorBio,
		             accepted, done, cancelled,
		             createdAt, startedAt, endedAt, updatedAt, taskId
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
		this.taskId = taskId
		this.cancelled = cancelled
		this.createdAt = createdAt
		this.updatedAt = updatedAt
		this.startedAt = startedAt
		this.endedAt = endedAt
	}
}

type SessionConstructorArgs = {
	id: string, duration: number, price: number, message: string,
	studentId: string, tutorId: string, studentBio: UserBio, tutorBio: UserBio,
	accepted: boolean | null, done: boolean,
	cancelled: { tutor: boolean, student: boolean, busy: boolean },
	createdAt: number,
	updatedAt: number,
	startedAt: number | null
	endedAt: number | null
	taskId: TaskID
}
