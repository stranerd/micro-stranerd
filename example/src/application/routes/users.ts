import { makeController, NotFoundError, requireAuthUser, Route, StatusCodes } from '@utils/commons'

const users = [
	{
		id: '1',
		name: 'John Doe',
		email: 'john-doe@gmail.com'
	},
	{
		id: '2',
		name: 'Mary Lou',
		email: 'mary-lou@gmail.com'
	}
]

const getUsers: Route = {
	path: '/users',
	method: 'get',
	controllers: [
		makeController(async () => {
			// Eg - Call use-case to fetch all users
			return {
				status: StatusCodes.Ok,
				result: users
			}
		})
	]
}

const findUser: Route = {
	path: '/users/:id',
	method: 'get',
	controllers: [
		makeController(async (req) => {
			const user = users.find((u) => u.id === req.params.id)
			if (user) return {
				status: StatusCodes.Ok,
				result: user
			}
			else throw new NotFoundError()
		})
	]
}

const authUser: Route = {
	path: '/users/auth/:id',
	method: 'get',
	controllers: [
		requireAuthUser,
		makeController(async (req) => {
			const user = users.find((u) => u.id === req.params.id)
			if (user) return {
				status: StatusCodes.Ok,
				result: user
			}
			else throw new NotFoundError()
		})
	]
}

const routes: Route[] = [getUsers, findUser, authUser]
export default routes