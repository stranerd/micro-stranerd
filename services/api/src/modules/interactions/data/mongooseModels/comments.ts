import { mongoose } from '@utils/app/package'
import { appInstance } from '@utils/app/types'
import { CommentDbChangeCallbacks } from '@utils/changeStreams/interactions/comments'
import { CommentEntity } from '../../domain/entities/comments'
import { CommentMetaType } from '../../domain/types'
import { CommentMapper } from '../mappers/comments'
import { CommentFromModel } from '../models/comments'

const CommentSchema = new mongoose.Schema<CommentFromModel>({
	_id: {
		type: String,
		default: () => new mongoose.Types.ObjectId().toString()
	},
	body: {
		type: String,
		required: true
	},
	entity: {
		type: mongoose.Schema.Types.Mixed as unknown as CommentFromModel['entity'],
		required: true
	},
	user: {
		type: mongoose.Schema.Types.Mixed as unknown as CommentFromModel['user'],
		required: true
	},
	meta: Object.fromEntries(
		Object.keys(CommentMetaType).map((key) => [key, {
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

export const Comment = mongoose.model<CommentFromModel>('StranerdInteractionsComment', CommentSchema)

export const CommentChange = appInstance.db
	.generateDbChange<CommentFromModel, CommentEntity>(Comment, CommentDbChangeCallbacks, new CommentMapper().mapFrom)