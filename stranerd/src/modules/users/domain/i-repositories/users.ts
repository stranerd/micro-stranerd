import { UserEntity } from '../entities/users'
import { ScoreRewards, UserAccount, UserBio, UserRoles } from '../types/users'
import { QueryParams, QueryResults } from '@utils/commons'

export interface IUserRepository {
	getUsers (query: QueryParams): Promise<QueryResults<UserEntity>>

	createUserWithBio (userId: string, data: UserBio, timestamp: number): Promise<void>

	updateUserWithBio (userId: string, data: UserBio, timestamp: number): Promise<void>

	updateUserWithRoles (userId: string, data: UserRoles, timestamp: number): Promise<void>

	markUserAsDeleted (userId: string, timestamp: number): Promise<void>

	findUser (userId: string): Promise<UserEntity | null>

	incrementUserMetaProperty (userId: string, propertyName: keyof UserAccount['meta'], value: 1 | -1): Promise<void>

	addUserCoins (userId: string, coins: { gold: number, bronze: number })

	updateNerdScore (userId: string, amount: ScoreRewards): Promise<boolean>

	setUsersCurrentSession (studentId: string, tutorId: string, sessionId: string | null): Promise<void>

	addUserQueuedSessions (studentId: string, tutorId: string, sessionId: string): Promise<void>

	removeUserQueuedSessions (studentId: string, tutorId: string, sessionIds: string[]): Promise<void>

	updateUserStreak (userId: string): Promise<{ skip: boolean, increase: boolean, reset: boolean, streak: number }>

	updateUserRatings (userId: string, ratings: number, add: boolean): Promise<boolean>
}