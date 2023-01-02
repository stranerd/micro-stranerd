import { BaseMapper } from '@utils/app/package'
import { EmailErrorFromModel, EmailErrorToModel } from '../models/emailErrors'
import { EmailErrorEntity } from '../../domain/entities/emailErrors'

export class EmailErrorMapper extends BaseMapper<EmailErrorFromModel, EmailErrorToModel, EmailErrorEntity> {
	mapFrom (model: EmailErrorFromModel | null) {
		if (!model) return null
		const {
			_id, content, subject, to, from, error, data,
			createdAt, updatedAt
		} = model
		return new EmailErrorEntity({
			id: _id.toString(),
			content, subject, to, from, error, data,
			createdAt, updatedAt
		})
	}

	mapTo (entity: EmailErrorEntity) {
		return {
			content: entity.content,
			subject: entity.subject,
			to: entity.to,
			from: entity.from,
			error: entity.error,
			data: entity.data
		}
	}
}
