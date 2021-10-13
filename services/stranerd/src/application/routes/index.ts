import { makeController, Route, StatusCodes } from '@utils/commons'
import { appId } from '@utils/environment'
import { badgesRoutes } from './users/badges'
import { usersRoutes } from './users/users'
import { notificationsRoutes } from './users/notifications'
import { referralsRoutes } from './users/referrals'
import { answerCommentsRoutes } from './questions/answerComments'
import { answersRoutes } from './questions/answers'
import { answerUpvotesRoutes } from './questions/answerUpvotes'
import { questionsRoutes } from './questions/questions'
import { subjectsRoutes } from './questions/subjects'
import { tagsRoutes } from './questions/tags'
import { chatMetaRoutes } from './sessions/chatMeta'
import { chatRoutes } from './sessions/chat'
import { sessionRoutes } from './sessions/session'
import { reviewsRoutes } from './users/reviews'
import { transactionsRoutes } from './users/transactions'
import { messagesRoutes } from './meta/messages'
import { searchRoutes } from './meta/search'
import { reportRoutes } from './reports/reports'

export const routes: Route[] = [
	...badgesRoutes,
	...usersRoutes,
	...notificationsRoutes,
	...referralsRoutes,
	...reviewsRoutes,
	...transactionsRoutes,
	...answersRoutes,
	...answerCommentsRoutes,
	...answerUpvotesRoutes,
	...questionsRoutes,
	...subjectsRoutes,
	...tagsRoutes,
	...sessionRoutes,
	...chatMetaRoutes,
	...chatRoutes,
	...tagsRoutes,
	...messagesRoutes,
	...searchRoutes,
	...reportRoutes,
	{
		path: '/',
		method: 'get',
		controllers: [
			makeController(async () => {
				return {
					status: StatusCodes.Ok,
					result: `${appId} service running`
				}
			})
		]
	}
]