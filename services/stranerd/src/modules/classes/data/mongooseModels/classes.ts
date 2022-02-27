import { generateChangeStreams, mongoose } from '@utils/commons'
import { ClassFromModel } from '../models/classes'
import { ClassEntity } from '../../domain/entities/classes'
import { ClassChangeStreamCallbacks } from '@utils/changeStreams/classes/classes'
import { ClassMapper } from '../mappers/classes'
import { ClassUsers } from '../../domain/types'

const Schema = new mongoose.Schema<ClassFromModel>({
	_id: {
		type: String,
		default: () => new mongoose.Types.ObjectId().toString()
	},
	userId: {
		type: String,
		required: true
	},
	userBio: {
		type: mongoose.Schema.Types.Mixed as unknown as ClassFromModel['userBio'],
		required: false,
		default: {} as unknown as ClassFromModel['userBio']
	},
	userRoles: {
		type: mongoose.Schema.Types.Mixed as unknown as ClassFromModel['userRoles'],
		required: false,
		default: {} as unknown as ClassFromModel['userRoles']
	},
	name: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	avatar: {
		type: mongoose.Schema.Types.Mixed as unknown as ClassFromModel['avatar'],
		required: false,
		default: {} as unknown as ClassFromModel['avatar']
	},
	users: {
		requests: {
			type: [String],
			required: false,
			default: []
		},
		...Object.fromEntries(Object.keys(ClassUsers).map((key) => [key, {
			type: [String],
			required: false,
			default: []
		}]))
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

generateChangeStreams<ClassFromModel, ClassEntity>(Class, ClassChangeStreamCallbacks, new ClassMapper().mapFrom).then()