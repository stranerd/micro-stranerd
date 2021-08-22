import { BadRequestError, makeMiddleware, NotAuthenticatedError } from '@utils/commons'

export const cannotModifyMyRole = makeMiddleware(
	async (request) => {

		const userId = request.authUser?.id

		const userIdToEdit = request.body.userId

		if (userId) {
			if (userId === userIdToEdit) throw new BadRequestError('You cannot modify your own roles')
		} else {
			throw new NotAuthenticatedError()
		}

	}
)
