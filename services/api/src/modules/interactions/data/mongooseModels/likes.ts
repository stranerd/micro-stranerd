import { mongoose } from '@utils/app/package'
import { appInstance } from '@utils/app/types'
import { LikeDbChangeCallbacks } from '@utils/changeStreams/interactions/likes'
import { LikeEntity } from '../../domain/entities/likes'
import { LikeMapper } from '../mappers/likes'
import { LikeFromModel } from '../models/likes'

const LikeSchema = new mongoose.Schema<LikeFromModel>({
	_id: {
		type: String,
		default: () => new mongoose.Types.ObjectId().toString()
	},
	value: {
		type: Boolean,
		required: true
	},
	entity: {
		type: mongoose.Schema.Types.Mixed as unknown as LikeFromModel['entity'],
		required: true
	},
	user: {
		type: mongoose.Schema.Types.Mixed as unknown as LikeFromModel['user'],
		required: true
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

export const Like = mongoose.model<LikeFromModel>('StranerdInteractionsLike', LikeSchema)

export const LikeChange = appInstance.db
	.generateDbChange<LikeFromModel, LikeEntity>(Like, LikeDbChangeCallbacks, new LikeMapper().mapFrom)