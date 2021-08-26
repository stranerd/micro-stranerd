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