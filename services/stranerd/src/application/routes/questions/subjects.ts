import { makeController, requireAuthUser, Route, StatusCodes } from '@utils/commons'
import { SubjectController } from '../../controllers/questions/subjects'
import { isAdmin } from '@application/middlewares/isAdmin'

export const subjectsRoutes: Route[] = [
	{
		path: '/questions/subjects',
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
		path: '/questions/subjects/:id',
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
		path: '/questions/subjects',
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
		path: '/questions/subjects/:id',
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