import { generateChangeStreams, mongoose } from '@utils/commons'
import { VideoFromModel } from '../models/videos'
import { VideoChangeStreamCallbacks } from '@utils/changeStreams/study/videos'
import { VideoEntity } from '../../domain/entities/videos'
import { VideoMapper } from '../mappers/videos'

const Schema = new mongoose.Schema<VideoFromModel>({
	_id: {
		type: String,
		default: () => new mongoose.Types.ObjectId() as unknown as string
	},
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	tags: {
		type: [String],
		required: true,
		set: (tags: string[]) => Array.from(new Set(tags))
	},
	userId: {
		type: String,
		required: true
	},
	userBio: {
		type: mongoose.Schema.Types.Mixed as unknown as VideoFromModel['userBio'],
		required: false,
		default: {} as unknown as VideoFromModel['userBio']
	},
	isHosted: {
		type: Boolean,
		required: false,
		default: false
	},
	link: {
		type: String,
		required: false,
		default: null as unknown as string
	},
	media: {
		type: mongoose.Schema.Types.Mixed,
		required: false,
		default: null
	},
	commentsCount: {
		type: Number,
		required: false,
		default: 0
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
}, { timestamps: { currentTime: Date.now } })

export const Video = mongoose.model<VideoFromModel>('StranerdVideo', Schema)

generateChangeStreams<VideoFromModel, VideoEntity>(Video, VideoChangeStreamCallbacks, new VideoMapper().mapFrom).then()