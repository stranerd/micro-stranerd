import { UserRepository } from './data/repositories/users'
import { FindUserUseCase } from './domain/use-cases/users/findUser'
import { CreateUserWithBioUseCase } from './domain/use-cases/users/createUserWithBio'
import { UpdateUserWithBioUseCase } from './domain/use-cases/users/updateUserWithBio'
import { MarkUserAsDeletedUseCase } from './domain/use-cases/users/markUserAsDeleted'

const userRepository = UserRepository.getInstance()

export const FindUser = new FindUserUseCase(userRepository)
export const CreateUserWithBio = new CreateUserWithBioUseCase(userRepository)
export const UpdateUserWithBio = new UpdateUserWithBioUseCase(userRepository)
export const MarkUserAsDeleted = new MarkUserAsDeletedUseCase(userRepository)
