import { AuthApps, makeMiddleware, NotAuthenticatedError, NotAuthorizedError } from '@utils/commons'

export const isAdmin = makeMiddleware(
	async (request) => {
		const app = AuthApps.Stranerd
		if (!request.authUser) throw new NotAuthenticatedError()
		if (!request.authUser.roles[app]?.['isAdmin']) throw new NotAuthorizedError()
	}
)
