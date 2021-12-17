import { generateChangeStreams, mongoose } from '@utils/commons'
import { ErrorFromModel } from '../models/errors'
import { ErrorChangeStreamCallbacks } from '@utils/changeStreams/emails/errors'
import { ErrorEntity } from '../../domain/entities/errors'
import { ErrorMapper } from '../mappers/errors'

const Schema = new mongoose.Schema<ErrorFromModel>({
	_id: {
		type: String,
		default: () => new mongoose.Types.ObjectId().toString()
	},
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
		type: Object as unknown as ErrorFromModel['attachments'],
		required: false,
		default: {} as unknown as ErrorFromModel['attachments']
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

export const Error = mongoose.model<ErrorFromModel>('UtilsEmailError', Schema)

generateChangeStreams<ErrorFromModel, ErrorEntity>(Error, ErrorChangeStreamCallbacks, new ErrorMapper().mapFrom).then()