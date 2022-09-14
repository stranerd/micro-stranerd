import { makeMiddleware, NotAuthenticatedError, NotAuthorizedError } from '@utils/commons'
import { SupportedAuthRoles } from '@utils/types'

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