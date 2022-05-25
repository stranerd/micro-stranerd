import { Route } from '@utils/commons'
import { answerCommentsRoutes } from './answerComments'
import { answersRoutes } from './answers'
import { questionsRoutes } from './questions'
import { tagsRoutes } from './tags'

export const questionRoutes: Route[] = [
	...answerCommentsRoutes,
	...answersRoutes,
	...questionsRoutes,
	...tagsRoutes
]