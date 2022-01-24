import { ICourseRepository } from '../../irepositories/courses'
import { BaseUseCase } from '@utils/commons'

export class DeleteInstitutionCoursesUseCase extends BaseUseCase<string, boolean> {
	private repository: ICourseRepository

	constructor (repository: ICourseRepository) {
		super()
		this.repository = repository
	}

	async execute (institutionId: string) {
		return await this.repository.deleteInstitutionCourses(institutionId)
	}
}
