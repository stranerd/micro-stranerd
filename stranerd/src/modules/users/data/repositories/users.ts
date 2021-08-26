import { IUserRepository } from '../../domain/i-repositories/users'
import { UserBio } from '../../domain/types/users'
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
		const user = await User.findById(userId)
		if (!user) {
			const newUser = new User()
			newUser._id = userId
			newUser.bio.email = data.email
			newUser.bio.firstName = data.firstName
			newUser.bio.lastName = data.lastName
			newUser.bio.photo = data.photo
			await newUser.save()
		} else {
			user._id = userId
			user.bio.email = data.email
			user.bio.firstName = data.firstName
			user.bio.lastName = data.lastName
			user.bio.photo = data.photo
		}
	}

	async updateUserWithBio (userId: string, data: UserBio) {
		const user = await User.findById(userId)
		if (user) {
			user.bio.email = data.email
			user.bio.firstName = data.firstName
			user.bio.lastName = data.lastName
			user.bio.photo = data.photo
		}
	}

	async findUser (userId: string) {
		const user = await User.findById(userId)
		return this.mapper.mapFrom(user)
	}

	async markUserAsDeleted (userId: string) {
		const user = await User.findById(userId)
		if (user) user.dates.deletedAt = Date.now()
	}
}