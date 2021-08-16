import { makeController, Route, BadRequestError, NotFoundError } from '../../commons'

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
			try {
				// Eg - Call use-case to fetch all users
				return {
					status: 200,
					result: users
				}
			} catch (err) {
				if (err.isCustomError) throw err
				// throw custom error if something goes wrong
				else throw new BadRequestError('Unable to fetch users')
			}
		})
	]
}

const findUser: Route = {
	path: '/users/:id',
	method: 'get',
	controllers: [
		makeController(async (req) => {
			try {
				// Eg - Call use-case to get particular user
				const user = users.find((u) => u.id === req.params.id)
				if (user) return {
					status: 200,
					result: user
				}
				else throw new NotFoundError()
			} catch (err) {
				if (err.isCustomError) throw err
				// throw custom error if something goes wrong
				else throw new BadRequestError('Unable to fetch users')
			}
		})
	]
}


const routes: Route[]= [getUsers, findUser]
export default routes