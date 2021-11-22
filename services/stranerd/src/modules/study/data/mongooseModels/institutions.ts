import { generateChangeStreams, mongoose } from '@utils/commons'
import { InstitutionFromModel } from '../models/institutions'
import { InstitutionChangeStreamCallbacks } from '@utils/changeStreams/study/institutions'
import { InstitutionEntity } from '../../domain/entities/institutions'
import { InstitutionMapper } from '../mappers/institutions'

const Schema = new mongoose.Schema<InstitutionFromModel>({
	_id: {
		type: String,
		default: () => new mongoose.Types.ObjectId() as unknown as string
	},
	name: {
		type: String,
		required: true
	},
	isSchool: {
		type: Boolean,
		required: false,
		default: false
	},
	isGateway: {
		type: Boolean,
		required: false,
		default: false
	},
	createdAt: {
		type: Number,
		required: false,
		default: Date.now
	},
	updatedAt: {
		type: Number,
		required: false,
		default: Date.now
	}
}, { timestamps: { currentTime: Date.now } })

export const Institution = mongoose.model<InstitutionFromModel>('StranerdInstitution', Schema)

generateChangeStreams<InstitutionFromModel, InstitutionEntity>(Institution, InstitutionChangeStreamCallbacks, new InstitutionMapper().mapFrom).then()