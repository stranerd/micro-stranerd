import { makeMiddleware, NotAuthenticatedError, NotAuthorizedError } from '@utils/commons'

export const isAdminInSpecifiedApp = makeMiddleware(
	async (request) => {

		const userId = request.authUser?.id

		const appType = request.body.app

		if (userId && !request.authUser?.roles[appType]?.isAdmin) throw new NotAuthorizedError()
		else throw new NotAuthenticatedError()
	}
)
