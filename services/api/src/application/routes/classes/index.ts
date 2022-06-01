import { announcementsRoutes } from './announcements'
import { classesRoutes } from './classes'
import { discussionRoutes } from './discussions'
import { groupsRoutes } from './groups'
import { eventsRoutes } from './events'
import { schemesRoutes } from './schemes'
import { Route } from '@utils/commons'

export const classRoutes: Route[] = [
	...announcementsRoutes,
	...classesRoutes,
	...discussionRoutes,
	...groupsRoutes,
	...eventsRoutes,
	...schemesRoutes
]