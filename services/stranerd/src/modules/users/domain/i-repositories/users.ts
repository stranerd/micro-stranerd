import { UserEntity } from '../entities/users'
import { ScoreRewards, UserAccount, UserBio, UserRoles } from '../types'
import { QueryParams, QueryResults } from '@utils/commons'

export interface IUserRepository {
	getUsers (query: QueryParams): Promise<QueryResults<UserEntity>>

	createUserWithBio (userId: string, data: UserBio, timestamp: number): Promise<void>

	updateUserWithBio (userId: string, data: UserBio, timestamp: number): Promise<void>

	updateUserWithRoles (userId: string, data: UserRoles, timestamp: number): Promise<void>

	markUserAsDeleted (userId: string, timestamp: number): Promise<void>

	findUser (userId: string): Promise<UserEntity | null>

	incrementUserMetaProperty (userId: string, propertyName: keyof UserAccount['meta'], value: 1 | -1): Promise<void>

	updateNerdScore (userId: string, amount: ScoreRewards): Promise<boolean>

	resetRankings (key: keyof UserAccount['rankings']): Promise<boolean>

	setUsersCurrentSession (studentId: string, tutorId: string, sessionId: string, add: boolean): Promise<void>

	updateUserQueuedSessions (studentId: string, tutorId: string, sessionIds: string[], add: boolean): Promise<void>

	updateUserStreak (userId: string): Promise<{ skip: boolean, increase: boolean, reset: boolean, streak: number }>

	updateUserRatings (userId: string, ratings: number, add: boolean): Promise<boolean>

	updateUserStatus (userId: string, socketId: string, add: boolean): Promise<boolean>

	resetAllUsersStatus (): Promise<boolean>

	updateUserSubjects (userId: string, strongestSubject: string, weakerSubjects: string[]): Promise<boolean>
}