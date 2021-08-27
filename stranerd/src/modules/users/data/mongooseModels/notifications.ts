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
	}
}, { timestamps: true })

export const Notification = mongoose.model<NotificationFromModel>('Notification', NotificationSchema)

setupChangeStreams()