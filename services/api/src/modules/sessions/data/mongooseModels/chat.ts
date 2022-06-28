import { generateChangeStreams, mongoose } from '@utils/commons'
import { ChatFromModel } from '../models/chat'
import { ChatEntity } from '../../domain/entities/chat'
import { ChatChangeStreamCallbacks } from '@utils/changeStreams/sessions/chats'
import { ChatMapper } from '../mappers/chat'

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

export const Chat = mongoose.model<ChatFromModel>('StranerdSessionsChat', Schema)

generateChangeStreams<ChatFromModel, ChatEntity>(Chat, ChatChangeStreamCallbacks, new ChatMapper().mapFrom).then()