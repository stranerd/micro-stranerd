import { CourseRepository } from './data/repositories/courses'
import { InstitutionRepository } from './data/repositories/institutions'
import { FacultyRepository } from './data/repositories/faculties'
import { DepartmentRepository } from './data/repositories/departments'
import { PastQuestionRepository } from './data/repositories/pastQuestions'
import { AddCourseUseCase } from './domain/useCases/courses/addCourse'
import { UpdateCourseUseCase } from './domain/useCases/courses/updateCourse'
import { DeleteCourseUseCase } from './domain/useCases/courses/deleteCourse'
import { FindCourseUseCase } from './domain/useCases/courses/findCourse'
import { GetCoursesUseCase } from './domain/useCases/courses/getCourses'
import { DeleteInstitutionCoursesUseCase } from './domain/useCases/courses/deleteInstitutionCourses'
import { DeleteDepartmentCoursesUseCase } from './domain/useCases/courses/deleteDepartmentCourses'
import { AddInstitutionUseCase } from './domain/useCases/institutions/addInstitution'
import { UpdateInstitutionUseCase } from './domain/useCases/institutions/updateInstitution'
import { DeleteInstitutionUseCase } from './domain/useCases/institutions/deleteInstitution'
import { FindInstitutionUseCase } from './domain/useCases/institutions/findInstitution'
import { GetInstitutionsUseCase } from './domain/useCases/institutions/getInstitutions'
import { AddFacultyUseCase } from './domain/useCases/faculties/addFaculty'
import { UpdateFacultyUseCase } from './domain/useCases/faculties/updateFaculty'
import { DeleteFacultyUseCase } from './domain/useCases/faculties/deleteFaculty'
import { FindFacultyUseCase } from './domain/useCases/faculties/findFaculty'
import { GetFacultiesUseCase } from './domain/useCases/faculties/getFaculties'
import { DeleteInstitutionFacultiesUseCase } from './domain/useCases/faculties/deleteInstitutionFaculties'
import { AddDepartmentUseCase } from './domain/useCases/departments/addDepartment'
import { UpdateDepartmentUseCase } from './domain/useCases/departments/updateDepartment'
import { DeleteDepartmentUseCase } from './domain/useCases/departments/deleteDepartment'
import { FindDepartmentUseCase } from './domain/useCases/departments/findDepartment'
import { GetDepartmentsUseCase } from './domain/useCases/departments/getDepartments'
import { DeleteFacultyDepartmentsUseCase } from './domain/useCases/departments/deleteFacultyDepartments'
import { GetPastQuestionsUseCase } from './domain/useCases/pastQuestions/getPastQuestions'
import { FindPastQuestionUseCase } from './domain/useCases/pastQuestions/findPastQuestion'
import { AddPastQuestionUseCase } from './domain/useCases/pastQuestions/addPastQuestion'
import { UpdatePastQuestionUseCase } from './domain/useCases/pastQuestions/updatePastQuestion'
import { DeletePastQuestionUseCase } from './domain/useCases/pastQuestions/deletePastQuestion'

const courseRepository = CourseRepository.getInstance()
const institutionRepository = InstitutionRepository.getInstance()
const facultyRepository = FacultyRepository.getInstance()
const departmentRepository = DepartmentRepository.getInstance()
const pastQuestionRepository = PastQuestionRepository.getInstance()

export const AddCourse = new AddCourseUseCase(courseRepository)
export const UpdateCourse = new UpdateCourseUseCase(courseRepository)
export const DeleteCourse = new DeleteCourseUseCase(courseRepository)
export const FindCourse = new FindCourseUseCase(courseRepository)
export const GetCourses = new GetCoursesUseCase(courseRepository)
export const DeleteInstitutionCourses = new DeleteInstitutionCoursesUseCase(courseRepository)
export const DeleteDepartmentCourses = new DeleteDepartmentCoursesUseCase(courseRepository)

export const AddInstitution = new AddInstitutionUseCase(institutionRepository)
export const UpdateInstitution = new UpdateInstitutionUseCase(institutionRepository)
export const DeleteInstitution = new DeleteInstitutionUseCase(institutionRepository)
export const FindInstitution = new FindInstitutionUseCase(institutionRepository)
export const GetInstitutions = new GetInstitutionsUseCase(institutionRepository)

export const AddFaculty = new AddFacultyUseCase(facultyRepository)
export const UpdateFaculty = new UpdateFacultyUseCase(facultyRepository)
export const DeleteFaculty = new DeleteFacultyUseCase(facultyRepository)
export const FindFaculty = new FindFacultyUseCase(facultyRepository)
export const GetFaculties = new GetFacultiesUseCase(facultyRepository)
export const DeleteInstitutionFaculties = new DeleteInstitutionFacultiesUseCase(facultyRepository)

export const AddDepartment = new AddDepartmentUseCase(departmentRepository)
export const UpdateDepartment = new UpdateDepartmentUseCase(departmentRepository)
export const DeleteDepartment = new DeleteDepartmentUseCase(departmentRepository)
export const FindDepartment = new FindDepartmentUseCase(departmentRepository)
export const GetDepartments = new GetDepartmentsUseCase(departmentRepository)
export const DeleteFacultyDepartments = new DeleteFacultyDepartmentsUseCase(departmentRepository)

export const GetPastQuestions = new GetPastQuestionsUseCase(pastQuestionRepository)
export const FindPastQuestion = new FindPastQuestionUseCase(pastQuestionRepository)
export const AddPastQuestion = new AddPastQuestionUseCase(pastQuestionRepository)
export const UpdatePastQuestion = new UpdatePastQuestionUseCase(pastQuestionRepository)
export const DeletePastQuestion = new DeletePastQuestionUseCase(pastQuestionRepository)

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