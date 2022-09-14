import { AuthTypes, MediaOutput } from '@utils/commons'
import { AuthRoles } from '@utils/types'

export interface UserFromModel extends UserToModel {
	_id: string
	roles: AuthRoles
	signedUpAt: number
	lastSignedInAt: number
}

export interface UserToModel {
	email: string
	password: string
	description: string
	firstName: string
	lastName: string
	photo: MediaOutput | null
	referrer: string | null
	isVerified: boolean
	authTypes: AuthTypes[]
}