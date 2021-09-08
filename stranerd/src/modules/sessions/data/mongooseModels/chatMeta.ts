import { generateChangeStreams, mongoose } from '@utils/commons'
import { ChatMetaFromModel } from '../models/chatMeta'
import { ChatMetaChangeStreamCallbacks } from '@utils/changeStreams/sessions/chatMeta'
import { ChatMetaMapper } from '../mappers/chatMeta'
import { ChatMetaEntity } from '../../domain/entities/chatMeta'

const Schema = new mongoose.Schema<ChatMetaFromModel>({
	unRead: {
		type: [mongoose.Schema.Types.ObjectId as unknown as StringConstructor],
		required: false,
		default: []
	},
	last: {
		type: Object as unknown as ChatMetaFromModel['last'],
		required: false,
		default: null as unknown as ChatMetaFromModel['last']
	},
	ownerId: {
		type: mongoose.Schema.Types.ObjectId as unknown as StringConstructor,
		required: true
	},
	userId: {
		type: mongoose.Schema.Types.ObjectId as unknown as StringConstructor,
		required: true
	},
	userBio: {
		type: Object as unknown as ChatMetaFromModel['userBio'],
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
}, { timestamps: { currentTime: Date.now } })

export const ChatMeta = mongoose.model<ChatMetaFromModel>('StranerdChatMeta', Schema)

generateChangeStreams<ChatMetaFromModel, ChatMetaEntity>(ChatMeta, ChatMetaChangeStreamCallbacks, new ChatMetaMapper().mapFrom).then()