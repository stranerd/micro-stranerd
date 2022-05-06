import { AnnouncementToModel } from '../../data/models/announcements'
import { IAnnouncementRepository } from '../irepositories/announcements'
import { QueryParams } from '@utils/commons'
import { ClassUsers, EmbeddedUser } from '../types'

export class AnnouncementsUseCase {
	private repository: IAnnouncementRepository

	constructor (repository: IAnnouncementRepository) {
		this.repository = repository
	}

	async add (data: AnnouncementToModel) {
		return await this.repository.add(data)
	}

	async deleteClassAnnouncements (classId: string) {
		return await this.repository.deleteClassAnnouncements(classId)
	}

	async delete (data: { classId: string, id: string, userId: string }) {
		return await this.repository.delete(data.classId, data.id, data.userId)
	}

	async find (input: { classId: string, id: string, userId: string }) {
		return await this.repository.find(input.classId, input.id, input.userId)
	}

	async get (query: QueryParams) {
		return await this.repository.get(query)
	}

	async update (input: { classId: string, id: string, userId: string, data: Partial<AnnouncementToModel> }) {
		return await this.repository.update(input.classId, input.id, input.userId, input.data)
	}

	async updateUserBio (user: EmbeddedUser) {
		return await this.repository.updateUserBio(user)
	}

	async updateUsers (input: { classId: string, users: Record<ClassUsers, string[]> }) {
		return await this.repository.updateUsers(input.classId, input.users)
	}
}
