import { UserEntity } from '../entities/users'
import { UserBio, UserRoles } from '../types/users'
import { QueryParams, QueryResults } from '@utils/commons'

export interface IUserRepository {
	getUsers (query: QueryParams): Promise<QueryResults<UserEntity>>

	createUserWithBio (userId: string, data: UserBio, timestamp: number): Promise<void>

	updateUserWithBio (userId: string, data: UserBio, timestamp: number): Promise<void>

	updateUserWithRoles (userId: string, data: UserRoles, timestamp: number): Promise<void>

	markUserAsDeleted (userId: string, timestamp: number): Promise<void>

	findUser (userId: string): Promise<UserEntity | null>

	incrementUserMetaProperty (userId: string, propertyName: 'questionsCount' | 'answersCount' | 'answerCommentsCount', value: 1 | -1): Promise<void>

	addUserCoins (userId: string, coins: { gold: number, bronze: number })

	search (query: Object, limit: number) : Promise<UserEntity[]>
}