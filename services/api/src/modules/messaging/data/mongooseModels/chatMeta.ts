import { generateChangeStreams, mongoose } from '@utils/commons'
import { ChatMetaFromModel } from '../models/chatMeta'
import { ChatMetaChangeStreamCallbacks } from '@utils/changeStreams/messaging/chatMetas'
import { ChatMetaMapper } from '../mappers/chatMeta'
import { ChatMetaEntity } from '../../domain/entities/chatMeta'

const Schema = new mongoose.Schema<ChatMetaFromModel>({
	_id: {
		type: String,
		default: () => new mongoose.Types.ObjectId().toString()
	},
	readAt: {
		type: mongoose.Schema.Types.Mixed as unknown as ChatMetaFromModel['readAt'],
		required: false,
		default: {}
	},
	last: {
		type: mongoose.Schema.Types.Mixed as unknown as ChatMetaFromModel['last'],
		required: false,
		default: null as unknown as ChatMetaFromModel['last']
	},
	members: {
		type: [String],
		required: true
	},
	data: {
		type: mongoose.Schema.Types.Mixed as unknown as ChatMetaFromModel['data'],
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

export const ChatMeta = mongoose.model<ChatMetaFromModel>('StranerdMessagingChatMeta', Schema)

generateChangeStreams<ChatMetaFromModel, ChatMetaEntity>(ChatMeta, ChatMetaChangeStreamCallbacks, new ChatMetaMapper().mapFrom).then()