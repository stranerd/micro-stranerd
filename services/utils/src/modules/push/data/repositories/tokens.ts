import { ITokenRepository } from '../../domain/irepositories/tokens'
import { TokenMapper } from '../mappers/tokens'
import { Token } from '../mongooseModels/tokens'
import { AuthApps } from '@utils/commons'

export class TokenRepository implements ITokenRepository {
	private static instance: TokenRepository
	private mapper: TokenMapper

	private constructor () {
		this.mapper = new TokenMapper()
	}

	static getInstance () {
		if (!TokenRepository.instance) TokenRepository.instance = new TokenRepository()
		return TokenRepository.instance
	}

	async updateTokens (userId: string, app: AuthApps, tokens: string[], add: boolean) {
		const token = await Token.findOneAndUpdate({ userId, app }, {
			$set: { userId, app },
			[add ? '$addToSet' : '$pull']: { 'token': { [add ? '$each' : '$in']: tokens } }
		}, { upsert: true })
		return this.mapper.mapFrom(token)!
	}

	async find (userId: string, app: AuthApps) {
		let token = await Token.findOne({ userId, app })
		if (!token) token = await Token.create({ userId, app })
		return this.mapper.mapFrom(token)!
	}

	async delete (userId: string) {
		const res = await Token.deleteMany({ userId })
		return res.acknowledged
	}
}