import { makeMiddleware, NotAuthenticatedError, NotAuthorizedError } from '@utils/commons'
import { UserController } from '../../controller/user'

export const cannotModifyMyRole = makeMiddleware(
	async (request) => {

		const userId = request.authUser?.id

		const userIdToEdit = request.body.userId
       
		if (userId) {
           
			const userDetails = await new UserController().getUserDetails(userId)

			if (userDetails._id == userIdToEdit) throw new NotAuthorizedError()

		} else {
          
		   throw new NotAuthenticatedError()
		}

	}
)
