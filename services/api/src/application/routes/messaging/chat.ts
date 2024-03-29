import { makeController, Route, StatusCodes } from '@utils/app/package'
import { ChatController } from '../../controllers/messaging/chat'
import { isAuthenticated } from '@application/middlewares'

export const chatRoutes: Route[] = [
	{
		path: '/messaging/chats',
		method: 'get',
		controllers: [
			isAuthenticated,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await ChatController.getChats(req)
				}
			})
		]
	},
	{
		path: '/messaging/chats/:id',
		method: 'get',
		controllers: [
			isAuthenticated,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await ChatController.findChat(req)
				}
			})
		]
	},
	{
		path: '/messaging/chats',
		method: 'post',
		controllers: [
			isAuthenticated,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await ChatController.addChat(req)
				}
			})
		]
	},
	{
		path: '/messaging/chats/read',
		method: 'put',
		controllers: [
			isAuthenticated,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await ChatController.markChatRead(req)
				}
			})
		]
	}
]