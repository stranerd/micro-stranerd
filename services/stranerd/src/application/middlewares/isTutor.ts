import { AuthApps, makeMiddleware, NotAuthenticatedError, NotAuthorizedError } from '@utils/commons'

export const isTutor = makeMiddleware(
	async (request) => {
		const app = AuthApps.Stranerd
		if (!request.authUser) throw new NotAuthenticatedError()
		if (!request.authUser.roles[app]?.['isTutor']) throw new NotAuthorizedError()
	}
)
