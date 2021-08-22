import { IUserRepository } from '../../application/contracts/repository'
import { RoleInput, SocialRegisterInput, TokenInput, UserModel, UserUpdateInput } from '../../application/domain'
import { UserMapper } from '../mapper/user.mapper'
import { UserEntity } from '../entities/user.entity'
import { deleteCachedAccessToken, EventTypes } from '@utils/commons'
import { publishers } from '@utils/events'

const { User } = require('./mongoose-model/user.model')

export class UserRepository implements IUserRepository {

	private static instance: UserRepository
	private userMapper: UserMapper

	constructor () {
		this.userMapper = new UserMapper()
	}

	static getInstance (): UserRepository {
		if (!UserRepository.instance) {
			UserRepository.instance = new UserRepository()
		}

		return UserRepository.instance
	}

	async userDetails (dataVal: string, dataType: string): Promise<UserModel> {

		let user = null

		if (dataType == 'email') {
			user = await User.findOne({ _id: dataVal })
		} else if (dataType == 'id') {

			user = await User.find({ email: dataVal })
		}

		if (user) {

			const result = this.userMapper.mapTo(user)

			return result

		}

		return Promise.reject()
	}

	async userWithEmailExist (email: string, type: string): Promise<boolean> {
		const user = await User.find({ email })
		return user && user.authTypes.indexOf(type) > -1
	}

	async updateUserProfile (input: UserUpdateInput): Promise<boolean> {

		const user = await User.findOne({ _id: input.userId })

		if (user) {

			if (user.photo && user.photo.path != input.photo.path) await publishers[EventTypes.DELETEFILE].publish(user.photo)

			user.firstName = input.firstName
			user.lastName = input.lastName
			user.photo = input.photo

			return true

		}

		return Promise.reject()
	}

	async updateDetails (details: SocialRegisterInput): Promise<TokenInput> {

		const user = await User.findOne({ email: details.email })

		if (user) {

			const userDataToUpdate: UserModel = {
				email: user.email,
				authTypes: user.authTypes,
				firstName: details.firstName,
				lastName: details.lastName,
				isVerified: false,
				roles: user.roles,
				password: details.password,
				photo: details.photo,
				signedUpAt: user.signedUpAt,
				lastSignedInAt: user.lastSignedInAt
			}

			const data: UserEntity = await this.userMapper.mapFrom(userDataToUpdate)

			const userData = await new User(data).save()

			if (userData) {
				const tokenPayload: TokenInput = {
					id: user._id,
					roles: user.roles,
					isVerified: user.isVerified,
					authTypes: user.authTypes
				}

				// update user lastSignIn

				user.lastSignedInAt = new Date().getTime()

				return tokenPayload
			}

		}

		return Promise.reject()
	}

	async updateUserRole (roleInput: RoleInput): Promise<boolean> {

		const user = await User.findOne({ _id: roleInput.userId })

		if (user) {
			const roles = user.roles
			roles[roleInput.app][roleInput.role] = roleInput.value
			user.roles = roles

			// clear accessToken
			await deleteCachedAccessToken(roleInput.userId)

			return true
		}

		return Promise.reject(false)
	}

}