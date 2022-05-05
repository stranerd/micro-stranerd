import { Route } from '@utils/commons'
import { flashcardsRoutes } from './flashCards'
import { notesRoutes } from './notes'
import { setsRoutes } from './sets'
import { testPrepsRoutes } from './testPreps'
import { testsRoutes } from './tests'
import { videosRoutes } from './videos'

export const studyRoutes: Route[] = [
	...flashcardsRoutes,
	...notesRoutes,
	...setsRoutes,
	...testPrepsRoutes,
	...testsRoutes,
	...videosRoutes
]