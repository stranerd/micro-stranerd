import { generateChangeStreams, mongoose } from '@utils/commons'
import { VideoCommentFromModel } from '../models/videoComments'
import { VideoCommentChangeStreamCallbacks } from '@utils/changeStreams/study/videoComments'
import { VideoCommentEntity } from '../../domain/entities/videoComments'
import { VideoCommentMapper } from '../mappers/videoComments'

const Schema = new mongoose.Schema<VideoCommentFromModel>({
	_id: {
		type: String,
		default: () => new mongoose.Types.ObjectId() as unknown as string
	},
	body: {
		type: String,
		required: true
	},
	userId: {
		type: String,
		required: true
	},
	videoId: {
		type: String,
		required: true
	},
	userBio: {
		type: mongoose.Schema.Types.Mixed as unknown as VideoCommentFromModel['userBio'],
		required: false,
		default: {} as unknown as VideoCommentFromModel['userBio']
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

export const VideoComment = mongoose.model<VideoCommentFromModel>('StranerdVideoComment', Schema)

generateChangeStreams<VideoCommentFromModel, VideoCommentEntity>(VideoComment, VideoCommentChangeStreamCallbacks, new VideoCommentMapper().mapFrom).then()