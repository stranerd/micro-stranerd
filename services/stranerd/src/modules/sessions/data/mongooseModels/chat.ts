import { generateChangeStreams, mongoose } from '@utils/commons'
import { ChatFromModel } from '../models/chat'
import { ChatEntity } from '../../domain/entities/chat'
import { ChatChangeStreamCallbacks } from '@utils/changeStreams/sessions/chat'
import { ChatMapper } from '../mappers/chat'

const Schema = new mongoose.Schema<ChatFromModel>({
	_id: {
		type: String,
		default: () => new mongoose.Types.ObjectId() as unknown as string
	},
	path: {
		type: [String],
		required: true
	},
	content: {
		type: String,
		required: false,
		default: null as unknown as string
	},
	media: {
		type: Object,
		required: false,
		default: null
	},
	sessionId: {
		type: String,
		required: false,
		default: null as unknown as string
	},
	readAt: {
		type: Number,
		required: false,
		default: null as unknown as number
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

export const Chat = mongoose.model<ChatFromModel>('StranerdChat', Schema)

generateChangeStreams<ChatFromModel, ChatEntity>(Chat, ChatChangeStreamCallbacks, new ChatMapper().mapFrom).then()