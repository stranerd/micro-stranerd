import { makeMiddleware, NotAuthenticatedError, NotAuthorizedError, SupportedAuthRoles } from '@utils/commons'

export const isSubscribed = makeMiddleware(
	async (request) => {
		const isSubscribed = request.authUser?.roles?.[SupportedAuthRoles.isSubscribed]
		if (!request.authUser) throw new NotAuthenticatedError()
		if (!isSubscribed) throw new NotAuthorizedError('You need an active subscription to proceed')
	}
)
