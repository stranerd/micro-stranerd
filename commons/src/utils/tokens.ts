import jwt from 'jsonwebtoken'
import { accessTokenKey, refreshTokenKey } from '../config'
import { AccessTokenExpired, NotAuthenticatedError, RefreshTokenMisusedError } from '../errors'
import { AuthUser, RefreshUser } from './authUser'
import { getCacheInstance } from '../cache/'

const MINUTE = 60
const DAYS14 = 14 * 24 * 60 * 60

const getAccessTokenKey = (userId: string) => `${ userId }-access-token`
const getRefreshTokenKey = (userId: string) => `${ userId }-refresh-token`

export const makeAccessToken = async (payload: AuthUser) => {
	const token = jwt.sign(payload, accessTokenKey, { expiresIn: MINUTE })
	await getCacheInstance.set(getAccessTokenKey(payload.id), token, MINUTE)
	return token
}
export const makeRefreshToken = async (payload: RefreshUser) => {
	const token = jwt.sign(payload, refreshTokenKey, { expiresIn: DAYS14 })
	await getCacheInstance.set(getRefreshTokenKey(payload.id), token, DAYS14)
	return token
}

export const verifyAccessToken = async (token: string) => {
	try {
		const user = jwt.verify(token, accessTokenKey) as AuthUser
		const cachedToken = await getCachedAccessToken(user.id)
		// Cached access token was deleted, eg by user roles being modified, so token needs to be treated as expired
		if (token !== cachedToken) throw new AccessTokenExpired()
		return user
	} catch (err) {
		if (err instanceof AccessTokenExpired) throw err
		if (err instanceof jwt.TokenExpiredError) throw new AccessTokenExpired()
		else throw new NotAuthenticatedError()
	}
}

export const verifyRefreshToken = async (token: string) => {
	try {
		return jwt.verify(token, refreshTokenKey) as RefreshUser
	} catch (err) {
		throw new NotAuthenticatedError()
	}
}

export const getCachedAccessToken = async (userId: string) => getCacheInstance.get(getAccessTokenKey(userId))
export const getCachedRefreshToken = async (userId: string) => getCacheInstance.get(getRefreshTokenKey(userId))
export const deleteCachedAccessToken = async (userId: string) => getCacheInstance.delete(getAccessTokenKey(userId))
export const deleteCachedRefreshToken = async (userId: string) => getCacheInstance.delete(getRefreshTokenKey(userId))

type Tokens = {
	accessToken: string
	refreshToken: string
}

export const exchangeOldForNewTokens = async (
	{ accessToken, refreshToken }: Tokens,
	getAuthUser: (id: string) => Promise<AuthUser>
): Promise<Tokens> => {
	let authUser = await verifyAccessToken(accessToken).catch((err) => {
		if (err instanceof AccessTokenExpired) return null
		else throw err
	})

	// If auth token is not expired, return it and the refresh token
	if (authUser) return { accessToken, refreshToken }

	const refreshUser = await verifyRefreshToken(refreshToken)
	const cachedRefreshToken = await getCachedRefreshToken(refreshUser.id)

	// If no cached value, means someone used your old token for a second time, so current one got deleted from cache
	if (!cachedRefreshToken) throw new NotAuthenticatedError()

	// If cached value is not equal, means someone is trying to use an old token for a second time
	if (refreshToken !== cachedRefreshToken) {
		await deleteCachedRefreshToken(refreshUser.id)
		throw new RefreshTokenMisusedError()
	}

	// Use refresh id to call cb passed in to get the user auth details
	authUser = await getAuthUser(refreshUser.id)

	return {
		accessToken: await makeAccessToken(authUser),
		refreshToken: await makeRefreshToken(refreshUser),
	}
}