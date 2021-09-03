import { generateChangeStreams, mongoose } from '@utils/commons'
import { ChatMetaFromModel } from '../models/chatMeta'
import { ChatMetaChangeStreamCallbacks } from '@utils/changeStreams/sessions/chatMeta'
import { ChatMetaMapper } from '../mappers/chatMeta'
import { ChatMetaEntity } from '@modules/sessions'

const Schema = new mongoose.Schema<ChatMetaFromModel>({
	unRead: {
		type: Array,
		required: true
	},
	last: {
		type: Object,
		required: true
	},
	userBio: {
		type: Object,
		required: true
	}
},{ timestamps: { currentTime: Date.now } })


export const ChatMeta = mongoose.model<ChatMetaFromModel>('StranerdChatMeta', Schema)

generateChangeStreams<ChatMetaFromModel, ChatMetaEntity>(ChatMeta, ChatMetaChangeStreamCallbacks, new ChatMetaMapper().mapFrom).then()


