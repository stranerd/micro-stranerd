import { IAuthRepository } from '../../domain/i-repositories/auth'
import { Credential, PasswordResetInput, TokenInput } from '../../domain/types'
import { publishers } from '@utils/events'
import { OAuth2Client } from 'google-auth-library'
import User from '../mongooseModels/users'
import { clientDomain, googleClientId } from '@utils/environment'
import { UserFromModel, UserToModel } from '../models/users'
import { hash, hashCompare } from '@utils/hash'
import {
	AuthTypes,
	BadRequestError,
	Emails,
	EventTypes,
	getCacheInstance,
	getRandomValue,
	InvalidToken,
	MediaOutput,
	mongoose,
	readEmailFromPug,
	ValidationError
} from '@utils/commons'

const FIVE_MINUTE_IN_SECS = 60 * 5

export class AuthRepository implements IAuthRepository {

	private static instance: AuthRepository

	static getInstance () {
		if (!AuthRepository.instance) AuthRepository.instance = new AuthRepository()
		return AuthRepository.instance
	}

	private static async signInUser (user: UserFromModel & mongoose.Document<any, any, UserFromModel>, type: AuthTypes): Promise<TokenInput> {
		const userUpdated = await User.findByIdAndUpdate(user._id, {
			$set: { lastSignedInAt: Date.now() },
			$addToSet: { authTypes: [type] }
		}, { new: true })

		return {
			id: userUpdated!._id,
			roles: userUpdated!.roles,
			isVerified: userUpdated!.isVerified,
			authTypes: userUpdated!.authTypes
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

		return {
			id: user._id,
			roles: user.roles,
			isVerified: user.isVerified,
			authTypes: user.authTypes
		}
	}

	async sendVerificationMail (email: string): Promise<boolean> {
		email = email.toLowerCase()
		const token = getRandomValue()

		// save to cache
		await getCacheInstance.set('verification-token-' + token, email, FIVE_MINUTE_IN_SECS)

		// send verification mail
		const emailContent = await readEmailFromPug('emails/email-verification.pug', {
			meta: { clientDomain },
			token
		})

		await publishers[EventTypes.SENDMAIL].publish({
			to: email,
			subject: 'Verify Your Email',
			from: Emails.NO_REPLY,
			content: emailContent,
			attachments: {}
		})

		return true

	}

	async verifyEmail (token: string): Promise<TokenInput> {
		// check token in cache
		const userEmail = await getCacheInstance.get('verification-token-' + token)
		if (!userEmail) throw new InvalidToken()

		const user = await User.findOneAndUpdate({ email: userEmail }, { $set: { isVerified: true } }, { new: true })
		if (!user) throw new BadRequestError('No account with saved email exists')

		const tokenPayload: TokenInput = {
			id: user._id,
			roles: user.roles,
			isVerified: user.isVerified,
			authTypes: user.authTypes
		}

		return tokenPayload
	}

	async sendPasswordResetMail (email: string) {
		email = email.toLowerCase()
		const token = getRandomValue()

		// save to cache
		await getCacheInstance.set('password-reset-token-' + token, email, FIVE_MINUTE_IN_SECS)

		// send reset password mail
		const emailContent = await readEmailFromPug('emails/email-reset.pug', {
			meta: { clientDomain },
			token
		})

		await publishers[EventTypes.SENDMAIL].publish({
			to: email,
			subject: 'Reset Your Password',
			from: Emails.NO_REPLY,
			content: emailContent,
			attachments: {}
		})

		return true

	}

	async resetPassword (input: PasswordResetInput) {
		// check token in cache
		const userEmail = await getCacheInstance.get('password-reset-token-' + input.token)
		if (!userEmail) throw new InvalidToken()

		const user = await User.findOne({ email: userEmail }, { $set: { password: await hash(input.password) } }, { new: true })
		if (!user) throw new BadRequestError('No account with saved email exists')

		return {
			id: user._id,
			roles: user.roles,
			isVerified: user.isVerified,
			authTypes: user.authTypes
		}
	}

	async googleSignIn (tokenId: string, referrer: string | null): Promise<TokenInput> {
		const client = new OAuth2Client(googleClientId)

		const ticket = await client.verifyIdToken({
			idToken: tokenId,
			audience: googleClientId
		})

		const user = ticket.getPayload()
		if (!user) throw new InvalidToken()

		const [firstName = '', lastName = ''] = (user.name ?? '').split(' ')
		const email = user.email!.toLowerCase()

		const userPhoto = user.picture ? {
			link: user.picture
		} as unknown as MediaOutput : null

		const userData = await User.findOne({ email })

		if (!userData) {
			const userData = {
				email, referrer,
				authTypes: [AuthTypes.google],
				firstName,
				lastName,
				isVerified: true,
				roles: {},
				password: '',
				photo: userPhoto
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