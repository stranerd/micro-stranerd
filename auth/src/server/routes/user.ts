import { makeController, requireAuthUser, Route, StatusCodes, Validation, validate } from '@utils/commons'
import { UserController } from '../../controller/user'
import { cannotModifyMyRole, isAdminInSpecifiedApp } from '../middlewares'

const getUserDetails: Route = {
	path: '/user',
	method: 'get',
	controllers: [
		requireAuthUser,
		makeController(async (req) => {

			const userId = req.authUser?.id

			if (userId) {
				const result = await new UserController().getUserDetails(userId)
				return {
					status: StatusCodes.Ok,
					result
				}
			} else {
				return {
					status: StatusCodes.NotAuthenticated,
					result: 'user not authenticated'
				}
			}

		})
	]
}


const updateUser: Route = {
	path: '/user',
	method: 'put',
	controllers: [
		requireAuthUser,
		makeController(async (req) => {

			const userId = req.authUser?.id

			const reqData = {
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				photo: req.body.photo,
				userId: req.authUser?.id
			}

			const isLongerThan2 = (val: string) => Validation.isLongerThan(val, 2)

			const validateData = validate(reqData,{
				firstName: { required: true, rules: [isLongerThan2] },
				lastName: { required: true, rules: [isLongerThan2] },
				photo: { required: true, rules: [] },
				userId: { required: true, rules: [] }
			})

			if (userId) {
				const result = await new UserController().updateUserProfile(validateData)
				return {
					status: StatusCodes.Ok,
					result
				}
			} else {
				return {
					status: StatusCodes.NotAuthenticated,
					result: 'user not authenticated'
				}
			}

		})
	]
}

const updateUserRole: Route = {
	path: '/roles',
	method: 'post',
	controllers: [
		[requireAuthUser,isAdminInSpecifiedApp,cannotModifyMyRole],
		makeController(async (req) => {

			const reqData = {
				app: req.body.app,
				role: req.body.role,
				userId: req.body.userId,
				value: req.body.value
			}

			const checkAppType = (app: string) => {
				return {valid: app == 'stranerd', error: app + ' update is not allowed'}
			}

			const isLongerThan2 = (val: string) => Validation.isLongerThan(val, 2)
			const isAStranerdApp = (val: string) => checkAppType(val)

			const validateData = validate(reqData,{
				app: { required: true, rules: [isLongerThan2,isAStranerdApp] },
				role: { required: true, rules: [] },
				value: { required: true, rules: [] },
				userId: { required: true, rules: [] }
			})

			const result = await new UserController().updateUserRole(validateData)

			return {
				status: StatusCodes.Ok,
				result
			}

		})
	]
}

const routes: Route[] = [getUserDetails, updateUserRole, updateUser]
export default routes