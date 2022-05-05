import { SetToModel } from '../../data/models/sets'
import { ISetRepository } from '../irepositories/sets'
import { QueryParams } from '@utils/commons'
import { UserBio, UserRoles } from '@modules/users'
import { SetSaved } from '@modules/study'

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

	async updateUserBio (input: { userId: string, userBio: UserBio, userRoles: UserRoles }) {
		return await this.repository.updateSetsUserBio(input.userId, input.userBio, input.userRoles)
	}

	async updateSetProp (input: { id: string, userId: string, prop: SetSaved, add: boolean, values: string[] }) {
		return await this.repository.updateSetProp(input.id, input.userId, input.prop, input.add, input.values)
	}

	async removeSetProp (input: { prop: SetSaved, value: string }) {
		return await this.repository.removeSetProp(input.prop, input.value)
	}
}
