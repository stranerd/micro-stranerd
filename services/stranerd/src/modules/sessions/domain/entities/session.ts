import { BaseEntity } from '@utils/commons'
import { TaskID, UserBio, UserRoles } from '../types'

export class SessionEntity extends BaseEntity {
	public readonly id: string
	public readonly message: string
	public readonly studentId: string
	public readonly studentBio: UserBio
	public readonly studentRoles: UserRoles
	public readonly tutorId: string
	public readonly tutorBio: UserBio
	public readonly tutorRoles: UserRoles
	public readonly duration: number
	public readonly price: number
	public readonly accepted: boolean | null
	public readonly done: boolean
	public readonly taskIds: TaskID[]
	public readonly cancelled: { student: boolean, tutor: boolean }
	public readonly createdAt: number
	public readonly updatedAt: number
	public readonly startedAt: number | null
	public readonly endedAt: number | null
	public readonly isScheduled: boolean
	public readonly scheduledAt: number | null

	constructor ({
		             id, duration, price, message,
		             studentId, tutorId, studentBio, tutorBio, studentRoles, tutorRoles,
		             accepted, done, cancelled,
		             createdAt, startedAt, endedAt, updatedAt, taskIds,
		             isScheduled, scheduledAt
	             }: SessionConstructorArgs) {
		super()
		this.id = id
		this.message = message
		this.studentId = studentId
		this.studentBio = studentBio
		this.studentRoles = studentRoles
		this.tutorId = tutorId
		this.tutorBio = tutorBio
		this.tutorRoles = tutorRoles
		this.duration = duration
		this.price = price
		this.accepted = accepted
		this.done = done
		this.taskIds = taskIds
		this.cancelled = cancelled
		this.createdAt = createdAt
		this.updatedAt = updatedAt
		this.startedAt = startedAt
		this.endedAt = endedAt
		this.isScheduled = isScheduled
		this.scheduledAt = scheduledAt
	}

	get wasCancelled () {
		return this.cancelled.student || this.cancelled.tutor
	}
}

type SessionConstructorArgs = {
	id: string, duration: number, price: number, message: string,
	studentId: string, tutorId: string, studentBio: UserBio, tutorBio: UserBio,
	studentRoles: UserRoles, tutorRoles: UserRoles,
	accepted: boolean | null, done: boolean,
	cancelled: { tutor: boolean, student: boolean },
	createdAt: number,
	updatedAt: number,
	startedAt: number | null
	endedAt: number | null
	taskIds: TaskID[]
	isScheduled: boolean
	scheduledAt: number | null
}
