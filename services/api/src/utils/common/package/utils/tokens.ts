import jwt from 'jsonwebtoken'
import { AccessTokenExpired, CustomError, NotAuthenticatedError } from '../errors'
import { AuthUser, RefreshUser } from './authUser'
import { StatusCodes } from '../express'
import { Instance } from '../instance'

const getAccessTokenKey = (userId: string) => `${userId}-access-token`
const getRefreshTokenKey = (userId: string) => `${userId}-refresh-token`

export const makeAccessToken = async (payload: AuthUser) => {
	const token = jwt.sign(payload, Instance.getInstance().settings.accessTokenKey, { expiresIn: Instance.getInstance().settings.accessTokenTTL })
	await Instance.getInstance().cache.set(getAccessTokenKey(payload.id), token, Instance.getInstance().settings.accessTokenTTL)
	return token
}
export const makeRefreshToken = async (payload: RefreshUser) => {
	const token = jwt.sign(payload, Instance.getInstance().settings.refreshTokenKey, { expiresIn: Instance.getInstance().settings.refreshTokenTTL })
	await Instance.getInstance().cache.set(getRefreshTokenKey(payload.id), token, Instance.getInstance().settings.refreshTokenTTL)
	return token
}

export const verifyAccessToken = async (token: string) => {
	try {
		const user = jwt.verify(token, Instance.getInstance().settings.accessTokenKey) as AuthUser
		if (!user) throw new NotAuthenticatedError()
		const cachedToken = await getCachedAccessToken(user.id)
		// Cached access token was deleted, e.g. by user roles being modified, so token needs to be treated as expired
		if (token && token !== cachedToken) throw new AccessTokenExpired()
		return user
	} catch (err) {
		if (err instanceof AccessTokenExpired) throw err
		if (err instanceof jwt.TokenExpiredError) throw new AccessTokenExpired()
		else throw new NotAuthenticatedError()
	}
}

export const verifyRefreshToken = async (token: string) => {
	try {
		const user = jwt.verify(token, Instance.getInstance().settings.refreshTokenKey) as RefreshUser
		if (!user) throw new NotAuthenticatedError()
		return user
	} catch (err) {
		throw new NotAuthenticatedError()
	}
}

export const getCachedAccessToken = async (userId: string) => Instance.getInstance().cache.get(getAccessTokenKey(userId))
export const getCachedRefreshToken = async (userId: string) => Instance.getInstance().cache.get(getRefreshTokenKey(userId))
export const deleteCachedAccessToken = async (userId: string) => Instance.getInstance().cache.delete(getAccessTokenKey(userId))
export const deleteCachedRefreshToken = async (userId: string) => Instance.getInstance().cache.delete(getRefreshTokenKey(userId))

type Tokens = {
	accessToken: string
	refreshToken: string
}

export const exchangeOldForNewTokens = async (
	{ accessToken, refreshToken }: Tokens,
	makeTokens: (id: string) => Promise<Tokens>
): Promise<Tokens> => {
	const authUser = await verifyAccessToken(accessToken).catch((err) => {
		const error = err as CustomError
		if (error.statusCode === StatusCodes.AccessTokenExpired) return null
		else throw err
	})
	// If auth token is not expired, get the user id from it
	if (authUser) return await makeTokens(authUser.id)

	const refreshUser = await verifyRefreshToken(refreshToken)
	// const cachedRefreshToken = await getCachedRefreshToken(refreshUser.id)

	// If no cached value, means someone used your old token for a second time, so current one got deleted from cache
	// if (!cachedRefreshToken) throw new NotAuthenticatedError()

	// If cached value is not equal, means someone is trying to use an old token for a second time
	// if (refreshToken !== cachedRefreshToken) {
	// await deleteCachedAccessToken(refreshUser.id)
	// await deleteCachedRefreshToken(refreshUser.id)
	// throw new RefreshTokenMisusedError()
	// }

	return await makeTokens(refreshUser.id)
}