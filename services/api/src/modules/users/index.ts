import { UserRepository } from './data/repositories/users'
import { UsersUseCase } from './domain/useCases/users'
import { NotificationRepository } from './data/repositories/notifications'
import { NotificationsUseCase } from './domain/useCases/notifications'
import { ReviewRepository } from './data/repositories/reviews'
import { ReviewsUseCase } from './domain/useCases/reviews'
import { ReferralRepository } from './data/repositories/referrals'
import { ReferralsUseCase } from './domain/useCases/referrals'
import { BadgeRepository } from './data/repositories/badges'
import { BadgesUseCase } from './domain/useCases/badges'

const userRepository = UserRepository.getInstance()
const badgeRepository = BadgeRepository.getInstance()
const notificationRepository = NotificationRepository.getInstance()
const referralRepository = ReferralRepository.getInstance()
const reviewRepository = ReviewRepository.getInstance()

export const UsersUseCases = new UsersUseCase(userRepository)
export const BadgesUseCases = new BadgesUseCase(badgeRepository)
export const NotificationsUseCases = new NotificationsUseCase(notificationRepository)
export const ReferralsUseCases = new ReferralsUseCase(referralRepository)
export const ReviewsUseCases = new ReviewsUseCase(reviewRepository)

export { BadgeFromModel } from './data/models/badges'
export { NotificationFromModel, NotificationToModel } from './data/models/notifications'
export { ReferralFromModel } from './data/models/referrals'
export { ReviewFromModel } from './data/models/reviews'
export { UserFromModel } from './data/models/users'
export { BadgeEntity } from './domain/entities/badges'
export { NotificationEntity } from './domain/entities/notifications'
export { ReferralEntity } from './domain/entities/referrals'
export { ReviewEntity } from './domain/entities/reviews'
export { UserEntity } from './domain/entities/users'
export { RankTypes } from './domain/entities/ranks'
export {
	ScoreRewards, CountStreakBadges, CountValues, StreakValues, UserRankings, UserMeta,
	EmbeddedUser, UserSchoolData, UserSchoolType
} from './domain/types'