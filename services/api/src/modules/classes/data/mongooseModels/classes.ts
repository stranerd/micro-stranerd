import { mongoose } from '@utils/app/package'
import { appInstance } from '@utils/app/types'
import { ClassDbChangeCallbacks } from '@utils/changeStreams/classes/classes'
import { ClassEntity } from '../../domain/entities/classes'
import { ClassUsers } from '../../domain/types'
import { ClassMapper } from '../mappers/classes'
import { ClassFromModel } from '../models/classes'

const Schema = new mongoose.Schema<ClassFromModel>({
	_id: {
		type: String,
		default: () => new mongoose.Types.ObjectId().toString()
	},
	user: {
		type: mongoose.Schema.Types.Mixed as unknown as ClassFromModel['user'],
		required: true
	},
	name: {
		type: String,
		required: true
	},
	school: {
		type: mongoose.Schema.Types.Mixed as unknown as ClassFromModel['school'],
		required: true,
		default: {} as any
	},
	description: {
		type: String,
		required: true
	},
	photo: {
		type: mongoose.Schema.Types.Mixed as unknown as ClassFromModel['photo'],
		required: false,
		default: null as unknown as ClassFromModel['photo']
	},
	courses: {
		type: [String],
		required: true,
		default: []
	},
	users: Object.fromEntries(Object.keys(ClassUsers).map((key) => [key, {
		type: [String],
		required: false,
		default: []
	}])),
	requests: {
		type: [String],
		required: false,
		default: []
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

export const Class = mongoose.model<ClassFromModel>('StranerdClass', Schema)

export const ClassChange = appInstance.db
	.generateDbChange<ClassFromModel, ClassEntity>(Class, ClassDbChangeCallbacks, new ClassMapper().mapFrom)