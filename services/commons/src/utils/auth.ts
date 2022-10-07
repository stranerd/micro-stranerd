import axios from 'axios'
import jwt from 'jsonwebtoken'
import jwksClient from 'jwks-rsa'

export const signinWithGoogle = async (idToken: string) => {
	const authUrl = `https://oauth2.googleapis.com/tokeninfo?id_token=${idToken}`
	const { data } = await axios.get(authUrl).catch((err) => {
		const message = err?.response?.data?.error
		throw new Error(message ? 'Invalid id token' : 'Something unexpected happened')
	})
	data.first_name = data.given_name
	data.last_name = data.family_name
	return data as {
		email: string
		email_verified: 'true' | 'false'
		first_name: string
		last_name: string
		picture: string
		sub: string
	} & Record<string, any>
}

export const signinWithApple = async (idToken: string) => {
	try {
		const json = jwt.decode(idToken, { complete: true })
		const kid = json?.header?.kid
		if (!kid) throw new Error('')
		const key = await jwksClient({ jwksUri: 'https://appleid.apple.com/auth/keys' })
			.getSigningKey(kid).catch(() => null)
		const publicKey = key?.getPublicKey()
		if (!publicKey) throw new Error('')
		const data = jwt.verify(idToken, publicKey) as Record<string, any>
		if (!data) throw new Error('')
		if (data.iss !== 'https://appleid.apple.com') throw new Error('')
		if (data.exp * 1000 < Date.now()) throw new Error('expired idToken')
		// TODO: Find out how to get profile data from api
		return data as {
			email: string
			sub: string
			email_verified: 'true' | 'false'
		} & Record<string, any>
	} catch (err: any) {
		throw new Error(err.message || 'Invalid idToken')
	}
}

export const signinWithFacebook = async (accessToken: string, fields = [] as string[]) => {
	fields = [...new Set([...fields, 'name', 'picture', 'email'])]
	const { data } = await axios.request({
		method: 'get',
		url: 'https://graph.facebook.com/v15.0/me',
		params: {
			fields: fields.join(','),
			access_token: accessToken
		}
	}).catch((err) => {
		const message = err?.response?.data?.error?.message
		throw new Error(message ? 'Invalid access token' : 'Something unexpected happened')
	})
	const isValidData = fields.every((key) => key in data)
	if (!isValidData) throw new Error('Incomplete scope for access token')
	data.email_verified = 'true'
	return data as {
		id: string
		email: string
		email_verified: 'true' | 'false'
		name: string
		picture: {
			data: { height: number, is_silhouette: boolean, url: string, width: number }
		}
	} & Record<string, any>
}