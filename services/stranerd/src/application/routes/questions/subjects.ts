import { makeController, requireAuthUser, Route, StatusCodes } from '@utils/commons'
import { SubjectController } from '../../controllers/questions/subjects'
import { isAdmin } from '@application/middlewares/isAdmin'

export const subjectsRoutes: Route[] = [
	{
		path: '/subjects',
		method: 'get',
		controllers: [
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await SubjectController.GetSubjects(req)
				}
			})
		]
	},
	{
		path: '/subjects/:id',
		method: 'get',
		controllers: [
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await SubjectController.FindSubject(req)
				}
			})
		]
	},
	{
		path: '/subjects',
		method: 'post',
		controllers: [
			requireAuthUser,
			isAdmin,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await SubjectController.CreateSubject(req)
				}
			})
		]
	},
	{
		path: '/subjects/:id',
		method: 'delete',
		controllers: [
			requireAuthUser,
			isAdmin,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await SubjectController.DeleteSubject(req)
				}
			})
		]
	}
]