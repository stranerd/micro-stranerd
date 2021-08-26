import { IAuthRepository } from '../../contracts/repository'
import { AuthOutput, Credential, PasswordResetInput, PasswordUpdateInput, TokenInput, Tokens } from '../../domain'
import * as bcrypt from 'bcrypt'
import * as crypto from 'crypto'
import { publishers } from '@utils/events'
import { OAuth2Client } from 'google-auth-library'
import User from '../mongoose-model/user.model'
import { domain, googleClientId } from '@utils/environment'
import { UserFromModel, UserToModel } from '../models'
import { hash, hashCompare } from '@utils/hash'
import {
	AuthTypes,
	BadRequestError,
	deleteCachedAccessToken,
	deleteCachedRefreshToken,
	Emails,
	EventTypes,
	exchangeOldForNewTokens,
	getCacheInstance,
	InvalidToken,
	MediaOutput,
	mongoose,
	readEmailFromPug,
	ValidationError
} from '@utils/commons'

const FIVE_MINUTE_IN_SECS = 60 * 5

export class AuthRepository implements IAuthRepository {

	private static instance: AuthRepository

	static getInstance (): AuthRepository {
		if (!AuthRepository.instance) AuthRepository.instance = new AuthRepository()
		return AuthRepository.instance
	}

	private static async signInUser (user: UserFromModel & mongoose.Document<any, any, UserFromModel>, type: AuthTypes): Promise<TokenInput> {
		const userUpdated = await User.findByIdAndUpdate(user._id, {
			$currentDate: { lastSignedInAt: { $type: 'timestamp' } },
			$addToSet: { authTypes: [type] }
		}, { new: true })

		return {
			id: userUpdated._id,
			roles: userUpdated.roles,
			isVerified: userUpdated.isVerified,
			authTypes: userUpdated.authTypes
		}
	}

	async addNewUser (data: UserToModel, type: AuthTypes): Promise<TokenInput> {
		data.email = data.email.toLowerCase()
		if (data.password) data.password = await hash(data.password)
		const userData = await new User(data).save()
		return AuthRepository.signInUser(userData, type)
	}

	async authenticateUser (details: Credential, passwordValidate: boolean, type: AuthTypes): Promise<TokenInput> {
		details.email = details.email.toLowerCase()
		const user = await User.findOne({ email: details.email })
		if (!user) throw new ValidationError([
			{ field: 'email', messages: ['No account with such email exists'] }
		])

		const match = passwordValidate ? await hashCompare(details.password, user.password) : true
		if (!match) throw new ValidationError([
			{ field: 'password', messages: ['Invalid credentials'] }
		])

		return AuthRepository.signInUser(user, type)

	}

	async userTokenData (id: string): Promise<TokenInput> {
		const user = await User.findOne({ _id: id })
		if (!user) throw new BadRequestError('No account with such id exists')

		const tokenPayload: TokenInput = {
			id: user._id,
			roles: user.roles,
			isVerified: user.isVerified,
			authTypes: user.authTypes
		}

		return tokenPayload
	}

	async GetRefreshToken (tokens: Tokens): Promise<AuthOutput> {
		const { accessToken, refreshToken } = await exchangeOldForNewTokens(tokens, this.userTokenData)
		return { accessToken, refreshToken }
	}

	async clearUserAuthCache (userId: string): Promise<boolean> {
		await deleteCachedAccessToken(userId)
		await deleteCachedRefreshToken(userId)
		return true
	}

	async sendVerificationMail (email: string): Promise<boolean> {
		email = email.toLowerCase()
		const user = await User.findOne({ email })
		if (!user) throw new ValidationError([{ field: 'email', messages: ['No account with such email exists'] }])

		const token = crypto.randomBytes(40).toString('hex')

		// save to cache
		await getCacheInstance.set('verification-token-' + token, email, FIVE_MINUTE_IN_SECS)

		// send verification mail
		const emailContent = await readEmailFromPug('src/emails/email-verification.pug', { domain, token })

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
		const userEmail = await getCacheInstance.get('verification-token-' + token)
		if (!userEmail) throw new InvalidToken()

		const user = await User.findOne({ email: userEmail })
		if (!user) throw new BadRequestError('No account with saved email exists')

		user.isVerified = true
		await user.save()

		const tokenPayload: TokenInput = {
			id: user._id,
			roles: user.roles,
			isVerified: user.isVerified,
			authTypes: user.authTypes
		}

		return tokenPayload
	}

	async sendPasswordResetMail (email: string): Promise<boolean> {
		email = email.toLowerCase()
		const user = await User.findOne({ email })
		if (!user) throw new ValidationError([{ field: 'email', messages: ['No account with such email exists'] }])

		const token = crypto.randomBytes(40).toString('hex')

		// save to cache
		await getCacheInstance.set('password-reset-token-' + token, email, FIVE_MINUTE_IN_SECS)

		// send reset password mail
		const emailContent = await readEmailFromPug('src/emails/email-reset.pug', { domain, token })

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
		const userEmail = await getCacheInstance.get('password-reset-token-' + input.token)
		if (!userEmail) throw new InvalidToken()

		const user = await User.findOne({ email: userEmail })
		if (!user) throw new BadRequestError('No account with saved email exists')

		user.password = await hash(input.password)
		await user.save()

		return {
			id: user._id!,
			roles: user.roles,
			isVerified: user.isVerified,
			authTypes: user.authTypes
		}
	}

	async updatePassword (input: PasswordUpdateInput): Promise<boolean> {
		const user = await User.findOne({ _id: input.userId })
		if (!user) throw new ValidationError([
			{ field: 'id', messages: ['No account with such id exists'] }
		])

		const match = await bcrypt.compare(input.oldPassword, user.password ?? '')
		if (!match) throw new ValidationError([{ messages: ['old password does not match'], field: 'oldPassword' }])

		user.password = await hash(input.password)
		await user.save()
		return true
	}

	async googleSignIn (tokenId: string): Promise<TokenInput> {

		const client = new OAuth2Client(googleClientId)

		const ticket = await client.verifyIdToken({
			idToken: tokenId,
			audience: googleClientId
		})

		const user = ticket.getPayload()
		if (!user) throw new InvalidToken()

		const [firstName = '', lastName = ''] = (user.name ?? '').split(' ')
		const email = user.email!.toLowerCase()

		const userPhoto: MediaOutput | null = user.picture ? {
			link: user.picture
		} as unknown as MediaOutput : null

		const userData = await User.findOne({ email })

		if (!userData) {
			const userData = {
				email,
				authTypes: [AuthTypes.google],
				firstName,
				lastName,
				isVerified: true,
				roles: {},
				password: '',
				photo: userPhoto,
				signedUpAt: new Date().getTime(),
				lastSignedInAt: new Date().getTime()
			}
			return await this.addNewUser(userData, AuthTypes.google)
		}

		const credentials: Credential = {
			email: userData.email,
			password: ''
		}
		return await this.authenticateUser(credentials, false, AuthTypes.google)
	}
}