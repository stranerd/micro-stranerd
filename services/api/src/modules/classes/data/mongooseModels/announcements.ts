import { generateChangeStreams, mongoose } from '@utils/commons'
import { AnnouncementFromModel } from '../models/announcements'
import { AnnouncementEntity } from '../../domain/entities/announcements'
import { AnnouncementChangeStreamCallbacks } from '@utils/changeStreams/classes/announcements'
import { AnnouncementMapper } from '../mappers/announcements'
import { ClassUsers } from '../../domain/types'

const Schema = new mongoose.Schema<AnnouncementFromModel>({
	_id: {
		type: String,
		default: () => new mongoose.Types.ObjectId().toString()
	},
	users: Object.fromEntries(Object.keys(ClassUsers).map((key) => [key, {
		type: [String],
		required: false,
		default: []
	}])),
	classId: {
		type: String,
		required: true
	},
	user: {
		type: mongoose.Schema.Types.Mixed as unknown as AnnouncementFromModel['user'],
		required: true
	},
	body: {
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
}, { timestamps: { currentTime: Date.now }, minimize: false })

export const Announcement = mongoose.model<AnnouncementFromModel>('StranerdClassesAnnouncement', Schema)

generateChangeStreams<AnnouncementFromModel, AnnouncementEntity>(Announcement, AnnouncementChangeStreamCallbacks, new AnnouncementMapper().mapFrom).then()