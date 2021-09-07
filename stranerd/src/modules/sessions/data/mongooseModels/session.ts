import { generateChangeStreams, mongoose } from '@utils/commons'
import { SessionEntity } from '../../domain/entities/session'
import { SessionFromModel } from '../models/session'
import { SessionChangeStreamCallbacks } from '@utils/changeStreams/sessions/session'
import { SessionMapper } from '../mappers/session'

const Schema = new mongoose.Schema<SessionFromModel>({
	message: {
		type: String,
		required: true
	},
	studentId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true
	},
	studentBio: {
		type: Object,
		required: true
	},
	tutorId: {
		type: mongoose.Schema.Types.ObjectId,
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
		required: false,
		default: null
	},
	done: {
		type: Boolean,
		required: false,
		default: false
	},
	price: {
		type: Number,
		required: true
	},
	taskId: {
		type: mongoose.Schema.Types.Mixed,
		required: false,
		default: null
	},
	cancelled: {
		student: {
			type: Boolean,
			required: false,
			default: false
		},
		tutor: {
			type: Boolean,
			required: false,
			default: false
		},
		busy: {
			type: Boolean,
			required: false,
			default: false
		}
	},
	startedAt: {
		type: Number,
		required: false,
		default: null
	},
	endedAt: {
		type: Number,
		required: false,
		default: null
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

export const Session = mongoose.model<SessionFromModel>('StranerdSession', Schema)

generateChangeStreams<SessionFromModel, SessionEntity>(Session, SessionChangeStreamCallbacks, new SessionMapper().mapFrom).then()