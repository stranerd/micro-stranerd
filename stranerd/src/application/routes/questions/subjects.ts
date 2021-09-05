import { makeController, requireAuthUser, Route, StatusCodes } from '@utils/commons'
import { SubjectController } from '../../controllers/questions'

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
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await SubjectController.DeleteSubject(req)
				}
			})
		]
	}
]