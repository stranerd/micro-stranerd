import { IAuthRepository } from '../../application/contracts/repository'
import { AuthOutput, Credential, TokenInput, Tokens, UserModel } from '../../application/domain'
import { UserEntity } from '../entities/user.entity'
import { UserMapper } from '../mapper/user.mapper'
import {
	deleteCachedAccessToken,
	deleteCachedRefreshToken,
	exchangeOldForNewTokens,
	verifyRefreshToken
} from '@utils/commons'
import { UserRepository } from './userRepository'
import * as bcrypt from 'bcrypt'


const { User } = require('./mongoose-model/user.model')

export class AuthRepository implements IAuthRepository {

	private static instance: AuthRepository
	private userMapper: UserMapper

	constructor () {
		this.userMapper = new UserMapper()
	}

	static getInstance (): AuthRepository {
		if (!AuthRepository.instance) {
			AuthRepository.instance = new AuthRepository()
		}

		return AuthRepository.instance
	}

	async addNewUser (user: UserModel): Promise<TokenInput> {
		const data: UserEntity = this.userMapper.mapFrom(user)
		const userData = await new User(data).save()

		if (userData) {

			const tokenPayload: TokenInput = {
				id: userData._id,
				roles: userData.roles,
				isVerified: userData.isVerified,
				authTypes: userData.authTypes
			}

			// update user lastSignIn

			userData.lastSignedInAt = new Date().getTime()

			return tokenPayload

		}

		return Promise.reject()
	}

	async authenticateUser (details: Credential): Promise<TokenInput> {

           
		const user = await User.find({email: details.email})

		if (user) {

			const match = await bcrypt.compare(details.password, user.password)

			 if(match) {
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

	async userTokenData (id: string): Promise<TokenInput> {
		const user = await User.find({ _id: id })

		if (user) {

			const tokenPayload: TokenInput = {
				id: user._id,
				roles: user.roles,
				isVerified: user.isVerified,
				authTypes: user.authTypes
			}

			return tokenPayload

		}

		return Promise.reject()
	}

	async GetRefreshToken (tokens: Tokens): Promise<AuthOutput> {

		const newTokens = await exchangeOldForNewTokens(tokens, this.userTokenData)

		const userData = await verifyRefreshToken(tokens.refreshToken)

		if (newTokens) {

			const repository = UserRepository.getInstance()

			const user = await repository.userDetails(userData.id)

			const result = {
				accessToken: newTokens.accessToken,
				refreshToken: newTokens.refreshToken,
				user
			}

			return result

		}

		return Promise.reject()
	}

	async clearUserAuthCache (userId: string): Promise<boolean> {

		await deleteCachedAccessToken(userId)
		await deleteCachedRefreshToken(userId)

		return true

	}

}