import { generateChangeStreams, mongoose } from '@utils/app/package'
import { SchemeFromModel } from '../models/schemes'
import { SchemeEntity } from '../../domain/entities/schemes'
import { SchemeChangeStreamCallbacks } from '@utils/changeStreams/classes/schemes'
import { SchemeMapper } from '../mappers/schemes'
import { ClassUsers } from '../../domain/types'

const Schema = new mongoose.Schema<SchemeFromModel>({
	_id: {
		type: String,
		default: () => new mongoose.Types.ObjectId().toString()
	},
	title: {
		type: String,
		required: true
	},
	topic: {
		type: String,
		required: true
	},
	start: {
		type: Number,
		required: true
	},
	end: {
		type: Number,
		required: true
	},
	classId: {
		type: String,
		required: true
	},
	user: {
		type: mongoose.Schema.Types.Mixed as unknown as SchemeFromModel['user'],
		required: true
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

export const Scheme = mongoose.model<SchemeFromModel>('StranerdClassesScheme', Schema)

generateChangeStreams<SchemeFromModel, SchemeEntity>(Scheme, SchemeChangeStreamCallbacks, new SchemeMapper().mapFrom).then()