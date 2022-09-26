import {
	makeMiddleware,
	NotAuthenticatedError,
	NotAuthorizedError,
	requireAuthUser,
	requireRefreshUser
} from '@utils/app/package'
import { SupportedAuthRoles } from '@utils/app/types'

export const isAuthenticated = makeMiddleware(
	async (request) => {
		await requireAuthUser(request)
	}
)

export const hasRefreshToken = makeMiddleware(
	async (request) => {
		await requireRefreshUser(request)
	}
)

export const isAdmin = makeMiddleware(
	async (request) => {
		const isAdmin = request.authUser?.roles?.[SupportedAuthRoles.isStranerdAdmin] || request.authUser?.roles?.[SupportedAuthRoles.isSuperAdmin]
		if (!request.authUser) throw new NotAuthenticatedError()
		if (!isAdmin) throw new NotAuthorizedError()
	}
)

export const isSubscribed = makeMiddleware(
	async (request) => {
		const isSubscribed = request.authUser?.roles?.[SupportedAuthRoles.isSubscribed]
		if (!request.authUser) throw new NotAuthenticatedError()
		if (!isSubscribed) throw new NotAuthorizedError('You need an active subscription to proceed')
	}
)