import { Route } from '@utils/commons'
import { answersRoutes } from './answers'
import { questionsRoutes } from './questions'
import { tagsRoutes } from './tags'

export const questionRoutes: Route[] = [
	...answersRoutes,
	...questionsRoutes,
	...tagsRoutes
]