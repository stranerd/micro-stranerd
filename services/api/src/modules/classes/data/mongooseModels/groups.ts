import { generateChangeStreams, mongoose } from '@utils/commons'
import { GroupFromModel } from '../models/groups'
import { GroupEntity } from '../../domain/entities/groups'
import { GroupChangeStreamCallbacks } from '@utils/changeStreams/classes/groups'
import { GroupMapper } from '../mappers/groups'
import { ClassUsers } from '../../domain/types'

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
	user: {
		type: mongoose.Schema.Types.Mixed as unknown as GroupFromModel['user'],
		required: true
	},
	users: Object.fromEntries(Object.keys(ClassUsers).map((key) => [key, {
		type: [String],
		required: false,
		default: []
	}])),
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

export const Group = mongoose.model<GroupFromModel>('StranerdClassesGroup', Schema)

generateChangeStreams<GroupFromModel, GroupEntity>(Group, GroupChangeStreamCallbacks, new GroupMapper().mapFrom).then()