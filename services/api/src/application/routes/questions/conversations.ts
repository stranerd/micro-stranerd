import { makeController, Route, StatusCodes } from '@utils/app/package'
import { ConversationsController } from '../../controllers/questions/conversations'

export const conversationsRoutes: Route[] = [
	{
		path: '/questions/conversations/converse',
		method: 'post',
		controllers: [
			makeController(async (req) => {
				return {
					status: StatusCodes.Ok,
					result: await ConversationsController.Converse(req)
				}
			})
		]
	}
]