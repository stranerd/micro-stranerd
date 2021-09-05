import { BaseMapper } from '@utils/commons'
import { ErrorFromModel, ErrorToModel } from '../models/errors'
import { ErrorEntity } from '../../domain/entities/errors'

export class ErrorMapper extends BaseMapper<ErrorFromModel, ErrorToModel, ErrorEntity> {
	mapFrom (model) {
		if (!model) return null
		const {
			_id, content, subject, to, from, error, attachments,
			createdAt, updatedAt
		} = model
		return new ErrorEntity({
			id: _id.toString(),
			content, subject, to, from, error, attachments,
			createdAt, updatedAt
		})
	}

	mapTo (entity) {
		return {
			content: entity.content,
			subject: entity.subject,
			to: entity.to,
			from: entity.from,
			error: entity.error,
			attachments: entity.attachments
		}
	}
}
