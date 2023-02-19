import { mongoose } from '@utils/app/package'
import { appInstance } from '@utils/app/types'
import { PhoneErrorDbChangeCallbacks } from '@utils/changeStreams/feedback/phoneErrors'
import { PhoneErrorEntity } from '../../domain/entities/phoneErrors'
import { PhoneErrorMapper } from '../mappers/phoneErrors'
import { PhoneErrorFromModel } from '../models/phoneErrors'

const Schema = new mongoose.Schema<PhoneErrorFromModel>({
	_id: {
		type: String,
		default: () => new mongoose.Types.ObjectId().toString()
	},
	error: {
		type: String,
		required: true
	},
	from: {
		type: String,
		required: true
	},
	to: {
		type: String,
		required: true
	},
	content: {
		type: String,
		required: true
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

export const PhoneError = mongoose.model<PhoneErrorFromModel>('StranerdFeedbackPhoneError', Schema)

export const PhoneErrorChange = appInstance.db
	.generateDbChange<PhoneErrorFromModel, PhoneErrorEntity>(PhoneError, PhoneErrorDbChangeCallbacks, new PhoneErrorMapper().mapFrom)