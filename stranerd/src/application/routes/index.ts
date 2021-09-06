import { makeController, Route, StatusCodes } from '@utils/commons'
import { appId } from '@utils/environment'
import { usersRoutes } from './users/users'
import { notificationsRoutes } from './users/notifications'
import {
	answerCommentsRoutes,
	answersRoutes,
	answerUpvotesRoutes,
	questionsRoutes,
	subjectsRoutes,
	tagsRoutes,
} from './questions'
import {
	SessionRoutes,
	ChatMetaRoutes,
	ChatRoutes
} from './sessions'
import { reviewsRoutes } from './users/reviews'
import { transactionsRoutes } from './users/transactions'

export const routes: Route[] = [
	...usersRoutes,
	...notificationsRoutes,
	...reviewsRoutes,
	...transactionsRoutes,
	...answersRoutes,
	...answerCommentsRoutes,
	...answerUpvotesRoutes,
	...questionsRoutes,
	...subjectsRoutes,
	...tagsRoutes,
	...SessionRoutes,
	...ChatMetaRoutes,
	...ChatRoutes,
	...tagsRoutes,
	{
		path: '/',
		method: 'get',
		controllers: [
			makeController(async () => {
				return {
					status: StatusCodes.Ok,
					result: `${ appId } service running`
				}
			})
		]
	}
]