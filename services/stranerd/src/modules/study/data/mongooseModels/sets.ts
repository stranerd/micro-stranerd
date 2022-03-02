import { generateChangeStreams, mongoose } from '@utils/commons'
import { SetFromModel } from '../models/sets'
import { SetChangeStreamCallbacks } from '@utils/changeStreams/study/sets'
import { SetEntity } from '../../domain/entities/sets'
import { SetMapper } from '../mappers/sets'
import { SetSaved } from '../../domain/types'

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
	children: {
		type: [String],
		required: false,
		default: []
	},
	saved: Object.fromEntries(
		Object.keys(SetSaved).map((key) => [key, {
			type: [String],
			required: false,
			default: []
		}])
	),
	parent: {
		type: String,
		required: false,
		default: ''
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
	userRoles: {
		type: mongoose.Schema.Types.Mixed as unknown as SetFromModel['userRoles'],
		required: false,
		default: {} as unknown as SetFromModel['userRoles']
	},
	data: {
		type: mongoose.Schema.Types.Mixed as unknown as SetFromModel['data'],
		required: false,
		default: {} as unknown as SetFromModel['data']
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

export const Set = mongoose.model<SetFromModel>('StranerdStudySet', Schema)

generateChangeStreams<SetFromModel, SetEntity>(Set, SetChangeStreamCallbacks, new SetMapper().mapFrom).then()