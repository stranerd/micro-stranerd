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
import { messagesRoutes } from './meta/messages'
import { searchRoutes } from './meta/search'
import { reportRoutes } from './reports/reports'
import { pastQuestionsRoutes } from './study/pastQuestions'
import { flashcardsRoutes } from './study/flashCards'
import { notesRoutes } from './study/notes'
import { videoCommentsRoutes } from './study/videoComments'
import { videosRoutes } from './study/videos'
import { institutionsRoutes } from './study/institutions'
import { coursesRoutes } from './study/courses'
import { setsRoutes } from './study/sets'
import { testPrepsRoutes } from './study/testPreps'
import { testsRoutes } from './study/tests'

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
	...subjectsRoutes,
	...tagsRoutes,
	...sessionRoutes,
	...chatMetaRoutes,
	...chatRoutes,
	...tagsRoutes,
	...messagesRoutes,
	...searchRoutes,
	...reportRoutes,
	...pastQuestionsRoutes,
	...flashcardsRoutes,
	...notesRoutes,
	...videosRoutes,
	...videoCommentsRoutes,
	...institutionsRoutes,
	...coursesRoutes,
	...setsRoutes,
	...testPrepsRoutes,
	...testsRoutes,
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