import { Route } from '@utils/commons'
import { badgesRoutes } from './badges'
import { notificationsRoutes } from './notifications'
import { referralsRoutes } from './referrals'
import { reviewsRoutes } from './reviews'
import { usersRoutes } from './users'

export const userRoutes: Route[] = [
	...badgesRoutes,
	...notificationsRoutes,
	...referralsRoutes,
	...reviewsRoutes,
	...usersRoutes
]