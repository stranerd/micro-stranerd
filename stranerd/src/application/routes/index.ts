import { makeController, Route, StatusCodes } from '@utils/commons'
import { appId } from '@utils/environment'
import { usersRoutes } from './users/users'
import { notificationsRoutes } from './users/notifications'
import { 
	answerCommentsRoutes,
	answersRoutes,
	questionsRoutes,
	subjectsRoutes,
	tagsRoutes
} from './questions'
import { reviewsRoutes } from './users/reviews'

export const routes: Route[] = [
	...usersRoutes,
	...notificationsRoutes,
	...reviewsRoutes,
	...answersRoutes,
	...answerCommentsRoutes,
	...questionsRoutes,
	...subjectsRoutes,
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