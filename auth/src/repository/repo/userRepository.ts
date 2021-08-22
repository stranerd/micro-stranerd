import { IUserRepository } from '../../application/contracts/repository'
import { RegisterInput, RoleInput, TokenInput, UserEntity, UserUpdateInput } from '../../application/domain'
import { UserMapper } from '../mapper/user.mapper'
import { AuthTypes, deleteCachedAccessToken, EventTypes, NotFoundError } from '@utils/commons'
import { publishers } from '@utils/events'
import { User } from '../mongoose-model/user.model'
import { hash } from '@utils/hash'

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

	async userDetails (dataVal: string, dataType = 'id'): Promise<UserEntity> {

		const user = await User.findOne({ [dataType === 'email' ? 'email' : '_id']: dataVal })
		if (!user) throw new NotFoundError()

		return this.userMapper.mapFrom(user)
	}

	async userWithEmailExist (email: string, type: AuthTypes): Promise<boolean> {
		const user = await User.findOne({ email })
		return (user?.authTypes?.indexOf?.(type) ?? -1) > -1
	}

	async updateUserProfile (input: UserUpdateInput): Promise<boolean> {

		const user = await User.findOne({ _id: input.userId })
		if (!user) throw new NotFoundError()

		if (user.photo && user.photo.path != input.photo.path) await publishers[EventTypes.DELETEFILE].publish(user.photo)

		user.firstName = input.firstName
		user.lastName = input.lastName
		user.photo = input.photo

		return true
	}

	async updateDetails (details: RegisterInput): Promise<TokenInput> {

		const user = await User.findOne({ email: details.email })
		if (!user) throw new NotFoundError()

		user.firstName = details.firstName
		user.lastName = details.lastName
		user.password = await hash(details.password)
		user.photo = details.photo

		const authTypeExist = user.authTypes.indexOf(AuthTypes.email) > -1
		if (!authTypeExist) user.authTypes.push(AuthTypes.email)

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

	async updateUserRole (roleInput: RoleInput): Promise<boolean> {

		const user = await User.findOne({ _id: roleInput.userId })
		if (!user) throw new NotFoundError()

		const roles = user.roles
		roles[roleInput.app][roleInput.role] = roleInput.value
		user.roles = roles

		// clear accessToken
		await deleteCachedAccessToken(roleInput.userId)

		return true
	}

}