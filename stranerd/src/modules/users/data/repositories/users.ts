import { IUserRepository } from '../../domain/i-repositories/users'
import { UserBio, UserRoles } from '../../domain/types/users'
import { UserMapper } from '../mappers/users'
import { User } from '../mongooseModels/users'
import { mongoose, parseQueryParams } from '@utils/commons'
import { UserFromModel } from '../models/users'

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
		if (!mongoose.Types.ObjectId.isValid(userId)) return
		let user = await User.findById(userId)
		if (!user) user = new User()
		user._id = userId
		user.bio = data
		user.dates.createdAt = timestamp
		await user.save()
	}

	async updateUserWithBio (userId: string, data: UserBio, _: number) {
		if (!mongoose.Types.ObjectId.isValid(userId)) return
		await User.findByIdAndUpdate(userId, {
			$set: { bio: data, _id: userId }
		}, { upsert: true })
	}

	async findUser (userId: string) {
		if (!mongoose.Types.ObjectId.isValid(userId)) return null
		const user = await User.findById(userId)
		return this.mapper.mapFrom(user)
	}

	async markUserAsDeleted (userId: string, timestamp: number) {
		if (!mongoose.Types.ObjectId.isValid(userId)) return
		await User.findByIdAndUpdate(userId, {
			$set: { 'dates.deletedAt': timestamp }
		}, { upsert: true })
	}

	async updateNerdScore (userId: string, amount: number) {
		if (!mongoose.Types.ObjectId.isValid(userId)) return false
		const user = await User.findByIdAndUpdate(userId, {
			$inc: { 'account.score': amount }
		})
		return !!user
	}

	async updateUserWithRoles (userId: string, data: UserRoles) {
		if (!mongoose.Types.ObjectId.isValid(userId)) return
		await User.findByIdAndUpdate(userId, {
			$set: { roles: data }
		}, { upsert: true })
	}

	async incrementUserMetaProperty (userId: string, propertyName: 'questionsCount' | 'answersCount' | 'answerCommentsCount', value: 1 | -1) {
		await User.findByIdAndUpdate(userId, {
			$inc: {
				[`meta/${ propertyName }`]: value
			}
		})
	}

	async addUserCoins (userId: string, coins: { gold: number, bronze: number }) {
		await User.findById(userId, {
			$inc: {
				'account.account.coins.gold': coins.gold,
				'account.account.coins.bronze': coins.bronze
			}
		})
	}

	async setUsersCurrentSession (studentId: string, tutorId: string, sessionId: string | null) {
		const session = await mongoose.startSession()
		try {
			await User.findByIdAndUpdate(studentId, { $set: { 'session.currentSession': sessionId } }, { session })
			await User.findByIdAndUpdate(tutorId, { $set: { 'session.currentTutorSession': sessionId } }, { session })
			await session.commitTransaction()
			session.endSession()
		} catch (e) {
			await session.abortTransaction()
			session.endSession()
			throw e
		}
	}

	async addUserQueuedSessions (studentId: string, tutorId: string, sessionId: string) {
		const session = await mongoose.startSession()
		try {
			await User.findByIdAndUpdate(studentId, { $push: { 'session.lobby': sessionId } }, { session })
			await User.findByIdAndUpdate(tutorId, { $push: { 'session.requests': sessionId } }, { session })
			await session.commitTransaction()
			session.endSession()
		} catch (e) {
			await session.abortTransaction()
			session.endSession()
			throw e
		}
	}

	async removeUserQueuedSessions (studentId: string, tutorId: string, sessionIds: string[]) {
		const session = await mongoose.startSession()
		try {
			await User.findByIdAndUpdate(studentId, { $pull: { 'session.lobby': { $in: sessionIds } } }, { session })
			await User.findByIdAndUpdate(tutorId, { $pull: { 'session.requests': { $in: sessionIds } } }, { session })
			await session.commitTransaction()
			session.endSession()
		} catch (e) {
			await session.abortTransaction()
			session.endSession()
			throw e
		}
	}
}