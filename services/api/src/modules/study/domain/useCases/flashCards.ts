import { FlashCardToModel } from '../../data/models/flashCards'
import { IFlashCardRepository } from '../irepositories/flashCards'
import { QueryParams } from '@utils/commons'
import { UserBio, UserRoles } from '@modules/users'

export class FlashCardsUseCase {
	private repository: IFlashCardRepository

	constructor (repository: IFlashCardRepository) {
		this.repository = repository
	}

	async add (data: FlashCardToModel) {
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

	async update (input: { id: string, userId: string, data: Partial<FlashCardToModel> }) {
		return await this.repository.update(input.id, input.userId, input.data)
	}

	async updateUserBio (input: { userId: string, userBio: UserBio, userRoles: UserRoles }) {
		return await this.repository.updateFlashCardsUserBio(input.userId, input.userBio, input.userRoles)
	}
}