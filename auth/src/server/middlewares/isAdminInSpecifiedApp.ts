import { makeMiddleware, NotAuthenticatedError, NotAuthorizedError } from '@utils/commons'
import { UserController } from '../../controller/user'

export const isAdminInSpecifiedApp = makeMiddleware(
	async (request) => {

		const userId = request.authUser?.id

		const appType = request.body.app
       
		if (userId) {
           
			const userDetails = await new UserController().getUserDetails(userId)

			let userIsAdmin =  false

			if (appType == 'stranerd') {
				userIsAdmin = userDetails.roles.stranerd.isAdmin
			} else if (appType == 'tutorStack') {
				
				userIsAdmin = userDetails.roles.tutorStack.isAdmin
			} else if (appType == 'brainBox') {
				
				userIsAdmin = userDetails.roles.brainBox.isAdmin
			}

			if (!userIsAdmin) throw new NotAuthorizedError()

		} else {
          
		   throw new NotAuthenticatedError()
		}

	}
)
