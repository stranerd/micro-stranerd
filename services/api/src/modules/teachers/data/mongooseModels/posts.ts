import { generateChangeStreams, mongoose } from '@utils/app/package'
import { PostFromModel } from '../models/posts'
import { PostChangeStreamCallbacks } from '@utils/changeStreams/teachers/posts'
import { PostEntity } from '../../domain/entities/posts'
import { PostMapper } from '../mappers/posts'
import { PostMetaType } from '../../domain/types'

const Schema = new mongoose.Schema<PostFromModel>({
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
	data: {
		type: mongoose.Schema.Types.Mixed as unknown as PostFromModel['data'],
		required: true
	},
	user: {
		type: mongoose.Schema.Types.Mixed as unknown as PostFromModel['user'],
		required: true
	},
	members: {
		type: [String],
		required: false,
		default: []
	},
	attachments: {
		type: [mongoose.Schema.Types.Mixed] as unknown as PostFromModel['attachments'],
		required: false,
		default: []
	},
	meta: Object.fromEntries(
		Object.keys(PostMetaType).map((key) => [key, {
			type: Number,
			required: false,
			default: 0
		}])
	),
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

export const Post = mongoose.model<PostFromModel>('StranerdTeachersPost', Schema)

generateChangeStreams<PostFromModel, PostEntity>(Post, PostChangeStreamCallbacks, new PostMapper().mapFrom).then()