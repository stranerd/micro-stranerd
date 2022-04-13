import { IUserRepository } from '../../domain/i-repositories/users'
import { UserAccount, UserBio, UserRankings, UserRoles, UserSchoolData } from '../../domain/types'
import { UserMapper } from '../mappers/users'
import { User } from '../mongooseModels/users'
import { mongoose, parseQueryParams } from '@utils/commons'
import { UserFromModel } from '../models/users'
import { getDateDifference } from '@utils/functions'

export class UserRepository implements IUserRepository {
	private static instance: UserRepository
	private mapper = new UserMapper()

	static getInstance (): UserRepository {
		if (!UserRepository.instance) UserRepository.instance = new UserRepository()
		return UserRepository.instance
	}

	async getUsers (query) {
		const data = await parseQueryParams<UserFromModel>(User, query)
		return {
			...data,
			results: data.results.map((u) => this.mapper.mapFrom(u)!)
		}
	}

	async createUserWithBio (userId: string, data: UserBio, timestamp: number) {
		await User.findByIdAndUpdate(userId, {
			$set: { bio: data },
			$setOnInsert: { _id: userId, dates: { createdAt: timestamp, deletedAt: null } }
		}, { upsert: true })
	}

	async updateUserWithBio (userId: string, data: UserBio, _: number) {
		await User.findByIdAndUpdate(userId, {
			$set: { bio: data },
			$setOnInsert: { _id: userId }
		}, { upsert: true })
	}

	async findUser (userId: string) {
		const user = await User.findById(userId)
		return this.mapper.mapFrom(user)
	}

	async markUserAsDeleted (userId: string, timestamp: number) {
		await User.findByIdAndUpdate(userId, {
			$set: { 'dates.deletedAt': timestamp }
		}, { upsert: true })
	}

	async updateNerdScore (userId: string, amount: number) {
		const rankings = Object.fromEntries(
			Object.keys(UserRankings).map((key) => [`account.rankings.${key}`, amount])
		)
		const user = await User.findByIdAndUpdate(userId, {
			$inc: { ...rankings, 'account.score': amount }
		})
		return !!user
	}

	async resetRankings (key: keyof UserAccount['rankings']) {
		const res = await User.updateMany({}, {
			$set: { [`account.rankings.${key}`]: 0 }
		})
		return !!res.acknowledged
	}

	async updateUserWithRoles (userId: string, data: UserRoles) {
		await User.findByIdAndUpdate(userId, {
			$set: { roles: data }
		}, { upsert: true })
	}

	async incrementUserMetaProperty (userId: string, propertyName: keyof UserAccount['meta'], value: 1 | -1) {
		await User.findByIdAndUpdate(userId, {
			$inc: {
				[`account.meta.${propertyName}`]: value
			}
		})
	}

	async setUsersCurrentSession (studentId: string, tutorId: string, sessionId: string, add: boolean) {
		const session = await mongoose.startSession()
		const key = add ? '$addToSet' : '$pull'
		await session.withTransaction(async (session) => {
			await User.findByIdAndUpdate(studentId, { [key]: { 'session.currentSessions': sessionId } }, { session })
			await User.findByIdAndUpdate(tutorId, { [key]: { 'session.currentTutorSessions': sessionId } }, { session })
		})
		await session.endSession()
	}

	async updateUserQueuedSessions (studentId: string, tutorId: string, sessionIds: string[], add: boolean) {
		const session = await mongoose.startSession()
		await session.withTransaction(async (session) => {
			await User.findByIdAndUpdate(studentId, { [add ? '$addToSet' : '$pull']: { 'session.lobby': { [add ? '$each' : '$in']: sessionIds } } }, { session })
			await User.findByIdAndUpdate(tutorId, { [add ? '$addToSet' : '$pull']: { 'session.requests': { [add ? '$each' : '$in']: sessionIds } } }, { session })
		})
		await session.endSession()
	}

	async updateUserStreak (userId: string) {
		const session = await mongoose.startSession()
		const res = { skip: false, increase: false, reset: false, streak: 0 }
		await session.withTransaction(async (session) => {
			const userModel = await User.findById(userId, null, { session })
			const user = this.mapper.mapFrom(userModel)
			const { lastEvaluatedAt = 0, count = 0, longestStreak = 0 } = user?.account?.streak ?? {}
			const { isLessThan, isNextDay } = getDateDifference(new Date(lastEvaluatedAt), new Date())

			res.skip = isLessThan
			res.increase = !isLessThan && isNextDay
			res.reset = !isLessThan && !isNextDay
			res.streak = !isLessThan && isNextDay ? count + 1 : 1

			const updateData = {
				'account.streak.lastEvaluatedAt': Date.now(),
				'account.streak.count': res.increase ? count + 1 : 1
			}
			if (res.increase && count + 1 > longestStreak) updateData['account.streak.longestStreak'] = count + 1
			if (!res.skip) await User.findByIdAndUpdate(userId, { $set: updateData }, { session })

			return res
		})
		await session.endSession()
		return res
	}

	async updateUserRatings (userId: string, ratings: number, add: boolean) {
		const user = await User.findByIdAndUpdate(userId, {
			$inc: {
				'account.ratings.total': add ? ratings : 0 - ratings,
				'account.ratings.count': add ? 1 : -1
			}
		})
		return !!user
	}

	async updateUserStatus (userId: string, socketId: string, add: boolean) {
		const user = await User.findByIdAndUpdate(userId, {
			$set: { 'status.lastUpdatedAt': Date.now() },
			[add ? '$addToSet' : '$pull']: { 'status.connections': socketId }
		})
		return !!user
	}

	async resetAllUsersStatus () {
		const res = await User.updateMany({}, {
			$set: { 'status.connections': [] }
		})
		return !!res.acknowledged
	}

	async updateUserSchoolData (userId: string, data: UserSchoolData) {
		const user = await User.findByIdAndUpdate(userId, { $set: { school: data } })
		return !!user
	}
}