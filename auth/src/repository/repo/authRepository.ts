import { IAuthRepository } from '../../application/contracts/repository'
import { AuthOutput, Credential, TokenInput, Tokens, UserModel, PasswordResetInput, PasswordUpdateInput, UserPhoto } from '../../application/domain'
import { UserEntity } from '../entities/user.entity'
import { UserMapper } from '../mapper/user.mapper'
import {
	deleteCachedAccessToken,
	deleteCachedRefreshToken,
	exchangeOldForNewTokens,
	verifyRefreshToken,
	getCacheInstance,
	readEmailFromPug,
	EventTypes,
	Emails,
	InvalidToken,
	ValidationError,
	getEnvOrFail
} from '@utils/commons'
import { UserRepository } from './userRepository'
import * as bcrypt from 'bcrypt'
import * as crypto from 'crypto'
import { publishers } from '@utils/events'
import { OAuth2Client } from 'google-auth-library'



const MINUTE_IN_SECS = 60 * 5

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

	async authenticateUser (details: Credential,passwordValidate: boolean): Promise<TokenInput> {

           
		const user = await User.find({email: details.email})

		if (user) {

			let match = true
			
			if (passwordValidate) {

			    match = await bcrypt.compare(details.password, user.password)
			 }


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

			const user = await repository.userDetails(userData.id,'id')

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

	async sendVerificationMail (email: string): Promise<boolean> {

		 const token = crypto.randomBytes(40).toString('hex')

		 // save to cache
		 await getCacheInstance.set(token,email,MINUTE_IN_SECS)

		 // send verification mail
		const emailContent = await readEmailFromPug('../emails/email-verification.pug', {
			message: `An account was recently created on Stranerd with your email address. If it wasn't you,
			kindly ignore this email and the account will be deleted after 3 days.
			|
			|
			|
			a(href='https://stranerd.com/emails/verify?token=${ token }') Click here to continue verification
			`
		})

		await publishers[EventTypes.SENDMAIL].publish({
			to: email,
			subject: 'Verify Your Email',
			from: Emails.NO_REPLY,
			content: emailContent
		})

		return true

	}

	async verifyEmail (token: string): Promise<TokenInput> {

		// check token in cache

		const userEmail = await getCacheInstance.get(token)

		if(userEmail) {
           
			const user = await User.find({ email: userEmail })

		 if (user) {

			 user.isVerified = true

			 const tokenPayload: TokenInput = {
				 id: user._id,
				 roles: user.roles,
				 isVerified: user.isVerified,
				 authTypes: user.authTypes
			 }
            
			 return tokenPayload
	        
			}
		}else {

			throw new InvalidToken()
		}

		return Promise.reject()

	}

	async sendPasswordResetMail (email: string): Promise<boolean> {

		const token = crypto.randomBytes(40).toString('hex')

		// save to cache
		await getCacheInstance.set(token,email,MINUTE_IN_SECS)

		// send reset password mail
	   const emailContent = await readEmailFromPug('../emails/email-reset.pug', {
		   message: `A password reset was recently requested from your account. If it wasn't you,
		   kindly ignore this email.
		   |
		   |
		   |
		   a(href='https://stranerd.com/passwords/reset?token=${ token }') Click here to reset your password
		   `
	   })

	   await publishers[EventTypes.SENDMAIL].publish({
		   to: email,
		   subject: 'Reset Your Password',
		   from: Emails.NO_REPLY,
		   content: emailContent
	   })

	   return true


	}

	async resetPassword (input: PasswordResetInput): Promise<TokenInput> {

		// check token in cache

		const userEmail = await getCacheInstance.get(input.token)

		if(userEmail) {
           
			const user = await User.find({ email: userEmail })

		 if (user) {

			 const userDataToUpdate: UserModel = {
			   email: user.email,
			   authTypes: user.authTypes,
			   firstName: user.firstName,
			   lastName: user.lastName,
			   isVerified: user.isVerified,
			   roles: user.roles,
			   password: input.password,
			   photo: user.photo,
			   signedUpAt: user.signedUpAt
			 }
           
			 const data: UserEntity = this.userMapper.mapFrom(userDataToUpdate)

		    const userData = await new User(data).save()


			 const tokenPayload: TokenInput = {
				 id: userData._id,
				 roles: userData.roles,
				 isVerified: userData.isVerified,
				 authTypes: userData.authTypes
			 }
            
			 return tokenPayload
	        
			}
		}else {

			throw new InvalidToken()
		}

		return Promise.reject()


	}


	async updatePassword (input: PasswordUpdateInput): Promise<boolean> {

		const user = await User.find({_id: input.userId})

		if (user) {

			const match = await bcrypt.compare(input.oldPassword, user.password)

			 if(match) {

				const userDataToUpdate: UserModel = {
					email: user.email,
					authTypes: user.authTypes,
					firstName: user.firstName,
					lastName: user.lastName,
					isVerified: user.isVerified,
					roles: user.roles,
					password: input.password,
					photo: user.photo,
					signedUpAt: user.signedUpAt
				  }
				
				  const data: UserEntity = this.userMapper.mapFrom(userDataToUpdate)
	 
				  await new User(data).save()

				  return true
				
			 }

			 throw new ValidationError([{messages:['old password does not match'],field:'oldPassword'}])

		}

		return Promise.reject()

	}

	async googleSignIn (tokenId: string): Promise<TokenInput> {

		 const CLIENT_ID = getEnvOrFail('GOOGLE_CLIENTID')

		const client = new OAuth2Client(CLIENT_ID)
          
		const ticket = await client.verifyIdToken({
			idToken: tokenId,
			audience: CLIENT_ID
		})

		const user = ticket.getPayload()
		const fullName = user?.name
		
		let firstName = ''
		let lastName = ''
           
		if(fullName && user.email) {
		   const nameToArray = fullName.split(' ')
		   firstName = nameToArray[0]
		   lastName = nameToArray[1]

		   const userRoles = {
			 stranerd: {
				 isAdmin: false,
				 isModerator: false
			 },
			 tutorStack: {
				 isAdmin: false,
				 isModerator: false
			 },
			 brainBox: {
				 isAdmin: false,
				 isModerator: false
			 }
		 }

		 const userPhoto: UserPhoto = {
			 link: user.picture,
			 name: '',
			 path: '',
			 type: ''
		 }
		

		 const userDataToUse: UserModel = {
			 email: user.email,
			 authTypes: ['google'],
			 firstName,
			 lastName,
			 isVerified: true,
			 roles: userRoles,
			 password: undefined,
			 photo:userPhoto,
			 signedUpAt: new Date().getTime()
		 }

		   const userData = await User.find({ email: user.email })

		   let tokenInput: TokenInput

		   if (userData) {

			 const authTypeExist = userData.authTypes.indexOf('google') > -1

			 if (!authTypeExist) {
				 userData.authTypes.push('google')
			 }

			 const credentials: Credential = {
				 email: userData.email,
				 password: ''
			 }

			 tokenInput = await this.authenticateUser(credentials,false)

		   }else {

			 tokenInput = await this.addNewUser(userDataToUse)
		   }

		 return tokenInput

		}

		return Promise.reject()
	}

}