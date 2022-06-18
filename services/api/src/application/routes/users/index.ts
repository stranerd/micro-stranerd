import { Route } from '@utils/commons'
import { badgesRoutes } from './badges'
import { connectsRoutes } from './connects'
import { notificationsRoutes } from './notifications'
import { referralsRoutes } from './referrals'
import { reviewsRoutes } from './reviews'
import { usersRoutes } from './users'

export const userRoutes: Route[] = [
	...badgesRoutes,
	...connectsRoutes,
	...notificationsRoutes,
	...referralsRoutes,
	...reviewsRoutes,
	...usersRoutes
]