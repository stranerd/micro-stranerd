import { QueryParams } from '@utils/commons'
import { IConnectRepository } from '../i-repositories/connects'
import { ConnectToModel } from '../../data/models/connects'
import { EmbeddedUser } from '../types'

export class ConnectsUseCase {
	repository: IConnectRepository

	constructor (repo: IConnectRepository) {
		this.repository = repo
	}

	async find (input: { userId: string, id: string }) {
		return await this.repository.find(input)
	}

	async get (input: QueryParams) {
		return await this.repository.get(input)
	}

	async create (input: ConnectToModel) {
		return await this.repository.create(input)
	}

	async accept (data: { id: string, userId: string, accept: boolean }) {
		return await this.repository.accept(data)
	}

	async delete (data: { id: string, userId: string }) {
		return await this.repository.delete(data)
	}

	async updateUserBio (user: EmbeddedUser) {
		return await this.repository.updateUserBio(user)
	}
}