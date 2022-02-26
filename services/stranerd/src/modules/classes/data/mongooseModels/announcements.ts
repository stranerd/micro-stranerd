import { generateChangeStreams, mongoose } from '@utils/commons'
import { AnnouncementFromModel } from '../models/announcements'
import { AnnouncementEntity } from '../../domain/entities/announcements'
import { AnnouncementChangeStreamCallbacks } from '@utils/changeStreams/classes/announcements'
import { AnnouncementMapper } from '../mappers/announcements'

const Schema = new mongoose.Schema<AnnouncementFromModel>({
	_id: {
		type: String,
		default: () => new mongoose.Types.ObjectId().toString()
	},
	admins: {
		type: [String],
		required: false,
		default: []
	},
	classId: {
		type: String,
		required: true
	},
	userId: {
		type: String,
		required: true
	},
	userBio: {
		type: mongoose.Schema.Types.Mixed as unknown as AnnouncementFromModel['userBio'],
		required: false,
		default: {} as unknown as AnnouncementFromModel['userBio']
	},
	userRoles: {
		type: mongoose.Schema.Types.Mixed as unknown as AnnouncementFromModel['userRoles'],
		required: false,
		default: {} as unknown as AnnouncementFromModel['userRoles']
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

export const Announcement = mongoose.model<AnnouncementFromModel>('StranerdAnnouncement', Schema)

generateChangeStreams<AnnouncementFromModel, AnnouncementEntity>(Announcement, AnnouncementChangeStreamCallbacks, new AnnouncementMapper().mapFrom).then()