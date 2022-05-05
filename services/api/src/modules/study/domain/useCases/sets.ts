import { SetToModel } from '../../data/models/sets'
import { ISetRepository } from '../irepositories/sets'
import { QueryParams } from '@utils/commons'
import { EmbeddedUser, SetSaved } from '../types'

export class SetsUseCase {
	private repository: ISetRepository

	constructor (repository: ISetRepository) {
		this.repository = repository
	}

	async add (data: SetToModel) {
		return await this.repository.add(data)
	}

	async delete (input: { id: string, userId: string }) {
		return await this.repository.delete(input.id, input.userId)
	}

	async find (id: string) {
		return await this.repository.find(id)
	}

	async get (query: QueryParams) {
		return await this.repository.get(query)
	}

	async update (input: { id: string, userId: string, data: Partial<SetToModel> }) {
		return await this.repository.update(input.id, input.userId, input.data)
	}

	async updateUserBio (user: EmbeddedUser) {
		return await this.repository.updateUserBio(user)
	}

	async updateProp (input: { id: string, userId: string, prop: SetSaved, add: boolean, values: string[] }) {
		return await this.repository.updateProp(input.id, input.userId, input.prop, input.add, input.values)
	}

	async removeProp (input: { prop: SetSaved, value: string }) {
		return await this.repository.removeProp(input.prop, input.value)
	}
}
