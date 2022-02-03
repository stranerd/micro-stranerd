import { generateChangeStreams, mongoose } from '@utils/commons'
import { SetFromModel } from '../models/sets'
import { SetChangeStreamCallbacks } from '@utils/changeStreams/study/sets'
import { SetEntity } from '../../domain/entities/sets'
import { SetMapper } from '../mappers/sets'

const Schema = new mongoose.Schema<SetFromModel>({
	_id: {
		type: String,
		default: () => new mongoose.Types.ObjectId().toString()
	},
	name: {
		type: String,
		required: false,
		default: ''
	},
	isPublic: {
		type: Boolean,
		required: false,
		default: false
	},
	tags: {
		type: [String],
		required: true,
		set: (tags: string[]) => Array.from(new Set(tags))
	},
	children: {
		type: [String],
		required: false,
		default: []
	},
	saved: {
		notes: {
			type: [String],
			required: false,
			default: []
		},
		videos: {
			type: [String],
			required: false,
			default: []
		},
		flashCards: {
			type: [String],
			required: false,
			default: []
		},
		testPreps: {
			type: [String],
			required: false,
			default: []
		}
	},
	parent: {
		type: mongoose.Schema.Types.Mixed,
		required: false,
		default: null
	},
	userId: {
		type: String,
		required: true
	},
	userBio: {
		type: mongoose.Schema.Types.Mixed as unknown as SetFromModel['userBio'],
		required: false,
		default: {} as unknown as SetFromModel['userBio']
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

export const Set = mongoose.model<SetFromModel>('StranerdSet', Schema)

generateChangeStreams<SetFromModel, SetEntity>(Set, SetChangeStreamCallbacks, new SetMapper().mapFrom).then()