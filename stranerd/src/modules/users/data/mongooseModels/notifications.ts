import { generateChangeStreams, mongoose } from '@utils/commons'
import { NotificationFromModel } from '../models/notifications'
import { NotificationChangeStreamCallbacks } from '@utils/changeStreams/users/notifications'
import { NotificationEntity } from '@modules/users/domain/entities/notifications'
import { NotificationMapper } from '@modules/users/data/mappers/notifications'

const NotificationSchema = new mongoose.Schema<NotificationFromModel>({
	_id: {
		type: String,
		default: new mongoose.Types.ObjectId() as unknown as string
	},
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
		type: String,
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
}, { timestamps: { currentTime: Date.now } })

export const Notification = mongoose.model<NotificationFromModel>('StranerdNotification', NotificationSchema)

generateChangeStreams<NotificationFromModel, NotificationEntity>(Notification, NotificationChangeStreamCallbacks, new NotificationMapper().mapFrom).then()