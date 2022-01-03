import { generateChangeStreams, mongoose } from '@utils/commons'
import { SessionEntity } from '../../domain/entities/session'
import { SessionFromModel } from '../models/session'
import { SessionChangeStreamCallbacks } from '@utils/changeStreams/sessions/session'
import { SessionMapper } from '../mappers/session'

const Schema = new mongoose.Schema<SessionFromModel>({
	_id: {
		type: String,
		default: () => new mongoose.Types.ObjectId().toString()
	},
	message: {
		type: String,
		required: true
	},
	studentId: {
		type: String,
		required: true
	},
	studentBio: {
		type: mongoose.Schema.Types.Mixed as unknown as SessionFromModel['studentBio'],
		required: true
	},
	tutorId: {
		type: String,
		required: true
	},
	tutorBio: {
		type: mongoose.Schema.Types.Mixed as unknown as SessionFromModel['tutorBio'],
		required: true
	},
	duration: {
		type: Number,
		required: true
	},
	// @ts-ignore
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
	taskIds: {
		type: [mongoose.Schema.Types.Mixed],
		required: false,
		default: []
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
		}
	},
	startedAt: {
		type: Number,
		required: false,
		default: null as unknown as number
	},
	endedAt: {
		type: Number,
		required: false,
		default: null as unknown as number
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

export const Session = mongoose.model<SessionFromModel>('StranerdSession', Schema)

generateChangeStreams<SessionFromModel, SessionEntity>(Session, SessionChangeStreamCallbacks, new SessionMapper().mapFrom).then()