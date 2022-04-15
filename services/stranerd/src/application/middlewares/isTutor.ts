import { makeMiddleware, NotAuthenticatedError, NotAuthorizedError, SupportedAuthRoles } from '@utils/commons'

export const isTutor = makeMiddleware(
	async (request) => {
		if (!request.authUser) throw new NotAuthenticatedError()
		if (!request.authUser.roles?.[SupportedAuthRoles.isStranerdTutor]) throw new NotAuthorizedError()
	}
)
