import { BaseMapper } from '@utils/app/package'
import { PhoneErrorFromModel, PhoneErrorToModel } from '../models/phoneErrors'
import { PhoneErrorEntity } from '../../domain/entities/phoneErrors'

export class PhoneErrorMapper extends BaseMapper<PhoneErrorFromModel, PhoneErrorToModel, PhoneErrorEntity> {
	mapFrom (model: PhoneErrorFromModel | null) {
		if (!model) return null
		const {
			_id, content, subject, to, from, error,
			createdAt, updatedAt
		} = model
		return new PhoneErrorEntity({
			id: _id.toString(),
			content, subject, to, from, error,
			createdAt, updatedAt
		})
	}

	mapTo (entity: PhoneErrorEntity) {
		return {
			content: entity.content,
			subject: entity.subject,
			to: entity.to,
			from: entity.from,
			error: entity.error
		}
	}
}
