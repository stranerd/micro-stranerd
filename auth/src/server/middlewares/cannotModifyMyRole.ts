import { makeMiddleware, NotAuthenticatedError } from '@utils/commons'
import { UserController } from '../../controller/user'
import { BadRequestError } from '@stranerd/api-commons'

export const cannotModifyMyRole = makeMiddleware(
	async (request) => {

		const userId = request.authUser?.id

		const userIdToEdit = request.body.userId

		if (userId) {

			const userDetails = await new UserController().getUserDetails(userId)

			if (userDetails._id == userIdToEdit) throw new BadRequestError('You cannot modify your own roles')

		} else {

			throw new NotAuthenticatedError()
		}

	}
)
