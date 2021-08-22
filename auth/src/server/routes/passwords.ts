import { makeController, requireAuthUser, Route, StatusCodes, validate, Validation } from '@utils/commons'
import { AuthController } from '../../controller/auth'

const resetPasswordEmail: Route = {
	path: '/passwords/sendResetMail',
	method: 'post',
	controllers: [
		makeController(async (req) => {

			const reqData = {
				email: req.body.email
			}

			const validateData = validate(reqData, {
				email: { required: true, rules: [Validation.isEmail] }
			})

			const result = await new AuthController().sendPasswordResetMail(validateData.email)

			return {
				status: StatusCodes.Ok,
				result
			}
		})
	]
}

const resetPassword: Route = {
	path: '/passwords/reset',
	method: 'post',
	controllers: [
		makeController(async (req) => {

			const reqData = {
				token: req.body.token,
				password: req.body.password
			}

			const isLongerThan7 = (val: string) => Validation.isLongerThan(val, 7)
			const isShorterThan17 = (val: string) => Validation.isShorterThan(val, 17)

			const validateData = validate(reqData, {
				token: { required: true, rules: [] },
				password: { required: true, rules: [isLongerThan7, isShorterThan17] }
			})

			const result = await new AuthController().resetPassword(validateData)

			return {
				status: StatusCodes.Ok,
				result
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

			const authUser = req.authUser

			const reqData = {
				oldPassword: req.body.oldPassword,
				password: req.body.password,
				userId: authUser?.id
			}

			const isLongerThan7 = (val: string) => Validation.isLongerThan(val, 7)
			const isShorterThan17 = (val: string) => Validation.isShorterThan(val, 17)

			const validateData = validate(reqData, {
				oldPassword: { required: true, rules: [] },
				password: { required: true, rules: [isLongerThan7, isShorterThan17] },
				userId: { required: true, rules: [] }
			})

			const result = await new AuthController().updatePassword(validateData)

			return {
				status: StatusCodes.Ok,
				result
			}
		})
	]
}

const routes: Route[] = [
	resetPasswordEmail,
	resetPassword,
	updatePassword
]
export default routes