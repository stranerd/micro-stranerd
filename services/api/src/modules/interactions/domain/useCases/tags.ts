import { ITagRepository } from '../irepositories/tags'
import { TagToModel } from '../../data/models/tags'
import { QueryParams } from '@utils/app/package'

export class TagsUseCase {
	private repository: ITagRepository

	constructor (repository: ITagRepository) {
		this.repository = repository
	}

	async add (data: TagToModel) {
		return await this.repository.add(data)
	}

	async delete (input: { id: string }) {
		return await this.repository.delete(input.id)
	}

	async find (id: string) {
		return await this.repository.find(id)
	}

	async get (query: QueryParams) {
		return await this.repository.get(query)
	}

	async update (input: { id: string, data: Partial<TagToModel> }) {
		return await this.repository.update(input.id, input.data)
	}
}
