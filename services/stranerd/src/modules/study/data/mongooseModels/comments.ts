import { generateChangeStreams, mongoose } from '@utils/commons'
import { CommentFromModel } from '../models/comments'
import { CommentChangeStreamCallbacks } from '@utils/changeStreams/study/comments'
import { CommentEntity } from '../../domain/entities/comments'
import { CommentMapper } from '../mappers/comments'

const Schema = new mongoose.Schema<CommentFromModel>({
	_id: {
		type: String,
		default: () => new mongoose.Types.ObjectId().toString()
	},
	body: {
		type: String,
		required: true
	},
	userId: {
		type: String,
		required: true
	},
	userBio: {
		type: mongoose.Schema.Types.Mixed as unknown as CommentFromModel['userBio'],
		required: false,
		default: {} as unknown as CommentFromModel['userBio']
	},
	data: {
		type: mongoose.Schema.Types.Mixed,
		required: true,
		default: () => ({}) as unknown as CommentFromModel['data']
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

export const Comment = mongoose.model<CommentFromModel>('StranerdStudyComment', Schema)

generateChangeStreams<CommentFromModel, CommentEntity>(Comment, CommentChangeStreamCallbacks, new CommentMapper().mapFrom).then()