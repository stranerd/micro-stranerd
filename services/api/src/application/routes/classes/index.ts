import { announcementsRoutes } from './announcements'
import { classesRoutes } from './classes'
import { groupsRoutes } from './groups'
import { eventsRoutes } from './events'
import { schemesRoutes } from './schemes'
import { Route } from '@utils/app/package'

export const classRoutes: Route[] = [
	...announcementsRoutes,
	...classesRoutes,
	...groupsRoutes,
	...eventsRoutes,
	...schemesRoutes
]