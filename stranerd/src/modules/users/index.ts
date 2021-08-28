import { UserRepository } from './data/repositories/users'
import { FindUserUseCase } from './domain/useCases/users/findUser'
import { CreateUserWithBioUseCase } from './domain/useCases/users/createUserWithBio'
import { UpdateUserWithBioUseCase } from './domain/useCases/users/updateUserWithBio'
import { MarkUserAsDeletedUseCase } from './domain/useCases/users/markUserAsDeleted'
import { UpdateUserWithRolesUseCase } from './domain/useCases/users/updateUserWithRoles'
import { NotificationRepository } from './data/repositories/notifications'
import { FindNotificationUseCase } from './domain/useCases/notifications/findNotification'
import { MarkNotificationSeenUseCase } from './domain/useCases/notifications/markNotificationSeen'

const userRepository = UserRepository.getInstance()
const notificationRepository = NotificationRepository.getInstance()

export const FindUser = new FindUserUseCase(userRepository)
export const CreateUserWithBio = new CreateUserWithBioUseCase(userRepository)
export const UpdateUserWithBio = new UpdateUserWithBioUseCase(userRepository)
export const UpdateUserWithRoles = new UpdateUserWithRolesUseCase(userRepository)
export const MarkUserAsDeleted = new MarkUserAsDeletedUseCase(userRepository)

export const FindNotification = new FindNotificationUseCase(notificationRepository)
export const MarkNotificationSeen = new MarkNotificationSeenUseCase(notificationRepository)