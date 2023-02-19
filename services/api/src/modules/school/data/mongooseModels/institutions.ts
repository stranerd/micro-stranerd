import { mongoose } from '@utils/app/package'
import { appInstance } from '@utils/app/types'
import { InstitutionDbChangeCallbacks } from '@utils/changeStreams/school/institutions'
import { InstitutionEntity } from '../../domain/entities/institutions'
import { InstitutionMapper } from '../mappers/institutions'
import { InstitutionFromModel } from '../models/institutions'

const Schema = new mongoose.Schema<InstitutionFromModel>({
	_id: {
		type: String,
		default: () => new mongoose.Types.ObjectId().toString()
	},
	name: {
		type: String,
		required: true
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
}, { timestamps: { currentTime: Date.now }, minimize: false })

export const Institution = mongoose.model<InstitutionFromModel>('StranerdSchoolInstitution', Schema)

export const InstitutionChange = appInstance.db
	.generateDbChange<InstitutionFromModel, InstitutionEntity>(Institution, InstitutionDbChangeCallbacks, new InstitutionMapper().mapFrom)