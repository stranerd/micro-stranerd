import { makeMiddleware, NotAuthenticatedError, NotAuthorizedError } from '@utils/commons'

export const isAdmin = makeMiddleware(
	async (request) => {
		const app = 'stranerd'
		if (!request.authUser) throw new NotAuthenticatedError()
		if (!request.authUser.roles[app]?.['isAdmin']) throw new NotAuthorizedError()
	}
)
