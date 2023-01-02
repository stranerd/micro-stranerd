import { generateChangeStreams, mongoose } from '@utils/app/package'
import { EmailErrorFromModel } from '../models/emailErrors'
import { EmailErrorChangeStreamCallbacks } from '@utils/changeStreams/feedback/emailErrors'
import { EmailErrorEntity } from '../../domain/entities/emailErrors'
import { EmailErrorMapper } from '../mappers/emailErrors'

const Schema = new mongoose.Schema<EmailErrorFromModel>({
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
	data: {
		type: mongoose.Schema.Types.Mixed as unknown as EmailErrorFromModel['data'],
		required: false,
		default: {} as unknown as EmailErrorFromModel['data']
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

export const EmailError = mongoose.model<EmailErrorFromModel>('StranerdFeedbackEmailError', Schema)

generateChangeStreams<EmailErrorFromModel, EmailErrorEntity>(EmailError, EmailErrorChangeStreamCallbacks, new EmailErrorMapper().mapFrom).then()