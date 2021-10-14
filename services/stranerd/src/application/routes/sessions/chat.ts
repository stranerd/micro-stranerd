import { makeController, requireAuthUser, Route, StatusCodes } from '@utils/commons'
import { ChatController } from '../../controllers/sessions'

export const ChatRoutes: Route[] = [
	{
		path: '/sessions/chats',
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
		path: '/sessions/chats/:id',
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
		path: '/sessions/chats',
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
		path: '/sessions/chats/:id/read',
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