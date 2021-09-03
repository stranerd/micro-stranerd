import { generateChangeStreams, mongoose } from '@utils/commons'
import { SessionEntity } from '@modules/sessions'
import { SessionFromModel } from '../models/session'
import { SessionChangeStreamCallbacks } from '@utils/changeStreams/sessions/session'
import { SessionMapper } from '../mappers/session'

const Schema = new mongoose.Schema<SessionFromModel>({
	message: {
		type: String,
		required: true
	},
	studentId: {
		type: String,
		required: true
	},
	studentBio: {
		type: Object,
		required: true
	},
	tutorId: {
		type: String,
		required: true
	},
	tutorBio: {
		type: Object,
		required: true
	},
	duration: {
		type: Number,
		required: true
	},
	accepted: {
		type: Boolean,
		required: true
	},
	done: {
		type: Boolean,
		required: true
	},
	price: {
		type: Number,
		required: true
	},
	cancelled: {
		type: Object,
		required: true
	},
	reviews: {
		type: Object,
		required: true
	},
	endedAt: {
		type: Number,
		required: false,
	},
	createdAt: {
		type: Number,
		required: false,
		default: Date.now
	}
}, { timestamps: { currentTime: Date.now } })


export const Session = mongoose.model<SessionFromModel>('StranerdSession', Schema)

generateChangeStreams<SessionFromModel, SessionEntity>(Session, SessionChangeStreamCallbacks, new SessionMapper().mapFrom).then()


