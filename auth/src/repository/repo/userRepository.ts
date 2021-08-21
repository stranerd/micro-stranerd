import { IUserRepository } from '../../application/contracts/repository'
import { RoleInput, UserModel } from '../../application/domain'
import { UserMapper } from '../mapper/user.mapper'
import {
	deleteCachedAccessToken
} from '@utils/commons'


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



	async userDetails (userId: string): Promise<UserModel> {
		const user = await User.find({ _id: userId })

		if (user) {

			const result = this.userMapper.mapTo(user)

			return result

		}

		return Promise.reject()
	}

	async updateUserRole (roleInput: RoleInput): Promise<boolean> {

		const user = await User.find({ _id: roleInput.userId })

		if (user) {

			const userRoles = {
				stranerd: {
					isAdmin: roleInput.app == 'stranerd' && roleInput.value && roleInput.role == 'isAdmin',
					isModerator: roleInput.app == 'stranerd' && roleInput.value && roleInput.role == 'isModerator'
				},
				tutorStack: {
					isAdmin: roleInput.app == 'tutorStack' && roleInput.value && roleInput.role == 'isAdmin',
					isModerator: roleInput.app == 'tutorStack' && roleInput.value && roleInput.role == 'isModerator'
				},
				brainBox: {
					isAdmin: roleInput.app == 'brainBox' && roleInput.value && roleInput.role == 'isAdmin',
					isModerator: roleInput.app == 'brainBox' && roleInput.value && roleInput.role == 'isModerator'
				}
			}

			user.roles = userRoles

			// clear accessToken
			await deleteCachedAccessToken(roleInput.userId)

			return true
		}

		return Promise.reject(false)
	}


}