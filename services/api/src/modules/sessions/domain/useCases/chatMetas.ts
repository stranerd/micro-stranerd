import { IChatMetaRepository } from '../irepositories/chatMeta'
import { QueryParams } from '@utils/commons'
import { UserBio, UserRoles } from '@modules/users'

export class ChatMetasUseCase {
	private repository: IChatMetaRepository

	constructor (repository: IChatMetaRepository) {
		this.repository = repository
	}

	async find (data: { id: string, userId: string }) {
		return await this.repository.find(data.id, data.userId)
	}

	async get (query: QueryParams) {
		return await this.repository.get(query)
	}

	async updateMetaUser (input: { id: string, userBio: UserBio, userRoles: UserRoles }) {
		return await this.repository.updateBio(input.id, input.userBio, input.userRoles)
	}

	async updateUserBio (input: { userId: string, userBio: UserBio, userRoles: UserRoles }) {
		return await this.repository.updateUserBios(input.userId, input.userBio, input.userRoles)
	}
}