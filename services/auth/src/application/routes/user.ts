import { makeController, requireAuthUser, Route, StatusCodes } from '@utils/commons'
import { UserController } from '../controllers'
import { cannotModifyMyRole, isAdmin } from '../middlewares'

const getUserDetails: Route = {
	path: '/user',
	method: 'get',
	controllers: [
		requireAuthUser,
		makeController(async (req) => {
			return {
				status: StatusCodes.Ok,
				result: await UserController.findUser(req)
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
			return {
				status: StatusCodes.Ok,
				result: await UserController.updateUser(req)
			}
		})
	]
}

const updateUserRole: Route = {
	path: '/user/roles',
	method: 'post',
	controllers: [
		requireAuthUser, isAdmin, cannotModifyMyRole,
		makeController(async (req) => {
			return {
				status: StatusCodes.Ok,
				result: await UserController.updateUserRole(req)
			}

		})
	]
}

const signout: Route = {
	path: '/user/signout',
	method: 'post',
	controllers: [
		makeController(async (req) => {
			return {
				status: StatusCodes.Ok,
				result: await UserController.signout(req)
			}
		})
	]
}

const superAdmin: Route = {
	path: '/user/superAdmin',
	method: 'get',
	controllers: [
		makeController(async (req) => {
			return {
				status: StatusCodes.Ok,
				result: await UserController.superAdmin(req)
			}
		})
	]
}

const routes: Route[] = [getUserDetails, updateUserRole, updateUser, signout, superAdmin]
export default routes