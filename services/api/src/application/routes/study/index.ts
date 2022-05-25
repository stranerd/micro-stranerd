import { Route } from '@utils/commons'
import { flashcardsRoutes } from './flashCards'
import { documentsRoutes } from './documents'
import { setsRoutes } from './sets'
import { testPrepsRoutes } from './testPreps'
import { testsRoutes } from './tests'

export const studyRoutes: Route[] = [
	...flashcardsRoutes,
	...documentsRoutes,
	...setsRoutes,
	...testPrepsRoutes,
	...testsRoutes
]