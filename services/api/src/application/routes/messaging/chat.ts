import { makeController, requireAuthUser, Route, StatusCodes } from '@utils/commons'
import { ChatController } from '../../controllers/messaging'

export const chatRoutes: Route[] = [
	{
		path: '/messaging/chats',
		method: 'get',
		controllers: [
			requireAuthUser,
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
			requireAuthUser,
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
			requireAuthUser,
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
			requireAuthUser,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await ChatController.markChatRead(req)
				}
			})
		]
	}
]