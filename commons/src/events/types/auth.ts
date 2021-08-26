import { MediaOutput } from '../../storage'
import { AuthRoles } from '../../utils/authUser'

export type AuthUserChange = {
	id: string
	data: {
		firstName: string
		lastName: string
		email: string
		photo: MediaOutput | null
	}
}

export type AuthRoleChange = {
	id: string
	data: AuthRoles
}

export type AuthUserDeleted = {
	id: string
}