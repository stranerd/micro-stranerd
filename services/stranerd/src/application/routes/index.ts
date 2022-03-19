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
import { chatMetaRoutes } from './sessions/chatMeta'
import { chatRoutes } from './sessions/chat'
import { sessionRoutes } from './sessions/session'
import { reviewsRoutes } from './users/reviews'
import { messagesRoutes } from './meta/messages'
import { searchRoutes } from './meta/search'
import { reportRoutes } from './reports/reports'
import { pastQuestionsRoutes } from './study/pastQuestions'
import { flashcardsRoutes } from './study/flashCards'
import { notesRoutes } from './study/notes'
import { commentsRoutes } from './study/comments'
import { videosRoutes } from './study/videos'
import { setsRoutes } from './study/sets'
import { testPrepsRoutes } from './study/testPreps'
import { testsRoutes } from './study/tests'
import { announcementsRoutes } from './classes/announcements'
import { classesRoutes } from './classes/classes'
import { discussionRoutes } from './classes/discussions'
import { groupsRoutes } from './classes/groups'
import { institutionsRoutes } from './school/institutions'
import { coursesRoutes } from './school/courses'

export const routes: Route[] = [
	...badgesRoutes,
	...usersRoutes,
	...notificationsRoutes,
	...referralsRoutes,
	...reviewsRoutes,
	...answersRoutes,
	...answerCommentsRoutes,
	...answerUpvotesRoutes,
	...questionsRoutes,
	...sessionRoutes,
	...chatMetaRoutes,
	...chatRoutes,
	...messagesRoutes,
	...searchRoutes,
	...reportRoutes,
	...pastQuestionsRoutes,
	...flashcardsRoutes,
	...notesRoutes,
	...videosRoutes,
	...commentsRoutes,
	...setsRoutes,
	...testPrepsRoutes,
	...testsRoutes,
	...announcementsRoutes,
	...classesRoutes,
	...discussionRoutes,
	...groupsRoutes,
	...coursesRoutes,
	...institutionsRoutes,
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