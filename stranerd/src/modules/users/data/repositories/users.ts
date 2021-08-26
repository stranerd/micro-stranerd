import { IUserRepository } from '../../domain/i-repositories/users'
import { UserBio, UserRoles } from '../../domain/types/users'
import { UserMapper } from '../mappers/users'
import { User } from '../mongooseModels/users'

export class UserRepository implements IUserRepository {
	private static instance: UserRepository
	private mapper: UserMapper

	private constructor () {
		this.mapper = new UserMapper()
	}

	static getInstance (): UserRepository {
		if (!UserRepository.instance) UserRepository.instance = new UserRepository()
		return UserRepository.instance
	}

	async createUserWithBio (userId: string, data: UserBio) {
		await User.findByIdAndUpdate(userId, {
			$set: { bio: data }
		}, { upsert: true })
	}

	async updateUserWithBio (userId: string, data: UserBio) {
		await User.findByIdAndUpdate(userId, {
			$set: { bio: data }
		}, { upsert: true })
	}

	async findUser (userId: string) {
		const user = await User.findById(userId)
		return this.mapper.mapFrom(user)
	}

	async markUserAsDeleted (userId: string) {
		await User.findByIdAndUpdate(userId, {
			$set: { 'dates.deletedAt': Date.now() }
		}, { upsert: true })
	}

	async updateUserWithRoles (userId: string, data: UserRoles) {
		await User.findByIdAndUpdate(userId, {
			$set: { roles: data }
		}, { upsert: true })
	}
}