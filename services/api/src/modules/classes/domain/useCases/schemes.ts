import { SchemeToModel } from '../../data/models/schemes'
import { ISchemeRepository } from '../irepositories/schemes'
import { QueryParams } from '@utils/app/package'
import { ClassUsers, EmbeddedUser } from '../types'

export class SchemesUseCase {
	private repository: ISchemeRepository

	constructor (repository: ISchemeRepository) {
		this.repository = repository
	}

	async add (data: SchemeToModel) {
		return await this.repository.add(data)
	}

	async deleteClassSchemes (classId: string) {
		return await this.repository.deleteClassSchemes(classId)
	}

	async delete (data: { classId: string, id: string, userId: string }) {
		return await this.repository.delete(data.classId, data.id, data.userId)
	}

	async find (id: string) {
		return await this.repository.find(id)
	}

	async get (query: QueryParams) {
		return await this.repository.get(query)
	}

	async update (input: { classId: string, id: string, userId: string, data: Partial<SchemeToModel> }) {
		return await this.repository.update(input.classId, input.id, input.userId, input.data)
	}

	async updateUserBio (user: EmbeddedUser) {
		return await this.repository.updateUserBio(user)
	}

	async updateUsers (input: { classId: string, users: Record<ClassUsers, string[]> }) {
		return await this.repository.updateUsers(input.classId, input.users)
	}

	async markRead (input: { classId: string, userId: string }) {
		return await this.repository.markRead(input.classId, input.userId)
	}
}
