import { generateChangeStreams, mongoose } from '@utils/commons'
import { EventFromModel } from '../models/events'
import { EventEntity } from '../../domain/entities/events'
import { EventChangeStreamCallbacks } from '@utils/changeStreams/classes/events'
import { EventMapper } from '../mappers/events'
import { ClassUsers } from '../../domain/types'

const Schema = new mongoose.Schema<EventFromModel>({
	_id: {
		type: String,
		default: () => new mongoose.Types.ObjectId().toString()
	},
	title: {
		type: String,
		required: true
	},
	classId: {
		type: String,
		required: true
	},
	data: {
		type: mongoose.Schema.Types.Mixed as unknown as EventFromModel['data'],
		required: true
	},
	user: {
		type: mongoose.Schema.Types.Mixed as unknown as EventFromModel['user'],
		required: true
	},
	taskIds: {
		type: [String],
		required: false,
		default: []
	},
	users: Object.fromEntries(Object.keys(ClassUsers).map((key) => [key, {
		type: [String],
		required: false,
		default: []
	}])),
	readAt: {
		type: mongoose.Schema.Types.Mixed,
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
}, { timestamps: { currentTime: Date.now }, minimize: false })

export const Event = mongoose.model<EventFromModel>('StranerdClassesEvent', Schema)

generateChangeStreams<EventFromModel, EventEntity>(Event, EventChangeStreamCallbacks, new EventMapper().mapFrom).then()