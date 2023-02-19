import { mongoose } from '@utils/app/package'
import { appInstance } from '@utils/app/types'
import { GroupDbChangeCallbacks } from '@utils/changeStreams/classes/groups'
import { GroupEntity } from '../../domain/entities/groups'
import { ClassUsers } from '../../domain/types'
import { GroupMapper } from '../mappers/groups'
import { GroupFromModel } from '../models/groups'

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

export const GroupChange = appInstance.db
	.generateDbChange<GroupFromModel, GroupEntity>(Group, GroupDbChangeCallbacks, new GroupMapper().mapFrom)