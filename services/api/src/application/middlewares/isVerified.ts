import { makeMiddleware, NotAuthenticatedError, NotAuthorizedError, SupportedAuthRoles } from '@utils/commons'

export const isVerified = makeMiddleware(
	async (request) => {
		const isVerified = request.authUser?.roles?.[SupportedAuthRoles.isVerified]
		if (!request.authUser) throw new NotAuthenticatedError()
		if (!isVerified) throw new NotAuthorizedError('You need to be verified to proceed')
	}
)
