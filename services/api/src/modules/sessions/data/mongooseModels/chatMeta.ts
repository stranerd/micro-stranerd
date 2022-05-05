import { generateChangeStreams, mongoose } from '@utils/commons'
import { ChatMetaFromModel } from '../models/chatMeta'
import { ChatMetaChangeStreamCallbacks } from '@utils/changeStreams/sessions/chatMetas'
import { ChatMetaMapper } from '../mappers/chatMeta'
import { ChatMetaEntity } from '../../domain/entities/chatMeta'

const Schema = new mongoose.Schema<ChatMetaFromModel>({
	_id: {
		type: String,
		default: () => new mongoose.Types.ObjectId().toString()
	},
	unRead: {
		type: [String],
		required: false,
		default: []
	},
	last: {
		type: mongoose.Schema.Types.Mixed as unknown as ChatMetaFromModel['last'],
		required: false,
		default: null as unknown as ChatMetaFromModel['last']
	},
	ownerId: {
		type: String,
		required: true
	},
	user: {
		type: mongoose.Schema.Types.Mixed as unknown as ChatMetaFromModel['user'],
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

export const ChatMeta = mongoose.model<ChatMetaFromModel>('StranerdSessionsChatMeta', Schema)

generateChangeStreams<ChatMetaFromModel, ChatMetaEntity>(ChatMeta, ChatMetaChangeStreamCallbacks, new ChatMetaMapper().mapFrom).then()