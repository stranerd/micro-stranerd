import { IUserRepository } from '../../domain/i-repositories/users'
import { UserAccount, UserBio, UserRoles } from '../../domain/types'
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
		let user = await User.findById(userId)
		if (!user) user = new User()
		user._id = userId
		user.bio = data
		user.dates.createdAt = timestamp
		await user.save()
	}

	async updateUserWithBio (userId: string, data: UserBio, _: number) {
		await User.findByIdAndUpdate(userId, {
			$set: { bio: data, _id: userId }
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
		const user = await User.findByIdAndUpdate(userId, {
			$inc: { 'account.score': amount }
		})
		return !!user
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

	async addUserCoins (userId: string, coins: { gold: number, bronze: number }) {
		await User.findByIdAndUpdate(userId, {
			$inc: {
				'account.coins.gold': coins.gold,
				'account.coins.bronze': coins.bronze
			}
		})
	}

	async setUsersCurrentSession (studentId: string, tutorId: string, sessionId: string | null) {
		const session = await mongoose.startSession()
		await session.withTransaction(async (session) => {
			await User.findByIdAndUpdate(studentId, { $set: { 'session.currentSession': sessionId } }, { session })
			await User.findByIdAndUpdate(tutorId, { $set: { 'session.currentTutorSession': sessionId } }, { session })
		})
		await session.endSession()
	}

	async addUserQueuedSessions (studentId: string, tutorId: string, sessionId: string) {
		const session = await mongoose.startSession()
		await session.withTransaction(async (session) => {
			await User.findByIdAndUpdate(studentId, { $push: { 'session.lobby': sessionId } }, { session })
			await User.findByIdAndUpdate(tutorId, { $push: { 'session.requests': sessionId } }, { session })
		})
		await session.endSession()
	}

	async removeUserQueuedSessions (studentId: string, tutorId: string, sessionIds: string[]) {
		const session = await mongoose.startSession()
		await session.withTransaction(async (session) => {
			await User.findByIdAndUpdate(studentId, { $pull: { 'session.lobby': { $in: sessionIds } } }, { session })
			await User.findByIdAndUpdate(tutorId, { $pull: { 'session.requests': { $in: sessionIds } } }, { session })
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
				$set: { 'account.streak.lastEvaluatedAt': Date.now() },
				$inc: {
					'account.streak.longestStreak': res.increase && count === longestStreak ? 1 : 0
				}
			}
			if (res.increase) updateData.$inc['account.streak.count'] = 1
			else updateData.$set['account.streak.count'] = 1
			if (!res.skip) await User.findByIdAndUpdate(userId, updateData, { session })

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

	async updateUserTags (userId: string, tags: string[], add: boolean) {
		const updateData = Object.fromEntries(tags.map((tag) => [`tutor.tags.${tag}`, add ? 1 : -1]))
		const user = await User.findByIdAndUpdate(userId, { $inc: updateData })
		return !!user
	}

	async updateUserStatus (userId: string, socketId: string, add: boolean) {
		const session = await mongoose.startSession()
		let res = null as any
		await session.withTransaction(async (session) => {
			const userModel = await User.findById(userId, null, { session })
			const user = this.mapper.mapFrom(userModel)
			if (!user) return false
			const updateData: any = { [add ? '$push' : '$pull']: { 'status.connections': socketId } }
			if (!add && user.status.connections.length === 1 && user.status.connections[0] === socketId) {
				updateData['$set'] = { 'status.lastUpdatedAt': Date.now() }
			}
			const newUser = await User.findByIdAndUpdate(userId, updateData, { session })
			res = !!newUser
			return res
		})
		await session.endSession()
		return res
	}

	async updateUserSubjects (userId: string, strongestSubject: string, weakerSubjects: string[]) {
		const user = await User.findByIdAndUpdate(userId, {
			$set: { 'tutor.strongestSubject': strongestSubject, 'tutor.weakerSubjects': weakerSubjects }
		})
		return !!user
	}
}