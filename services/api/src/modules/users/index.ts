import { UserRepository } from './data/repositories/users'
import { UsersUseCase } from './domain/useCases/users'
import { NotificationRepository } from './data/repositories/notifications'
import { NotificationsUseCase } from './domain/useCases/notifications'
import { ReferralRepository } from './data/repositories/referrals'
import { ReferralsUseCase } from './domain/useCases/referrals'
import { BadgeRepository } from './data/repositories/badges'
import { BadgesUseCase } from './domain/useCases/badges'
import { ConnectRepository } from './data/repositories/connects'
import { ConnectsUseCase } from './domain/useCases/connects'

const userRepository = UserRepository.getInstance()
const badgeRepository = BadgeRepository.getInstance()
const notificationRepository = NotificationRepository.getInstance()
const referralRepository = ReferralRepository.getInstance()
const connectRepository = ConnectRepository.getInstance()

export const UsersUseCases = new UsersUseCase(userRepository)
export const BadgesUseCases = new BadgesUseCase(badgeRepository)
export const NotificationsUseCases = new NotificationsUseCase(notificationRepository)
export const ReferralsUseCases = new ReferralsUseCase(referralRepository)
export const ConnectsUseCases = new ConnectsUseCase(connectRepository)

export { BadgeFromModel } from './data/models/badges'
export { NotificationFromModel, NotificationToModel } from './data/models/notifications'
export { ReferralFromModel } from './data/models/referrals'
export { UserFromModel } from './data/models/users'
export { ConnectFromModel } from './data/models/connects'
export { BadgeEntity } from './domain/entities/badges'
export { NotificationEntity } from './domain/entities/notifications'
export { ReferralEntity } from './domain/entities/referrals'
export { UserEntity } from './domain/entities/users'
export { ConnectEntity } from './domain/entities/connects'
export { RankTypes } from './domain/entities/ranks'
export {
	ScoreRewards, CountStreakBadges, CountValues, StreakValues, UserRankings, UserMeta,
	EmbeddedUser, UserSchoolData, UserSchoolType, NotificationType
} from './domain/types'