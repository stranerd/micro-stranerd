import { EventToModel } from '../../data/models/events'
import { IEventRepository } from '../irepositories/events'
import { QueryParams } from '@utils/commons'
import { ClassUsers, EmbeddedUser } from '../types'

export class EventsUseCase {
	private repository: IEventRepository

	constructor (repository: IEventRepository) {
		this.repository = repository
	}

	async add (data: EventToModel) {
		return await this.repository.add(data)
	}

	async deleteClassEvents (classId: string) {
		return await this.repository.deleteClassEvents(classId)
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

	async update (input: { classId: string, id: string, userId: string, data: Partial<EventToModel> }) {
		return await this.repository.update(input.classId, input.id, input.userId, input.data)
	}

	async updateUserBio (user: EmbeddedUser) {
		return await this.repository.updateUserBio(user)
	}

	async updateUsers (input: { classId: string, users: Record<ClassUsers, string[]> }) {
		return await this.repository.updateUsers(input.classId, input.users)
	}

	async updateTaskIds (input: { id: string, data: { taskIds: string[], add: boolean } }) {
		return await this.repository.updateTaskIds(input.id, input.data)
	}
}
