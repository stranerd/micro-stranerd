import { AuthRoles, MediaOutput } from '@utils/commons'

export type UserBio = {
	email: string
	firstName: string
	lastName: string
	photo: MediaOutput | null
}

export type UserRoles = AuthRoles

export type UserDates = {
	createdAt: number
	deletedAt: number
}

export type UserTutor = {
	strongestSubject: string | null,
	weakerSubjects: string[]
}

export type UserStatus = {
	connections: Record<string, boolean>
	lastUpdatedAt: number
}