import { UserRepository } from './data/repositories/users'
import { FindUserUseCase } from './domain/useCases/users/findUser'
import { CreateUserWithBioUseCase } from './domain/useCases/users/createUserWithBio'
import { UpdateUserWithBioUseCase } from './domain/useCases/users/updateUserWithBio'
import { MarkUserAsDeletedUseCase } from './domain/useCases/users/markUserAsDeleted'
import { UpdateUserWithRolesUseCase } from './domain/useCases/users/updateUserWithRoles'
import { IncrementUserQuestionsCountUseCase } from './domain/useCases/users/incrementUserQuestionsCount'
import { IncrementUserAnswersCountUseCase } from './domain/useCases/users/incrementUserAnswersCount'
import { IncrementUserAnswerCommentsCountUseCase } from './domain/useCases/users/incrementUserAnswerCommentsCount'
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

const userRepository = UserRepository.getInstance()
const notificationRepository = NotificationRepository.getInstance()
const reviewRepository = ReviewRepository.getInstance()

export const FindUser = new FindUserUseCase(userRepository)
export const CreateUserWithBio = new CreateUserWithBioUseCase(userRepository)
export const UpdateUserWithBio = new UpdateUserWithBioUseCase(userRepository)
export const UpdateUserWithRoles = new UpdateUserWithRolesUseCase(userRepository)
export const MarkUserAsDeleted = new MarkUserAsDeletedUseCase(userRepository)
export const IncrementUserQuestionsCount = new IncrementUserQuestionsCountUseCase(userRepository)
export const IncrementUserAnswersCount = new IncrementUserAnswersCountUseCase(userRepository)
export const IncrementUserAnswerCommentsCount = new IncrementUserAnswerCommentsCountUseCase(userRepository)

export const GetNotifications = new GetNotificationsUseCase(notificationRepository)
export const FindNotification = new FindNotificationUseCase(notificationRepository)
export const CreateNotification = new CreateNotificationUseCase(notificationRepository)
export const MarkNotificationSeen = new MarkNotificationSeenUseCase(notificationRepository)
export const DeleteOldSeenNotifications = new DeleteOldSeenNotificationsUseCase(notificationRepository)

export const GetReviews = new GetReviewsUseCase(reviewRepository)
export const FindReview = new FindReviewUseCase(reviewRepository)
export const CreateReview = new CreateReviewUseCase(reviewRepository)