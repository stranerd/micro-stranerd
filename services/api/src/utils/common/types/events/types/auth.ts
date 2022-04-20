// @ts-ignore
import { AuthRoles, MediaOutput } from '../../../commons'

export type AuthUserChange = {
	id: string
	data: {
		firstName: string
		lastName: string
		fullName: string
		description: string
		email: string
		photo: MediaOutput | null
		coverPhoto: MediaOutput | null
	},
	timestamp: number
}

export type AuthRoleChange = {
	id: string
	data: AuthRoles,
	timestamp: number
}

export type AuthUserDeleted = {
	id: string,
	timestamp: number
}