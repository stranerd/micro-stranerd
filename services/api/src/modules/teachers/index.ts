import { CourseRepository } from './data/repositories/courses'
import { FileRepository } from './data/repositories/files'
import { AttendanceRepository } from './data/repositories/attendances'
import { AssignmentRepository } from './data/repositories/assignments'
import { AssignmentSubmissionRepository } from './data/repositories/assignmentSubmissions'
import { PostRepository } from './data/repositories/posts'
import { CoursesUseCase } from './domain/useCases/courses'
import { FilesUseCase } from './domain/useCases/files'
import { AttendancesUseCase } from './domain/useCases/attendances'
import { AssignmentsUseCase } from './domain/useCases/assignments'
import { AssignmentSubmissionsUseCase } from './domain/useCases/assignmentSubmissions'
import { PostsUseCase } from './domain/useCases/posts'

const courseRepository = CourseRepository.getInstance()
const fileRepository = FileRepository.getInstance()
const attendanceRepository = AttendanceRepository.getInstance()
const assignmentRepository = AssignmentRepository.getInstance()
const assignmentSubmissionRepository = AssignmentSubmissionRepository.getInstance()
const postRepository = PostRepository.getInstance()

export const CoursesUseCases = new CoursesUseCase(courseRepository)
export const FilesUseCases = new FilesUseCase(fileRepository)
export const AttendancesUseCases = new AttendancesUseCase(attendanceRepository)
export const AssignmentsUseCases = new AssignmentsUseCase(assignmentRepository)
export const AssignmentSubmissionsUseCases = new AssignmentSubmissionsUseCase(assignmentSubmissionRepository)
export const PostsUseCases = new PostsUseCase(postRepository)

export { CourseFromModel } from './data/models/courses'
export { FileFromModel } from './data/models/files'
export { AttendanceFromModel } from './data/models/attendances'
export { AssignmentFromModel } from './data/models/assignments'
export { AssignmentSubmissionFromModel } from './data/models/assignmentSubmissions'
export { PostFromModel } from './data/models/posts'

export { CourseEntity } from './domain/entities/courses'
export { FileEntity } from './domain/entities/files'
export { AttendanceEntity } from './domain/entities/attendances'
export { AssignmentEntity } from './domain/entities/assignments'
export { AssignmentSubmissionEntity } from './domain/entities/assignmentSubmissions'
export { PostEntity } from './domain/entities/posts'

export { PostType, PostMetaType } from './domain/types'
