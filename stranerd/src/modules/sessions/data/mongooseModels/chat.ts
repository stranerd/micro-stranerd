import { generateChangeStreams, mongoose } from '@utils/commons'
import { ChatFromModel } from '../models/chat'
import { ChatEntity } from '@modules/sessions'
import { ChatChangeStreamCallbacks } from '@utils/changeStreams/sessions/chat'
import { ChatMapper } from '@modules/sessions/data/mappers/chat'

const Schema = new mongoose.Schema<ChatFromModel>({
	content: {
		type: String,
		required: false
	},
	media: {
		type: Object,
		required: false
	},
	from: {
		type: String,
		required: true
	},
	sessionId: {
		type: mongoose.Schema.Types.ObjectId,
		required: false
	},
	readAt: {
		type: Number,
		required: false,
	},
	createdAt: {
		type: Number,
		required: false,
		default: Date.now
	}
}, { timestamps: { currentTime: Date.now } })


export const Chat = mongoose.model<ChatFromModel>('StranerdChat', Schema)

generateChangeStreams<ChatFromModel, ChatEntity>(Chat, ChatChangeStreamCallbacks, new ChatMapper().mapFrom).then()


