import { ClassToModel } from '../../data/models/classes'
import { IClassRepository } from '../irepositories/classes'
import { QueryParams } from '@utils/commons'
import { UserBio, UserRoles } from '@modules/users'
import { ClassUsers } from '@modules/classes/domain/types'

export class ClassesUseCase {
	private repository: IClassRepository

	constructor (repository: IClassRepository) {
		this.repository = repository
	}

	async add (data: ClassToModel) {
		return await this.repository.add(data)
	}

	async delete (data: { id: string, userId: string }) {
		return await this.repository.delete(data.id, data.userId)
	}

	async find (classId: string) {
		return await this.repository.find(classId)
	}

	async get (query: QueryParams) {
		return await this.repository.get(query)
	}

	async update (input: { id: string, userId: string, data: Partial<ClassToModel> }) {
		return await this.repository.update(input.id, input.userId, input.data)
	}

	async updateUserBio (input: { userId: string, userBio: UserBio, userRoles: UserRoles }) {
		return await this.repository.updateClassesUserBio(input.userId, input.userBio, input.userRoles)
	}

	async acceptRequest (data: { classId: string, adminId: string, requestId: string, accept: boolean }) {
		return await this.repository.acceptRequest(data.classId, data.adminId, data.requestId, data.accept)
	}

	async addMembers (data: { classId: string, adminId: string, userIds: string[], add: boolean }) {
		return await this.repository.addMembers(data.classId, data.adminId, data.userIds, data.add)
	}

	async changeMemberRole (data: { classId: string, adminId: string, userId: string, role: ClassUsers, add: boolean }) {
		return await this.repository.changeMemberRole(data.classId, data.adminId, data.userId, data.role, data.add)
	}

	async leaveClass (data: { classId: string, userId: string }) {
		return await this.repository.leaveClass(data.classId, data.userId)
	}

	async requestClass (data: { classId: string, userId: string, request: boolean }) {
		return await this.repository.requestClass(data.classId, data.userId, data.request)
	}
}
