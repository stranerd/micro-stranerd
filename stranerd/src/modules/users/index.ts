import { UserRepository } from './data/repositories/users'
import { FindUserUseCase } from './domain/useCases/users/findUser'
import { CreateUserWithBioUseCase } from './domain/useCases/users/createUserWithBio'
import { UpdateUserWithBioUseCase } from './domain/useCases/users/updateUserWithBio'
import { MarkUserAsDeletedUseCase } from './domain/useCases/users/markUserAsDeleted'
import { UpdateUserWithRolesUseCase } from './domain/useCases/users/updateUserWithRoles'
import { IncrementUserMetaCountUseCase } from './domain/useCases/users/incrementUserMetaCount'
import { AddUserCoinsUseCase } from './domain/useCases/users/addUserCoins'
import { NotificationRepository } from './data/repositories/notifications'
import { FindNotificationUseCase } from './domain/useCases/notifications/findNotification'
import { CreateNotificationUseCase } from './domain/useCases/notifications/createNotification'
import { MarkNotificationSeenUseCase } from './domain/useCases/notifications/markNotificationSeen'
import { DeleteOldSeenNotificationsUseCase } from './domain/useCases/notifications/deleteOldSeenNotifications'
import { GetNotificationsUseCase } from './domain/useCases/notifications/getNotifications'
import { ReviewRepository } from './data/repositories/reviews'
import { GetReviewsUseCase } from './domain/useCases/reviews/getReviews'
import { FindReviewUseCase } from './domain/useCases/reviews/findReview'
import { CreateReviewUseCase } from './domain/useCases/reviews/createReview'
import { UpdateMyReviewsBioUseCase } from './domain/useCases/reviews/updateMyReviewsBio'
import { TransactionRepository } from './data/repositories/transactions'
import { GetTransactionsUseCase } from './domain/useCases/transactions/getTransactions'
import { FindTransactionUseCase } from './domain/useCases/transactions/findTransaction'
import { CreateTransactionUseCase } from './domain/useCases/transactions/createTransaction'
import { GetUsersUseCase } from './domain/useCases/users/getUsers'
import { UpdateUserNerdScoreUseCase } from './domain/useCases/users/updateUserNerdScore'
import { UpdateUserRatingsUseCase } from './domain/useCases/users/updateUserRatings'
import { UpdateUserTagsUseCase } from './domain/useCases/users/updateUserTags'
import { UpdateUserStatusUseCase } from './domain/useCases/users/updateUserStatus'
import { SetUsersCurrentSessionUseCase } from './domain/useCases/users/setUsersCurrentSession'
import { AddUserQueuedSessionsUseCase } from './domain/useCases/users/addUserQueuedSessions'
import { RemoveUserQueuedSessionsUseCase } from './domain/useCases/users/removeUserQueuedSessions'
import { IncrementUsersSessionsCountUseCase } from './domain/useCases/users/incrementUsersSessionsCount'
import { UpdateUserSubjectsUseCase } from './domain/useCases/users/updateUserSubjects'
import { UpdateUserStreakUseCase } from './domain/useCases/users/updateUserStreak'
import { ReferralRepository } from './data/repositories/referrals'
import { FindReferralUseCase } from './domain/useCases/referrals/findReferral'
import { CreateReferralUseCase } from './domain/useCases/referrals/createReferral'
import { GetReferralsUseCase } from './domain/useCases/referrals/getReferrals'

const userRepository = UserRepository.getInstance()
const notificationRepository = NotificationRepository.getInstance()
const referralRepository = ReferralRepository.getInstance()
const reviewRepository = ReviewRepository.getInstance()
const transactionRepository = TransactionRepository.getInstance()

export const GetUsers = new GetUsersUseCase(userRepository)
export const FindUser = new FindUserUseCase(userRepository)
export const CreateUserWithBio = new CreateUserWithBioUseCase(userRepository)
export const UpdateUserWithBio = new UpdateUserWithBioUseCase(userRepository)
export const UpdateUserWithRoles = new UpdateUserWithRolesUseCase(userRepository)
export const MarkUserAsDeleted = new MarkUserAsDeletedUseCase(userRepository)
export const AddUserCoins = new AddUserCoinsUseCase(userRepository)
export const UpdateUserNerdScore = new UpdateUserNerdScoreUseCase(userRepository)
export const SetUsersCurrentSession = new SetUsersCurrentSessionUseCase(userRepository)
export const AddUserQueuedSessions = new AddUserQueuedSessionsUseCase(userRepository)
export const RemoveUserQueuedSessions = new RemoveUserQueuedSessionsUseCase(userRepository)
export const IncrementUsersSessionsCount = new IncrementUsersSessionsCountUseCase(userRepository)
export const IncrementUserMetaCount = new IncrementUserMetaCountUseCase(userRepository)
export const UpdateUserStreak = new UpdateUserStreakUseCase(userRepository)
export const UpdateUserRatings = new UpdateUserRatingsUseCase(userRepository)
export const UpdateUserTags = new UpdateUserTagsUseCase(userRepository)
export const UpdateUserStatus = new UpdateUserStatusUseCase(userRepository)
export const UpdateUserSubjects = new UpdateUserSubjectsUseCase(userRepository)

export const GetNotifications = new GetNotificationsUseCase(notificationRepository)
export const FindNotification = new FindNotificationUseCase(notificationRepository)
export const CreateNotification = new CreateNotificationUseCase(notificationRepository)
export const MarkNotificationSeen = new MarkNotificationSeenUseCase(notificationRepository)
export const DeleteOldSeenNotifications = new DeleteOldSeenNotificationsUseCase(notificationRepository)

export const GetReviews = new GetReviewsUseCase(reviewRepository)
export const FindReview = new FindReviewUseCase(reviewRepository)
export const CreateReview = new CreateReviewUseCase(reviewRepository)
export const UpdateMyReviewsBio = new UpdateMyReviewsBioUseCase(reviewRepository)

export const GetTransactions = new GetTransactionsUseCase(transactionRepository)
export const FindTransaction = new FindTransactionUseCase(transactionRepository)
export const CreateTransaction = new CreateTransactionUseCase(transactionRepository)

export const GetReferrals = new GetReferralsUseCase(referralRepository)
export const FindReferral = new FindReferralUseCase(referralRepository)
export const CreateReferral = new CreateReferralUseCase(referralRepository)

export { NotificationFromModel, NotificationToModel } from './data/models/notifications'
export { ReferralFromModel } from './data/models/referrals'
export { ReviewFromModel } from './data/models/reviews'
export { TransactionFromModel } from './data/models/transactions'
export { UserFromModel } from './data/models/users'
export { NotificationEntity } from './domain/entities/notifications'
export { ReferralEntity } from './domain/entities/referrals'
export { ReviewEntity } from './domain/entities/reviews'
export { TransactionEntity } from './domain/entities/transactions'
export { UserEntity } from './domain/entities/users'
export { ScoreRewards } from './domain/types'
export { UserBio } from './domain/types'