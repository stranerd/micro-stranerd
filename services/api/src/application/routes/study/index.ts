import { Route } from '@utils/commons'
import { flashcardsRoutes } from './flashCards'
import { filesRoutes } from './files'
import { setsRoutes } from './sets'
import { testPrepsRoutes } from './testPreps'
import { testsRoutes } from './tests'

export const studyRoutes: Route[] = [
	...flashcardsRoutes,
	...filesRoutes,
	...setsRoutes,
	...testPrepsRoutes,
	...testsRoutes
]