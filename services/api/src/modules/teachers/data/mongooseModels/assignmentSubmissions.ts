import { mongoose } from '@utils/app/package'
import { appInstance } from '@utils/app/types'
import { AssignmentSubmissionDbChangeCallbacks } from '@utils/changeStreams/teachers/assignmentSubmissions'
import { AssignmentSubmissionEntity } from '../../domain/entities/assignmentSubmissions'
import { AssignmentSubmissionMapper } from '../mappers/assignmentSubmissions'
import { AssignmentSubmissionFromModel } from '../models/assignmentSubmissions'

const Schema = new mongoose.Schema<AssignmentSubmissionFromModel>({
	_id: {
		type: String,
		default: () => new mongoose.Types.ObjectId().toString()
	},
	courseId: {
		type: String,
		required: true
	},
	assignmentId: {
		type: String,
		required: true
	},
	user: {
		type: mongoose.Schema.Types.Mixed as unknown as AssignmentSubmissionFromModel['user'],
		required: true
	},
	members: {
		type: [String],
		required: false,
		default: []
	},
	attachments: {
		type: [mongoose.Schema.Types.Mixed] as unknown as AssignmentSubmissionFromModel['attachments'],
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

export const AssignmentSubmission = mongoose.model<AssignmentSubmissionFromModel>('StranerdTeachersAssignmentSubmission', Schema)

export const AssignmentSubmissionChange = appInstance.db
	.generateDbChange<AssignmentSubmissionFromModel, AssignmentSubmissionEntity>(AssignmentSubmission, AssignmentSubmissionDbChangeCallbacks, new AssignmentSubmissionMapper().mapFrom)