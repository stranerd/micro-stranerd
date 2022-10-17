import { IFileRepository } from '../irepositories/files'
import { FileToModel } from '../../data/models/files'
import { QueryParams } from '@utils/app/package'
import { EmbeddedUser } from '../types'

export class FilesUseCase {
	private repository: IFileRepository

	constructor (repository: IFileRepository) {
		this.repository = repository
	}

	async add (data: FileToModel) {
		return await this.repository.add(data)
	}

	async delete (input: { courseId: string, id: string, userId: string }) {
		return await this.repository.delete(input.courseId, input.id, input.userId)
	}

	async find (id: string) {
		return await this.repository.find(id)
	}

	async get (query: QueryParams) {
		return await this.repository.get(query)
	}

	async update (input: { courseId: string, id: string, userId: string, data: Partial<FileToModel> }) {
		return await this.repository.update(input.courseId, input.id, input.userId, input.data)
	}

	async updateUserBio (user: EmbeddedUser) {
		return await this.repository.updateUserBio(user)
	}

	async updateMembers (data: { courseId: string, members: string[] }) {
		return this.repository.updateMembers(data.courseId, data.members)
	}

	async deleteCourseFiles (courseId: string) {
		return this.repository.deleteCourseFiles(courseId)
	}
}
