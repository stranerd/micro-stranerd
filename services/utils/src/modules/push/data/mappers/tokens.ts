import { BaseMapper } from '@utils/commons'
import { TokenFromModel, TokenToModel } from '../models/tokens'
import { TokenEntity } from '../../domain/entities/tokens'

export class TokenMapper extends BaseMapper<TokenFromModel, TokenToModel, TokenEntity> {
	mapFrom (model: TokenFromModel | null) {
		if (!model) return null
		const {
			_id, tokens, userId, app, createdAt, updatedAt
		} = model
		return new TokenEntity({
			id: _id.toString(),
			app, userId, tokens, createdAt, updatedAt
		})
	}

	mapTo (entity: TokenEntity) {
		return {
			app: entity.app,
			userId: entity.userId
		}
	}
}
