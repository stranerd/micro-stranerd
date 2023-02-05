// @ts-ignore
import { AuthRoles } from '../../commons'

declare module '@utils/app/commons/utils/authUser' {
    interface AuthUser {
        email: string
        roles: AuthRoles
        isVerified: boolean
    }
}