import { AuthRoles } from '@utils/app/types'

export {}

declare module '@utils/app/commons/utils/authUser' {
	interface AuthUser {
		email: string
		roles: AuthRoles
		isVerified: boolean
	}
}