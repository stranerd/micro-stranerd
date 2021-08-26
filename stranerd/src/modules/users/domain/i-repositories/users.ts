import { UserEntity } from '../entities/users'
import { UserBio } from '../types/users'

export interface IUserRepository {
	createUserWithBio (userId: string, data: UserBio): Promise<void>

	updateUserWithBio (userId: string, data: UserBio): Promise<void>

	markUserAsDeleted (userId: string): Promise<void>

	findUser (userId: string): Promise<UserEntity | null>
}