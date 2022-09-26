import { makeController, Route, StatusCodes } from '@utils/app/package'
import { ChatMetaController } from '../../controllers/messaging/chatMeta'
import { isAuthenticated } from '@application/middlewares'

export const chatMetaRoutes: Route[] = [
	{
		path: '/messaging/chatMetas',
		method: 'get',
		controllers: [
			isAuthenticated,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await ChatMetaController.getChatMeta(req)
				}
			})
		]
	},
	{
		path: '/messaging/chatMetas/:id',
		method: 'get',
		controllers: [
			isAuthenticated,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await ChatMetaController.findChatMeta(req)
				}
			})
		]
	}
]