import { makeController, requireAuthUser, Route, StatusCodes } from '@utils/app/package'
import { PasswordsController } from '../../controllers/auth/passwords'

const resetPasswordEmail: Route = {
	path: '/auth/passwords/reset/mail',
	method: 'post',
	controllers: [
		makeController(async (req) => {
			return {
				status: StatusCodes.Ok,
				result: await PasswordsController.sendResetMail(req)
			}
		})
	]
}

const resetPassword: Route = {
	path: '/auth/passwords/reset',
	method: 'post',
	controllers: [
		makeController(async (req) => {
			return {
				status: StatusCodes.Ok,
				result: await PasswordsController.resetPassword(req)
			}
		})
	]
}

const updatePassword: Route = {
	path: '/auth/passwords/update',
	method: 'post',
	controllers: [
		requireAuthUser,
		makeController(async (req) => {
			return {
				status: StatusCodes.Ok,
				result: await PasswordsController.updatePassword(req)
			}
		})
	]
}

export const passwordsRoutes = [resetPasswordEmail, resetPassword, updatePassword]