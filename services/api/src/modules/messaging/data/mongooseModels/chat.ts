import { mongoose } from '@utils/app/package'
import { appInstance } from '@utils/app/types'
import { ChatDbChangeCallbacks } from '@utils/changeStreams/messaging/chats'
import { ChatEntity } from '../../domain/entities/chat'
import { ChatMapper } from '../mappers/chat'
import { ChatFromModel } from '../models/chat'

const Schema = new mongoose.Schema<ChatFromModel>({
	_id: {
		type: String,
		default: () => new mongoose.Types.ObjectId().toString()
	},
	from: {
		type: mongoose.Schema.Types.Mixed as unknown as ChatFromModel['from'],
		required: true
	},
	to: {
		type: String,
		required: true
	},
	body: {
		type: String,
		required: false,
		default: ''
	},
	links: {
		type: [mongoose.Schema.Types.Mixed] as unknown as ChatFromModel['links'],
		required: false,
		default: []
	},
	media: {
		type: mongoose.Schema.Types.Mixed,
		required: false,
		default: null
	},
	data: {
		type: mongoose.Schema.Types.Mixed,
		required: true
	},
	readAt: {
		type: mongoose.Schema.Types.Mixed as unknown as ChatFromModel['readAt'],
		required: false,
		default: {}
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

export const Chat = mongoose.model<ChatFromModel>('StranerdMessagingChat', Schema)

export const ChatChange = appInstance.db
	.generateDbChange<ChatFromModel, ChatEntity>(Chat, ChatDbChangeCallbacks, new ChatMapper().mapFrom)