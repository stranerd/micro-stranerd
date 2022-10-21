import { makeController, Route, StatusCodes } from '@utils/app/package'
import { AssignmentSubmissionController } from '../../controllers/teachers/assignmentSubmissions'
import { isAuthenticated } from '@application/middlewares'

export const assignmentSubmissionsRoutes: Route[] = [
	{
		path: '/teachers/:courseId/assignmentSubmissions',
		method: 'get',
		controllers: [
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await AssignmentSubmissionController.GetAssignmentSubmission(req)
				}
			})
		]
	},
	{
		path: '/teachers/:courseId/assignmentSubmissions/:id',
		method: 'get',
		controllers: [
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await AssignmentSubmissionController.FindAssignmentSubmission(req)
				}
			})
		]
	},
	{
		path: '/teachers/:courseId/assignmentSubmissions',
		method: 'post',
		controllers: [
			isAuthenticated,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await AssignmentSubmissionController.SubmitAssignment(req)
				}
			})
		]
	},
	{
		path: '/teachers/:courseId/assignmentSubmissions/:id',
		method: 'delete',
		controllers: [
			isAuthenticated,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await AssignmentSubmissionController.DeleteAssignmentSubmission(req)
				}
			})
		]
	}
]