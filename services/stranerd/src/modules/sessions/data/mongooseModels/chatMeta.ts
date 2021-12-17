import { generateChangeStreams, mongoose } from '@utils/commons'
import { ChatMetaFromModel } from '../models/chatMeta'
import { ChatMetaChangeStreamCallbacks } from '@utils/changeStreams/sessions/chatMeta'
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
	userId: {
		type: String,
		required: true
	},
	userBio: {
		type: mongoose.Schema.Types.Mixed as unknown as ChatMetaFromModel['userBio'],
		required: false,
		default: null as unknown as ChatMetaFromModel['userBio']
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

export const ChatMeta = mongoose.model<ChatMetaFromModel>('StranerdChatMeta', Schema)

generateChangeStreams<ChatMetaFromModel, ChatMetaEntity>(ChatMeta, ChatMetaChangeStreamCallbacks, new ChatMetaMapper().mapFrom).then()