import { makeController, requireAuthUser, Route, StatusCodes } from '@utils/commons'
import { PasswordsController } from '../controllers'

const resetPasswordEmail: Route = {
	path: '/passwords/reset/mail',
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
	path: '/passwords/reset',
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
	path: '/passwords/update',
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

const routes: Route[] = [resetPasswordEmail, resetPassword, updatePassword]
export default routes