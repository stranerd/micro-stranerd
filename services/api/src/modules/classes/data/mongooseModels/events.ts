import { mongoose } from '@utils/app/package'
import { appInstance } from '@utils/app/types'
import { EventDbChangeCallbacks } from '@utils/changeStreams/classes/events'
import { EventEntity } from '../../domain/entities/events'
import { ClassUsers } from '../../domain/types'
import { EventMapper } from '../mappers/events'
import { EventFromModel } from '../models/events'

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

export const EventChange = appInstance.db
	.generateDbChange<EventFromModel, EventEntity>(Event, EventDbChangeCallbacks, new EventMapper().mapFrom)