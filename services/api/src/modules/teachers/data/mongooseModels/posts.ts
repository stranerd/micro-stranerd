import { mongoose } from '@utils/app/package'
import { appInstance } from '@utils/app/types'
import { PostDbChangeCallbacks } from '@utils/changeStreams/teachers/posts'
import { PostEntity } from '../../domain/entities/posts'
import { PostMetaType } from '../../domain/types'
import { PostMapper } from '../mappers/posts'
import { PostFromModel } from '../models/posts'

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

export const PostChange = appInstance.db
	.generateDbChange<PostFromModel, PostEntity>(Post, PostDbChangeCallbacks, new PostMapper().mapFrom)