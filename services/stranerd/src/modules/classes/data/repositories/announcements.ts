import { IAnnouncementRepository } from '../../domain/irepositories/announcements'
import { AnnouncementMapper } from '../mappers/announcements'
import { AnnouncementFromModel, AnnouncementToModel } from '../models/announcements'
import { Announcement } from '../mongooseModels/announcements'
import { parseQueryParams, QueryParams } from '@utils/commons'
import { ClassUsers, UserBio, UserRoles } from '../../domain/types'

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

	async find (id: string) {
		const announcement = await Announcement.findById(id)
		return this.mapper.mapFrom(announcement)
	}

	async update (id: string, userId: string, data: Partial<AnnouncementToModel>) {
		const announcement = await Announcement.findOneAndUpdate({
			_id: id,
			admins: userId
		}, { $set: data }, { new: true })
		return this.mapper.mapFrom(announcement)
	}

	async updateAnnouncementsUserBio (userId: string, userBio: UserBio, userRoles: UserRoles) {
		const announcements = await Announcement.updateMany({ userId }, { $set: { userBio, userRoles } })
		return announcements.acknowledged
	}

	async delete (id: string, userId: string) {
		const announcement = await Announcement.findOneAndDelete({ _id: id, admins: userId })
		return !!announcement
	}

	async updateAnnouncementsUsers (classId: string, users: Record<ClassUsers, string[]>) {
		const announcements = await Announcement.updateMany({ classId }, { $set: { users } })
		return announcements.acknowledged
	}
}
