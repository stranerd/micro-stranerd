import { Route } from '@utils/app/package'
import { commentsRoutes } from './comments'
import { likesRoutes } from './likes'
import { tagsRoutes } from './tags'
import { viewsRoutes } from './views'

export const interactionRoutes: Route[] = [
	...commentsRoutes,
	...likesRoutes,
	...tagsRoutes,
	...viewsRoutes
]