import { ICourseRepository } from '../../irepositories/courses'
import { BaseUseCase } from '@utils/commons'

export class DeleteCourseUseCase extends BaseUseCase<string, boolean> {
	private repository: ICourseRepository

	constructor (repository: ICourseRepository) {
		super()
		this.repository = repository
	}

	async execute (id: string) {
		return await this.repository.delete(id)
	}
}
