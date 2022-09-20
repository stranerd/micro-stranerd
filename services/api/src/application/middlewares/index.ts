import { makeMiddleware, NotAuthenticatedError, NotAuthorizedError } from '@utils/app/package'
import { SupportedAuthRoles } from '@utils/app/types'

export const isAdmin = makeMiddleware(
	async (request) => {
		const isAdmin = request.authUser?.roles?.[SupportedAuthRoles.isStranerdAdmin] || request.authUser?.roles?.[SupportedAuthRoles.isSuperAdmin]
		if (!request.authUser) throw new NotAuthenticatedError()
		if (!isAdmin) throw new NotAuthorizedError()
	}
)

export const isVerified = makeMiddleware(
	async (request) => {
		const isVerified = request.authUser?.roles?.[SupportedAuthRoles.isVerified]
		if (!request.authUser) throw new NotAuthenticatedError()
		if (!isVerified) throw new NotAuthorizedError()
	}
)

export const isSubscribed = makeMiddleware(
	async (request) => {
		const isSubscribed = request.authUser?.roles?.[SupportedAuthRoles.isSubscribed]
		if (!request.authUser) throw new NotAuthenticatedError()
		if (!isSubscribed) throw new NotAuthorizedError('You need an active subscription to proceed')
	}
)