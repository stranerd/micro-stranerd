import { IPostRepository } from '../irepositories/posts'
import { PostToModel } from '../../data/models/posts'
import { QueryParams } from '@utils/app/package'
import { EmbeddedUser, PostMetaType } from '../types'

export class PostsUseCase {
	private repository: IPostRepository

	constructor (repository: IPostRepository) {
		this.repository = repository
	}

	async add (data: PostToModel) {
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

	async update (input: { courseId: string, id: string, userId: string, data: Partial<PostToModel> }) {
		return await this.repository.update(input.courseId, input.id, input.userId, input.data)
	}

	async updateUserBio (user: EmbeddedUser) {
		return await this.repository.updateUserBio(user)
	}

	async updateMembers (data: { courseId: string, members: string[] }) {
		return this.repository.updateMembers(data.courseId, data.members)
	}

	async deleteCoursePosts (courseId: string) {
		return this.repository.deleteCoursePosts(courseId)
	}

	async updateMeta (data: { id: string, property: PostMetaType, value: 1 | -1 }) {
		return this.repository.updateMeta(data.id, data.property, data.value)
	}
}
