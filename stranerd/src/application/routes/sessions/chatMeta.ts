import { makeController, requireAuthUser, Route, StatusCodes } from '@utils/commons'
import { ChatMetaController } from '../../controllers/sessions'

export const ChatMetaRoutes: Route[] = [
	{
		path: '/chatMetas',
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
	}
]