import { mongoose } from '@utils/app/package'
import { appInstance } from '@utils/app/types'
import { SetDbChangeCallbacks } from '@utils/changeStreams/study/sets'
import { SetEntity } from '../../domain/entities/sets'
import { SetSaved } from '../../domain/types'
import { SetMapper } from '../mappers/sets'
import { SetFromModel } from '../models/sets'

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
	saved: Object.fromEntries(
		Object.keys(SetSaved).map((key) => [key, {
			type: [String],
			required: false,
			default: []
		}])
	),
	user: {
		type: mongoose.Schema.Types.Mixed as unknown as SetFromModel['user'],
		required: true
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

export const SetChange = appInstance.db
	.generateDbChange<SetFromModel, SetEntity>(Set, SetDbChangeCallbacks, new SetMapper().mapFrom)