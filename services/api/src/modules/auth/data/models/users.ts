import { AuthRoles, AuthTypes, Enum, MediaOutput } from '@utils/app/package'
import { Phone } from '../../domain/types'

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
	phone: Phone | null
	referrer: string | null
	isVerified: boolean
	authTypes: Enum<typeof AuthTypes>[]
}