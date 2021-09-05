import { generateChangeStreams, mongoose } from '@utils/commons'
import { ErrorFromModel } from '../models/errors'
import { ErrorChangeStreamCallbacks } from '@utils/changeStreams/errors'
import { ErrorEntity } from '../../domain/entities/errors'
import { ErrorMapper } from '../mappers/errors'

const Schema = new mongoose.Schema<ErrorFromModel>({
	error: {
		type: String,
		required: true
	},
	subject: {
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
	attachments: {
		type: Object,
		required: false,
		default: {}
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

export const Error = mongoose.model<ErrorFromModel>('EmailsError', Schema)

generateChangeStreams<ErrorFromModel, ErrorEntity>(Error, ErrorChangeStreamCallbacks, new ErrorMapper().mapFrom).then()