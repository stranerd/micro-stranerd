import jwt from 'jsonwebtoken'
import { accessTokenKey, refreshTokenKey } from '../config'
import { AccessTokenExpired, NotAuthenticatedError } from '../errors'
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
		return jwt.verify(token, accessTokenKey) as AuthUser
	} catch (err) {
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