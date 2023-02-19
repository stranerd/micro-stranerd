import { mongoose } from '@utils/app/package'
import { appInstance } from '@utils/app/types'
import { AssignmentDbChangeCallbacks } from '@utils/changeStreams/teachers/assignments'
import { AssignmentEntity } from '../../domain/entities/assignments'
import { AssignmentMapper } from '../mappers/assignments'
import { AssignmentFromModel } from '../models/assignments'

const Schema = new mongoose.Schema<AssignmentFromModel>({
	_id: {
		type: String,
		default: () => new mongoose.Types.ObjectId().toString()
	},
	courseId: {
		type: String,
		required: true
	},
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: false,
		default: ''
	},
	user: {
		type: mongoose.Schema.Types.Mixed as unknown as AssignmentFromModel['user'],
		required: true
	},
	members: {
		type: [String],
		required: false,
		default: []
	},
	attachments: {
		type: [mongoose.Schema.Types.Mixed] as unknown as AssignmentFromModel['attachments'],
		required: false,
		default: []
	},
	submissions: {
		type: [mongoose.Schema.Types.Mixed] as unknown as AssignmentFromModel['submissions'],
		required: false,
		default: []
	},
	deadline: {
		type: Number,
		required: false,
		default: null
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

export const Assignment = mongoose.model<AssignmentFromModel>('StranerdTeachersAssignment', Schema)

export const AssignmentChange = appInstance.db
	.generateDbChange<AssignmentFromModel, AssignmentEntity>(Assignment, AssignmentDbChangeCallbacks, new AssignmentMapper().mapFrom)