import { Route } from '@utils/commons'
import { answerCommentsRoutes } from './answerComments'
import { answersRoutes } from './answers'
import { questionsRoutes } from './questions'

export const questionRoutes: Route[] = [
	...answerCommentsRoutes,
	...answersRoutes,
	...questionsRoutes
]