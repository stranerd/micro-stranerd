import { CourseRepository } from './data/repositories/courses'
import { InstitutionRepository } from './data/repositories/institutions'
import { AddCourseUseCase } from './domain/useCases/courses/addCourse'
import { UpdateCourseUseCase } from './domain/useCases/courses/updateCourse'
import { DeleteCourseUseCase } from './domain/useCases/courses/deleteCourse'
import { FindCourseUseCase } from './domain/useCases/courses/findCourse'
import { GetCoursesUseCase } from './domain/useCases/courses/getCourses'
import { DeleteInstitutionCoursesUseCase } from './domain/useCases/courses/deleteInstitutionCourses'
import { AddInstitutionUseCase } from './domain/useCases/institutions/addInstitution'
import { UpdateInstitutionUseCase } from './domain/useCases/institutions/updateInstitution'
import { DeleteInstitutionUseCase } from './domain/useCases/institutions/deleteInstitution'
import { FindInstitutionUseCase } from './domain/useCases/institutions/findInstitution'
import { GetInstitutionsUseCase } from './domain/useCases/institutions/getInstitutions'

const courseRepository = CourseRepository.getInstance()
const institutionRepository = InstitutionRepository.getInstance()

export const AddCourse = new AddCourseUseCase(courseRepository)
export const UpdateCourse = new UpdateCourseUseCase(courseRepository)
export const DeleteCourse = new DeleteCourseUseCase(courseRepository)
export const FindCourse = new FindCourseUseCase(courseRepository)
export const GetCourses = new GetCoursesUseCase(courseRepository)
export const DeleteInstitutionCourses = new DeleteInstitutionCoursesUseCase(courseRepository)

export const AddInstitution = new AddInstitutionUseCase(institutionRepository)
export const UpdateInstitution = new UpdateInstitutionUseCase(institutionRepository)
export const DeleteInstitution = new DeleteInstitutionUseCase(institutionRepository)
export const FindInstitution = new FindInstitutionUseCase(institutionRepository)
export const GetInstitutions = new GetInstitutionsUseCase(institutionRepository)

export { CourseFromModel } from './data/models/courses'
export { InstitutionFromModel } from './data/models/institutions'

export { CourseEntity } from './domain/entities/courses'
export { InstitutionEntity } from './domain/entities/institutions'