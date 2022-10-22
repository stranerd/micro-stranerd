import { makeController, Route, StatusCodes } from '@utils/app/package'
import { AssignmentController } from '../../controllers/teachers/assignments'
import { isAuthenticated } from '@application/middlewares'

export const assignmentsRoutes: Route[] = [
	{
		path: '/teachers/:courseId/assignments',
		method: 'get',
		controllers: [
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await AssignmentController.GetAssignment(req)
				}
			})
		]
	},
	{
		path: '/teachers/:courseId/assignments/:id',
		method: 'get',
		controllers: [
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await AssignmentController.FindAssignment(req)
				}
			})
		]
	},
	{
		path: '/teachers/:courseId/assignments',
		method: 'post',
		controllers: [
			isAuthenticated,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await AssignmentController.CreateAssignment(req)
				}
			})
		]
	},
	{
		path: '/teachers/:courseId/assignments/:id',
		method: 'delete',
		controllers: [
			isAuthenticated,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await AssignmentController.DeleteAssignment(req)
				}
			})
		]
	}
]