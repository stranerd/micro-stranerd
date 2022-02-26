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
	userId: {
		type: String,
		required: true
	},
	userBio: {
		type: mongoose.Schema.Types.Mixed as unknown as DiscussionFromModel['userBio'],
		required: false,
		default: {} as unknown as DiscussionFromModel['userBio']
	},
	userRoles: {
		type: mongoose.Schema.Types.Mixed as unknown as DiscussionFromModel['userRoles'],
		required: false,
		default: {} as unknown as DiscussionFromModel['userRoles']
	},
	groupId: {
		type: String,
		required: true
	},
	content: {
		type: String,
		required: false,
		default: null as unknown as string
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

export const Discussion = mongoose.model<DiscussionFromModel>('StranerdDiscussion', Schema)

generateChangeStreams<DiscussionFromModel, DiscussionEntity>(Discussion, DiscussionChangeStreamCallbacks, new DiscussionMapper().mapFrom).then()