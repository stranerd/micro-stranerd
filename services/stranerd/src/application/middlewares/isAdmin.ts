import { makeMiddleware, NotAuthenticatedError, NotAuthorizedError, SupportedAuthRoles } from '@utils/commons'

export const isAdmin = makeMiddleware(
	async (request) => {
		if (!request.authUser) throw new NotAuthenticatedError()
		if (!request.authUser.roles?.[SupportedAuthRoles.isStranerdAdmin]) throw new NotAuthorizedError()
	}
)
