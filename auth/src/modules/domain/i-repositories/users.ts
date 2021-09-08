import { RegisterInput, RoleInput, TokenInput, UserUpdateInput } from '../types'
import { QueryParams, QueryResults } from '@utils/commons'
import { UserEntity } from '../entities/users'

export interface IUserRepository {
	findUser (id: string): Promise<UserEntity | null>

	getUsers (query: QueryParams): Promise<QueryResults<UserEntity>>

	updateUserRole (roleInput: RoleInput): Promise<boolean>

	updateDetails (userId: string, credentials: RegisterInput): Promise<TokenInput>

	updateUserProfile (userId: string, input: UserUpdateInput): Promise<UserEntity>

	updatePassword (userId: string, password: string): Promise<boolean>

	deleteUsers (userIds: string[]): Promise<void>
}