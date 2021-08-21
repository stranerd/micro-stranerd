import { IUserRepository } from '../../application/contracts/repository'
import { RoleInput, UserModel, SocialRegisterInput, TokenInput, UserUpdateInput } from '../../application/domain'
import { UserMapper } from '../mapper/user.mapper'
import { UserEntity } from '../entities/user.entity'
import {
	deleteCachedAccessToken, EventTypes
} from '@utils/commons'
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
			 user = await User.find({ _id: dataVal })
		}else if (dataType == 'id') {

			user = await User.find({ email: dataVal })
		}
		
		if (user) {

			const result = this.userMapper.mapTo(user)

			return result

		}

		return Promise.reject()
	}

   


	async userWithEmailExist (email: string,type: string): Promise<boolean> {
		const user = await User.find({ email })
         
		if (user) {
			
			const authTypeExist = user.authTypes.indexOf(type) > -1

			if (authTypeExist) {
				return true
			} else {
				user.authTypes.push(type)
				return false
			}

		}else{

			return false
		}
	}


	async updateUserProfile (input: UserUpdateInput): Promise<boolean> {

		const user = await User.find({ _id: input.userId })
         
		if (user) {
			

			if (user.photo) {
				
				if (user.photo.path != input.photo.path) {
					await publishers[EventTypes.DELETEFILE].publish(user.photo)

					user.photo = input.photo
				}
			   

			} else {

				user.photo = input.photo

			} 

		 user.firstName = input.firstName
		 user.lastName = input.lastName

		 return true

		}
		
		return Promise.reject()
	}


	async updateDetails (details: SocialRegisterInput): Promise<TokenInput> {

           
		const user = await User.find({email: details.email})

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
			   signedUpAt: user.signedUpAt
			}
           
			const data: UserEntity = this.userMapper.mapFrom(userDataToUpdate)

		    const userData = await new User(data).save()

			 if(userData) {
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