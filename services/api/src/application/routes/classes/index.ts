import { announcementsRoutes } from './announcements'
import { classesRoutes } from './classes'
import { discussionRoutes } from './discussions'
import { groupsRoutes } from './groups'
import { Route } from '@utils/commons'

export const classRoutes: Route[] = [
	...announcementsRoutes,
	...classesRoutes,
	...discussionRoutes,
	...groupsRoutes
]