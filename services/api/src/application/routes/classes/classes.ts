import { makeController, Route, StatusCodes } from '@utils/app/package'
import { ClassController } from '../../controllers/classes/classes'
import { isAuthenticated } from '@application/middlewares'

export const classesRoutes: Route[] = [
	{
		path: '/classes/classes',
		method: 'get',
		controllers: [
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await ClassController.GetClass(req)
				}
			})
		]
	},
	{
		path: '/classes/classes/:id',
		method: 'get',
		controllers: [
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await ClassController.FindClass(req)
				}
			})
		]
	},
	{
		path: '/classes/classes/:id',
		method: 'put',
		controllers: [
			isAuthenticated,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await ClassController.UpdateClass(req)
				}
			})
		]
	},
	{
		path: '/classes/classes',
		method: 'post',
		controllers: [
			isAuthenticated,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await ClassController.CreateClass(req)
				}
			})
		]
	},
	{
		path: '/classes/classes/:id',
		method: 'delete',
		controllers: [
			isAuthenticated,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await ClassController.DeleteClass(req)
				}
			})
		]
	},
	{
		path: '/classes/classes/:id/requests',
		method: 'post',
		controllers: [
			isAuthenticated,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await ClassController.RequestClass(req)
				}
			})
		]
	},
	{
		path: '/classes/classes/:id/leave',
		method: 'put',
		controllers: [
			isAuthenticated,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await ClassController.LeaveClass(req)
				}
			})
		]
	},
	{
		path: '/classes/classes/:id/requests',
		method: 'put',
		controllers: [
			isAuthenticated,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await ClassController.AcceptRequest(req)
				}
			})
		]
	},
	{
		path: '/classes/classes/:id/members',
		method: 'put',
		controllers: [
			isAuthenticated,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await ClassController.AddMembers(req)
				}
			})
		]
	},
	{
		path: '/classes/classes/:id/roles',
		method: 'put',
		controllers: [
			isAuthenticated,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await ClassController.ChangeMemberRole(req)
				}
			})
		]
	}
]