import { generateChangeStreams, mongoose } from '@utils/commons'
import { DiscussionFromModel } from '../models/discussions'
import { DiscussionEntity } from '../../domain/entities/discussions'
import { DiscussionChangeStreamCallbacks } from '@utils/changeStreams/classes/discussions'
import { DiscussionMapper } from '../mappers/discussions'

const Schema = new mongoose.Schema<DiscussionFromModel>({
	_id: {
		type: String,
		default: () => new mongoose.Types.ObjectId().toString()
	},
	user: {
		type: mongoose.Schema.Types.Mixed as unknown as DiscussionFromModel['user'],
		required: true
	},
	groupId: {
		type: String,
		required: true
	},
	classId: {
		type: String,
		required: true
	},
	content: {
		type: String,
		required: false,
		default: ''
	},
	links: {
		type: [mongoose.Schema.Types.Mixed] as unknown as DiscussionFromModel['links'],
		required: false,
		default: []
	},
	media: {
		type: mongoose.Schema.Types.Mixed,
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

export const Discussion = mongoose.model<DiscussionFromModel>('StranerdClassesDiscussion', Schema)

generateChangeStreams<DiscussionFromModel, DiscussionEntity>(Discussion, DiscussionChangeStreamCallbacks, new DiscussionMapper().mapFrom).then()