import * as crypto from 'crypto'
import * as jwt from 'jsonwebtoken'
import { ITokenHandler } from '../../application/contracts/token/token'
import { RefreshTokenModel, TokenInput } from '../../application/domain'
import * as fs from 'fs'

const config = require('../../config.json')

// PRIVATE and PUBLIC key
const privateKEY = fs.readFileSync(config.token.private_key_path, 'utf8')

export class Token implements ITokenHandler {

	async generateJwtToken (payload: TokenInput): Promise<string> {

		const token = jwt.sign(payload, privateKEY, {
			expiresIn: config.token.access_token_lifetime,
			algorithm: config.token.algorithm
		})
		if (token) {

			return new Promise((resolve) => resolve(token))
		}
		return new Promise((resolve, reject) => reject())
	}

	public randomTokenString (): string {

		const randomToken = crypto.randomBytes(40).toString('hex')

		return randomToken
	}

	async MakeRefreshTokenModel (token: string, userId: string): Promise<RefreshTokenModel> {

		const tokenModel: RefreshTokenModel = {
			user: userId,
			token: token,
			expires: new Date(Date.now() + config.token.refresh_token_lifetime_in_days * 24 * 60 * 60 * 1000),
			created: new Date(Date.now()),
			isActive: true
		}

		return new Promise((resolve) => resolve(tokenModel))

	}

}