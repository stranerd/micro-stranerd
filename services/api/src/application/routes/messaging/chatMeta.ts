import { makeController, requireAuthUser, Route, StatusCodes } from '@utils/app/package'
import { ChatMetaController } from '../../controllers/messaging'

export const chatMetaRoutes: Route[] = [
	{
		path: '/messaging/chatMetas',
		method: 'get',
		controllers: [
			requireAuthUser,
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
			requireAuthUser,
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await ChatMetaController.findChatMeta(req)
				}
			})
		]
	}
]