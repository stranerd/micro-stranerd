import { IUserRepository } from '../../contracts/repository'
import { RegisterInput, RoleInput, TokenInput, UserEntity, UserUpdateInput } from '../../domain'
import { UserMapper } from '../mapper/user.mapper'
import { AuthTypes, deleteCachedAccessToken, mongoose, NotFoundError } from '@utils/commons'
import User from '../mongooseModels/user.model'
import { hash } from '@utils/hash'

export class UserRepository implements IUserRepository {
	private static instance: UserRepository
	private userMapper: UserMapper

	private constructor () {
		this.userMapper = new UserMapper()
	}

	static getInstance (): UserRepository {
		if (!UserRepository.instance) UserRepository.instance = new UserRepository()
		return UserRepository.instance
	}

	async userDetails (dataVal: string, dataType = 'id'): Promise<UserEntity | null> {
		if (dataType === 'id' && !mongoose.Types.ObjectId.isValid(dataVal)) return null
		const user = await User.findOne({ [dataType === 'email' ? 'email' : '_id']: dataVal })
		return this.userMapper.mapFrom(user)
	}

	async userWithEmailExist (email: string, type: AuthTypes): Promise<boolean> {
		email = email.toLowerCase()
		const user = await User.findOne({ email, authTypes: type })
		return !!user
	}

	async updateUserProfile (input: UserUpdateInput): Promise<boolean> {
		if (!mongoose.Types.ObjectId.isValid(input.userId)) return false
		const user = await User.findOneAndUpdate({ _id: input.userId }, input)
		return !!user

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

		user.save()

		return tokenPayload

	}

	async updateUserRole (roleInput: RoleInput): Promise<boolean> {
		await User.findByIdAndUpdate(roleInput.userId, {
			$set: {
				[`roles.${ roleInput.app }.${ roleInput.value }`]: roleInput.value
			}
		})
		// clear accessToken
		await deleteCachedAccessToken(roleInput.userId)
		return true
	}
}