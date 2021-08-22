import {
	BadRequestError,
	makeController,
	NotAuthenticatedError,
	NotAuthorizedError,
	requireAuthUser,
	Route,
	StatusCodes,
	validate,
	Validation
} from '@utils/commons'
import { UserController } from '../../controller/user'
import { AuthController } from '../../controller'

const getUserDetails: Route = {
	path: '/user',
	method: 'get',
	controllers: [
		requireAuthUser,
		makeController(async (req) => {

			const userId = req.authUser?.id
			if (!userId) throw new NotAuthenticatedError()

			const result = await new UserController().getUserDetails(userId)
			return {
				status: StatusCodes.Ok,
				result
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
			if (!userId) throw new NotAuthenticatedError()

			const reqData = {
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				photo: req.body.photo,
				userId
			}

			const isLongerThan2 = (val: string) => Validation.isLongerThan(val, 2)

			const validateData = validate(reqData, {
				firstName: { required: true, rules: [isLongerThan2] },
				lastName: { required: true, rules: [isLongerThan2] },
				photo: { required: false, rules: [Validation.isImage] },
				userId: { required: true, rules: [] }
			})

			const result = await new UserController().updateUserProfile(validateData)
			return {
				status: StatusCodes.Ok,
				result
			}

		})
	]
}

const updateUserRole: Route = {
	path: '/roles',
	method: 'post',
	controllers: [
		requireAuthUser,
		(req) => {
			if (req.authUser?.id === req.body.userId) throw new BadRequestError('You cannot modify your own roles')
			if (!req.authUser?.roles[req.body.app]?.isAdmin) throw new NotAuthorizedError()
		},
		makeController(async (req) => {

			const reqData = {
				app: req.body.app,
				role: req.body.role,
				userId: req.body.userId,
				value: req.body.value
			}

			const validateData = validate(reqData, {
				app: { required: true, rules: [] },
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

const logout: Route = {
	path: '/signout',
	method: 'post',
	controllers: [
		requireAuthUser,
		makeController(async (req) => {

			const authUser = req.authUser

			const result = await new AuthController().logoutUser(authUser?.id)
			return {
				status: StatusCodes.Ok,
				result
			}
		})
	]
}

const routes: Route[] = [getUserDetails, updateUserRole, updateUser, logout]
export default routes