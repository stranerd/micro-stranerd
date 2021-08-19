import { Mapper } from '../../application/base'
import { RefreshTokenModel } from '../../application/domain'
import { RefreshTokenEntity } from '../entities/refresh-token.entity'

export class RefreshTokenMapper extends Mapper<RefreshTokenModel, RefreshTokenEntity> {
	mapFrom(param: RefreshTokenModel): RefreshTokenEntity {
		return {
			_id: null,
			user: param.user,
			token: param.token,
			expires: param.expires,
			created: param.created,
			revoked: param.revoked,
			replacedByToken: param.replacedByToken,
		}
	}    
    
	mapTo(param: RefreshTokenEntity): RefreshTokenModel {
		return {
			_id: param._id,
			user: param.user,
			token: param.token,
			expires: param.expires,
			created: param.created,
			revoked: param.revoked,
			replacedByToken: param.replacedByToken,
			isActive: true
		}
	}
}