import { mongoose } from '@utils/commons'
import { NotificationFromModel } from '../models/notifications'
import { setupChangeStreams } from '../changeStreams/notifications'

const NotificationSchema = new mongoose.Schema<NotificationFromModel>({
	body: {
		type: String,
		required: true
	},
	action: {
		type: String,
		required: true
	},
	seen: {
		type: Boolean,
		required: false,
		default: false
	},
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true
	},
	createdAt: {
		type: Number,
		required: false,
		default: Date.now()
	},
	updatedAt: {
		type: Number,
		required: false,
		default: Date.now()
	}
}, { timestamps: { currentTime: Date.now } })

export const Notification = mongoose.model<NotificationFromModel>('Notification', NotificationSchema)

setupChangeStreams()