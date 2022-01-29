import jwt from 'jsonwebtoken'
import { accessTokenKey, refreshTokenKey } from '../config'
import { AccessTokenExpired, CustomError, NotAuthenticatedError } from '../errors'
import { AuthUser, RefreshUser } from './authUser'
import { getCacheInstance } from '../cache/'
import { StatusCodes } from '../express'

const ACCESS_TOKEN_TTL = 30 * 60
const REFRESH_TOKEN_TTL = 14 * 24 * 60 * 60

const getAccessTokenKey = (userId: string) => `${userId}-access-token`
const getRefreshTokenKey = (userId: string) => `${userId}-refresh-token`

export const makeAccessToken = async (payload: AuthUser) => {
	const token = jwt.sign(payload, accessTokenKey, { expiresIn: ACCESS_TOKEN_TTL })
	await getCacheInstance.set(getAccessTokenKey(payload.id), token, ACCESS_TOKEN_TTL)
	return token
}
export const makeRefreshToken = async (payload: RefreshUser) => {
	const token = jwt.sign(payload, refreshTokenKey, { expiresIn: REFRESH_TOKEN_TTL })
	await getCacheInstance.set(getRefreshTokenKey(payload.id), token, REFRESH_TOKEN_TTL)
	return token
}

export const verifyAccessToken = async (token: string) => {
	try {
		const user = jwt.verify(token, accessTokenKey) as AuthUser
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
		const user = jwt.verify(token, refreshTokenKey) as RefreshUser
		if (!user) throw new NotAuthenticatedError()
		return user
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
		const error = err as CustomError
		if (error.statusCode === StatusCodes.AccessTokenExpired) return null
		else throw err
	})
	// If auth token is not expired, return it and the refresh token
	if (authUser) return { accessToken, refreshToken }

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

	// Use refresh id to call cb passed in to get the user auth details
	authUser = await getAuthUser(refreshUser.id)

	return {
		accessToken: await makeAccessToken({
			id: authUser.id,
			roles: authUser.roles,
			isVerified: authUser.isVerified,
			authTypes: authUser.authTypes
		}),
		refreshToken: await makeRefreshToken({
			id: refreshUser.id
		})
	}
}