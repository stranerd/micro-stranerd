import { makeMiddleware, NotAuthenticatedError, NotAuthorizedError, SupportedAuthRoles } from '@utils/commons'

export const isAdmin = makeMiddleware(
	async (request) => {
		const isAdmin = request.authUser?.roles?.[SupportedAuthRoles.isStranerdAdmin] || request.authUser?.roles?.[SupportedAuthRoles.isSuperAdmin]
		if (!request.authUser) throw new NotAuthenticatedError()
		if (!isAdmin) throw new NotAuthorizedError()
	}
)
