import { Route } from '@utils/commons'
import { answerCommentsRoutes } from './answerComments'
import { answersRoutes } from './answers'
import { answerUpvotesRoutes } from './answerUpvotes'
import { questionsRoutes } from './questions'

export const questionRoutes: Route[] = [
	...answerCommentsRoutes,
	...answersRoutes,
	...answerUpvotesRoutes,
	...questionsRoutes
]