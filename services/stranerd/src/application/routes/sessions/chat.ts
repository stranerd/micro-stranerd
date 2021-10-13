import { makeController, requireAuthUser, Route, StatusCodes } from '@utils/commons'
import { ChatController } from '../../controllers/sessions'

export const chatRoutes: Route[] = [
	{
		path: '/chats',
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
		path: '/chats/:id',
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
		path: '/chats',
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
		path: '/chats/read',
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