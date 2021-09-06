import { MediaOutput } from '@utils/commons'

export type UserBio = {
	email: string
	firstName: string
	lastName: string
	photo: MediaOutput | null
}

export type Media = MediaOutput

export type CancelReason = 'tutor' | 'busy' | 'student'
export type TaskID = string | number | null