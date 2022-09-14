import { Route } from '@utils/app/package'
import { badgesRoutes } from './badges'
import { connectsRoutes } from './connects'
import { notificationsRoutes } from './notifications'
import { referralsRoutes } from './referrals'
import { usersRoutes } from './users'

export const userRoutes: Route[] = [
	...badgesRoutes,
	...connectsRoutes,
	...notificationsRoutes,
	...referralsRoutes,
	...usersRoutes
]