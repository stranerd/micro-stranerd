import { UserRepository } from './data/repositories/users'
import { FindUserUseCase } from './domain/useCases/users/findUser'
import { CreateUserWithBioUseCase } from './domain/useCases/users/createUserWithBio'
import { UpdateUserWithBioUseCase } from './domain/useCases/users/updateUserWithBio'
import { MarkUserAsDeletedUseCase } from './domain/useCases/users/markUserAsDeleted'
import { UpdateUserWithRolesUseCase } from './domain/useCases/users/updateUserWithRoles'
import { IncrementUserMetaCountUseCase } from './domain/useCases/users/incrementUserMetaCount'
import { NotificationRepository } from './data/repositories/notifications'
import { FindNotificationUseCase } from './domain/useCases/notifications/findNotification'
import { CreateNotificationUseCase } from './domain/useCases/notifications/createNotification'
import { MarkNotificationsSeenUseCase } from './domain/useCases/notifications/markNotificationsSeen'
import { DeleteOldSeenNotificationsUseCase } from './domain/useCases/notifications/deleteOldSeenNotifications'
import { GetNotificationsUseCase } from './domain/useCases/notifications/getNotifications'
import { ReviewRepository } from './data/repositories/reviews'
import { GetReviewsUseCase } from './domain/useCases/reviews/getReviews'
import { FindReviewUseCase } from './domain/useCases/reviews/findReview'
import { CreateReviewUseCase } from './domain/useCases/reviews/createReview'
import { UpdateMyReviewsBioUseCase } from './domain/useCases/reviews/updateMyReviewsBio'
import { GetUsersUseCase } from './domain/useCases/users/getUsers'
import { UpdateUserNerdScoreUseCase } from './domain/useCases/users/updateUserNerdScore'
import { UpdateUserRatingsUseCase } from './domain/useCases/users/updateUserRatings'
import { UpdateUserTagsUseCase } from './domain/useCases/users/updateUserTags'
import { UpdateUserStatusUseCase } from './domain/useCases/users/updateUserStatus'
import { SetUsersCurrentSessionUseCase } from './domain/useCases/users/setUsersCurrentSession'
import { UpdateUserQueuedSessionsUseCase } from './domain/useCases/users/updateUserQueuedSessions'
import { IncrementUsersSessionsCountUseCase } from './domain/useCases/users/incrementUsersSessionsCount'
import { UpdateUserSubjectsUseCase } from './domain/useCases/users/updateUserSubjects'
import { UpdateUserStreakUseCase } from './domain/useCases/users/updateUserStreak'
import { ResetRankingsUseCase } from './domain/useCases/users/resetRankings'
import { ReferralRepository } from './data/repositories/referrals'
import { FindReferralUseCase } from './domain/useCases/referrals/findReferral'
import { CreateReferralUseCase } from './domain/useCases/referrals/createReferral'
import { GetReferralsUseCase } from './domain/useCases/referrals/getReferrals'
import { ResetAllUsersStatusUseCase } from './domain/useCases/users/resetAllUsersStatus'
import { BadgeRepository } from './data/repositories/badges'
import { GetBadgesUseCase } from './domain/useCases/badges/getBadges'
import { FindBadgeUseCase } from './domain/useCases/badges/findBadge'
import { RecordRankUseCase } from './domain/useCases/badges/recordRank'
import { RecordCountStreakUseCase } from './domain/useCases/badges/recordCountStreak'

const userRepository = UserRepository.getInstance()
const badgeRepository = BadgeRepository.getInstance()
const notificationRepository = NotificationRepository.getInstance()
const referralRepository = ReferralRepository.getInstance()
const reviewRepository = ReviewRepository.getInstance()

export const GetUsers = new GetUsersUseCase(userRepository)
export const FindUser = new FindUserUseCase(userRepository)
export const CreateUserWithBio = new CreateUserWithBioUseCase(userRepository)
export const UpdateUserWithBio = new UpdateUserWithBioUseCase(userRepository)
export const UpdateUserWithRoles = new UpdateUserWithRolesUseCase(userRepository)
export const MarkUserAsDeleted = new MarkUserAsDeletedUseCase(userRepository)
export const UpdateUserNerdScore = new UpdateUserNerdScoreUseCase(userRepository)
export const SetUsersCurrentSession = new SetUsersCurrentSessionUseCase(userRepository)
export const UpdateUserQueuedSessions = new UpdateUserQueuedSessionsUseCase(userRepository)
export const IncrementUsersSessionsCount = new IncrementUsersSessionsCountUseCase(userRepository)
export const IncrementUserMetaCount = new IncrementUserMetaCountUseCase(userRepository)
export const UpdateUserStreak = new UpdateUserStreakUseCase(userRepository)
export const UpdateUserRatings = new UpdateUserRatingsUseCase(userRepository)
export const UpdateUserTags = new UpdateUserTagsUseCase(userRepository)
export const UpdateUserStatus = new UpdateUserStatusUseCase(userRepository)
export const ResetAllUsersStatus = new ResetAllUsersStatusUseCase(userRepository)
export const UpdateUserSubjects = new UpdateUserSubjectsUseCase(userRepository)
export const ResetRankings = new ResetRankingsUseCase(userRepository)

export const GetBadges = new GetBadgesUseCase(badgeRepository)
export const FindBadge = new FindBadgeUseCase(badgeRepository)
export const RecordRank = new RecordRankUseCase(badgeRepository)
export const RecordCountStreak = new RecordCountStreakUseCase(badgeRepository)

export const GetNotifications = new GetNotificationsUseCase(notificationRepository)
export const FindNotification = new FindNotificationUseCase(notificationRepository)
export const CreateNotification = new CreateNotificationUseCase(notificationRepository)
export const MarkNotificationsSeen = new MarkNotificationsSeenUseCase(notificationRepository)
export const DeleteOldSeenNotifications = new DeleteOldSeenNotificationsUseCase(notificationRepository)

export const GetReviews = new GetReviewsUseCase(reviewRepository)
export const FindReview = new FindReviewUseCase(reviewRepository)
export const CreateReview = new CreateReviewUseCase(reviewRepository)
export const UpdateMyReviewsBio = new UpdateMyReviewsBioUseCase(reviewRepository)

export const GetReferrals = new GetReferralsUseCase(referralRepository)
export const FindReferral = new FindReferralUseCase(referralRepository)
export const CreateReferral = new CreateReferralUseCase(referralRepository)

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
	ScoreRewards, UserBio, CountStreakBadges, CountValues, StreakValues
} from './domain/types'