import { IErrorRepository } from '../irepositories/errors'
import { ErrorToModel } from '../../data/models/errors'

export class ErrorsUseCase {
	private repository: IErrorRepository

	constructor (repository: IErrorRepository) {
		this.repository = repository
	}

	async add (data: ErrorToModel) {
		return await this.repository.add(data)
	}

	async getAndDeleteAll () {
		return await this.repository.getAndDeleteAll()
	}
}
