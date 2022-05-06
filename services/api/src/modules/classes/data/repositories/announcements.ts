import { IAnnouncementRepository } from '../../domain/irepositories/announcements'
import { AnnouncementMapper } from '../mappers/announcements'
import { AnnouncementFromModel, AnnouncementToModel } from '../models/announcements'
import { Announcement } from '../mongooseModels/announcements'
import { parseQueryParams, QueryParams } from '@utils/commons'
import { ClassUsers, EmbeddedUser } from '../../domain/types'

export class AnnouncementRepository implements IAnnouncementRepository {
	private static instance: AnnouncementRepository
	private mapper: AnnouncementMapper

	private constructor () {
		this.mapper = new AnnouncementMapper()
	}

	static getInstance () {
		if (!AnnouncementRepository.instance) AnnouncementRepository.instance = new AnnouncementRepository()
		return AnnouncementRepository.instance
	}

	async get (query: QueryParams) {
		const data = await parseQueryParams<AnnouncementFromModel>(Announcement, query)

		return {
			...data,
			results: data.results.map((r) => this.mapper.mapFrom(r)!)
		}
	}

	async add (data: AnnouncementToModel) {
		const announcement = await new Announcement(data).save()
		return this.mapper.mapFrom(announcement)!
	}

	async find (classId: string, id: string, userId: string) {
		const announcement = await Announcement.findOne({ _id: id, classId, 'users.members': userId })
		return this.mapper.mapFrom(announcement)
	}

	async update (classId: string, id: string, userId: string, data: Partial<AnnouncementToModel>) {
		const announcement = await Announcement.findOneAndUpdate({
			_id: id,
			'user.admins': userId, classId
		}, { $set: data }, { new: true })
		return this.mapper.mapFrom(announcement)
	}

	async updateUserBio (user: EmbeddedUser) {
		const announcements = await Announcement.updateMany({ 'user.id': user.id }, { $set: { user } })
		return announcements.acknowledged
	}

	async delete (classId: string, id: string, userId: string) {
		const announcement = await Announcement.findOneAndDelete({ _id: id, 'users.admins': userId, classId })
		return !!announcement
	}

	async updateUsers (classId: string, users: Record<ClassUsers, string[]>) {
		const announcements = await Announcement.updateMany({ classId }, { $set: { users } })
		return announcements.acknowledged
	}

	async deleteClassAnnouncements (classId: string) {
		const announcements = await Announcement.deleteMany({ classId })
		return announcements.acknowledged
	}
}
