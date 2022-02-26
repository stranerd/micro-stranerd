import { generateChangeStreams, mongoose } from '@utils/commons'
import { GroupFromModel } from '../models/groups'
import { GroupEntity } from '../../domain/entities/groups'
import { GroupChangeStreamCallbacks } from '@utils/changeStreams/classes/groups'
import { GroupMapper } from '../mappers/groups'

const Schema = new mongoose.Schema<GroupFromModel>({
	_id: {
		type: String,
		default: () => new mongoose.Types.ObjectId().toString()
	},
	name: {
		type: String,
		required: true
	},
	classId: {
		type: String,
		required: true
	},
	admins: {
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

export const Group = mongoose.model<GroupFromModel>('StranerdGroup', Schema)

generateChangeStreams<GroupFromModel, GroupEntity>(Group, GroupChangeStreamCallbacks, new GroupMapper().mapFrom).then()