import {
	BadRequestError,
	deleteCachedAccessToken,
	deleteCachedRefreshToken,
	exchangeOldForNewTokens,
	makeAccessToken,
	makeRefreshToken
} from '@utils/commons'
import { AuthOutput, TokenInput } from '@modules/domain/types'
import { FindUser } from '@modules/index'

export const signOutUser = async (userId: string): Promise<boolean> => {
	await deleteCachedAccessToken(userId)
	await deleteCachedRefreshToken(userId)
	return true
}

export const generateAuthOutput = async (TokenPayload: TokenInput): Promise<AuthOutput> => {
	const accessToken = await makeAccessToken(TokenPayload)
	const refreshToken = await makeRefreshToken({ id: TokenPayload.id })
	return { accessToken, refreshToken }
}

export const getNewTokens = async (tokens: AuthOutput): Promise<AuthOutput> => {
	return await exchangeOldForNewTokens(tokens, async (id: string): Promise<TokenInput> => {
		const user = await FindUser.execute(id)
		if (!user) throw new BadRequestError('No account with such id exists')

		return {
			id: user.id,
			roles: user.roles,
			isVerified: user.isVerified,
			authTypes: user.authTypes
		}
	})
}