import { mongoose } from '@utils/app/package'
import { appInstance } from '@utils/app/types'
import { AnnouncementDbChangeCallbacks } from '@utils/changeStreams/classes/announcements'
import { AnnouncementEntity } from '../../domain/entities/announcements'
import { ClassUsers } from '../../domain/types'
import { AnnouncementMapper } from '../mappers/announcements'
import { AnnouncementFromModel } from '../models/announcements'

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
	reminder: {
		type: Number,
		required: false,
		default: null
	},
	user: {
		type: mongoose.Schema.Types.Mixed as unknown as AnnouncementFromModel['user'],
		required: true
	},
	body: {
		type: String,
		required: true
	},
	readAt: {
		type: mongoose.Schema.Types.Mixed,
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

export const Announcement = mongoose.model<AnnouncementFromModel>('StranerdClassesAnnouncement', Schema)

export const AnnouncementChange = appInstance.db
	.generateDbChange<AnnouncementFromModel, AnnouncementEntity>(Announcement, AnnouncementDbChangeCallbacks, new AnnouncementMapper().mapFrom)