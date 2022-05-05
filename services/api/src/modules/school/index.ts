import { CourseRepository } from './data/repositories/courses'
import { InstitutionRepository } from './data/repositories/institutions'
import { FacultyRepository } from './data/repositories/faculties'
import { DepartmentRepository } from './data/repositories/departments'
import { PastQuestionRepository } from './data/repositories/pastQuestions'
import { InstitutionsUseCase } from './domain/useCases/institutions'
import { FacultiesUseCase } from './domain/useCases/faculties'
import { DepartmentsUseCase } from './domain/useCases/departments'
import { CoursesUseCase } from './domain/useCases/courses'
import { PastQuestionsUseCase } from './domain/useCases/pastQuestions'

const courseRepository = CourseRepository.getInstance()
const institutionRepository = InstitutionRepository.getInstance()
const facultyRepository = FacultyRepository.getInstance()
const departmentRepository = DepartmentRepository.getInstance()
const pastQuestionRepository = PastQuestionRepository.getInstance()

export const InstitutionsUseCases = new InstitutionsUseCase(institutionRepository)
export const FacultiesUseCases = new FacultiesUseCase(facultyRepository)
export const DepartmentsUseCases = new DepartmentsUseCase(departmentRepository)
export const CoursesUseCases = new CoursesUseCase(courseRepository)
export const PastQuestionsUseCases = new PastQuestionsUseCase(pastQuestionRepository)

export { PastQuestionData, PastQuestionType } from './domain/types'

export { CourseFromModel } from './data/models/courses'
export { InstitutionFromModel } from './data/models/institutions'
export { FacultyFromModel } from './data/models/faculties'
export { DepartmentFromModel } from './data/models/departments'
export { PastQuestionFromModel } from './data/models/pastQuestions'

export { CourseEntity } from './domain/entities/courses'
export { InstitutionEntity } from './domain/entities/institutions'
export { FacultyEntity } from './domain/entities/faculties'
export { DepartmentEntity } from './domain/entities/departments'
export { PastQuestionEntity } from './domain/entities/pastQuestions'