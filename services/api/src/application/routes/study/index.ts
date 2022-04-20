import { Route } from '@utils/commons'
import { commentsRoutes } from './comments'
import { flashcardsRoutes } from './flashCards'
import { notesRoutes } from './notes'
import { setsRoutes } from './sets'
import { testPrepsRoutes } from './testPreps'
import { testsRoutes } from './tests'
import { videosRoutes } from './videos'

export const studyRoutes: Route[] = [
	...commentsRoutes,
	...flashcardsRoutes,
	...notesRoutes,
	...setsRoutes,
	...testPrepsRoutes,
	...testsRoutes,
	...videosRoutes
]