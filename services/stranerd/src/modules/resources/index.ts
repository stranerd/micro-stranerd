import { CourseRepository } from './data/repositories/courses'
import { SchoolRepository } from './data/repositories/schools'
import { VideoCommentRepository } from './data/repositories/videoComments'
import { VideoRepository } from './data/repositories/videos'
import { NoteRepository } from './data/repositories/notes'
import { AddCourseUseCase } from './domain/useCases/courses/addCourse'
import { UpdateCourseUseCase } from './domain/useCases/courses/updateCourse'
import { DeleteCourseUseCase } from './domain/useCases/courses/deleteCourse'
import { FindCourseUseCase } from './domain/useCases/courses/findCourse'
import { GetCoursesUseCase } from './domain/useCases/courses/getCourses'
import { AddSchoolUseCase } from './domain/useCases/schools/addSchool'
import { UpdateSchoolUseCase } from './domain/useCases/schools/updateSchool'
import { DeleteSchoolUseCase } from './domain/useCases/schools/deleteSchool'
import { FindSchoolUseCase } from './domain/useCases/schools/findSchool'
import { GetSchoolsUseCase } from './domain/useCases/schools/getSchools'
import { GetVideoCommentsUseCase } from './domain/useCases/videoComments/getVideoComments'
import { FindVideoCommentUseCase } from './domain/useCases/videoComments/findVideoComment'
import { AddVideoCommentUseCase } from './domain/useCases/videoComments/addVideoComment'
import { DeleteVideosCommentsUseCase } from './domain/useCases/videoComments/deleteVideoComments'
import { UpdateVideoCommentsUserBioUseCase } from './domain/useCases/videoComments/updateVideoCommentsUserBio'
import { GetVideosUseCase } from './domain/useCases/videos/getVideos'
import { FindVideoUseCase } from './domain/useCases/videos/findVideo'
import { AddVideoUseCase } from './domain/useCases/videos/addVideo'
import { UpdateVideoUseCase } from './domain/useCases/videos/updateVideo'
import { DeleteVideoUseCase } from './domain/useCases/videos/deleteVideo'
import { UpdateVideosUserBioUseCase } from './domain/useCases/videos/updateVideosUserBio'
import { UpdateVideosCommentsCountUseCase } from './domain/useCases/videos/updateVideosCommentsCount'
import { GetNotesUseCase } from './domain/useCases/notes/getNotes'
import { FindNoteUseCase } from './domain/useCases/notes/findNote'
import { AddNoteUseCase } from './domain/useCases/notes/addNote'
import { UpdateNoteUseCase } from './domain/useCases/notes/updateNote'
import { DeleteNoteUseCase } from './domain/useCases/notes/deleteNote'
import { UpdateNotesUserBioUseCase } from './domain/useCases/notes/updateNotesUserBio'

const courseRepository = CourseRepository.getInstance()
const schoolRepository = SchoolRepository.getInstance()
const videoCommentRepository = VideoCommentRepository.getInstance()
const videoRepository = VideoRepository.getInstance()
const noteRepository = NoteRepository.getInstance()

export const AddCourse = new AddCourseUseCase(courseRepository)
export const UpdateCourse = new UpdateCourseUseCase(courseRepository)
export const DeleteCourse = new DeleteCourseUseCase(courseRepository)
export const FindCourse = new FindCourseUseCase(courseRepository)
export const GetCourses = new GetCoursesUseCase(courseRepository)

export const AddSchool = new AddSchoolUseCase(schoolRepository)
export const UpdateSchool = new UpdateSchoolUseCase(schoolRepository)
export const DeleteSchool = new DeleteSchoolUseCase(schoolRepository)
export const FindSchool = new FindSchoolUseCase(schoolRepository)
export const GetSchools = new GetSchoolsUseCase(schoolRepository)

export const GetVideoComments = new GetVideoCommentsUseCase(videoCommentRepository)
export const FindVideoComment = new FindVideoCommentUseCase(videoCommentRepository)
export const AddVideoComment = new AddVideoCommentUseCase(videoCommentRepository)
export const DeleteVideoComments = new DeleteVideosCommentsUseCase(videoCommentRepository)
export const UpdateVideoCommentsUserBio = new UpdateVideoCommentsUserBioUseCase(videoCommentRepository)

export const GetVideos = new GetVideosUseCase(videoRepository)
export const FindVideo = new FindVideoUseCase(videoRepository)
export const AddVideo = new AddVideoUseCase(videoRepository)
export const UpdateVideo = new UpdateVideoUseCase(videoRepository)
export const DeleteVideo = new DeleteVideoUseCase(videoRepository)
export const UpdateVideosUserBio = new UpdateVideosUserBioUseCase(videoRepository)
export const UpdateVideosCommentsCount = new UpdateVideosCommentsCountUseCase(videoRepository)

export const GetNotes = new GetNotesUseCase(noteRepository)
export const FindNote = new FindNoteUseCase(noteRepository)
export const AddNote = new AddNoteUseCase(noteRepository)
export const UpdateNote = new UpdateNoteUseCase(noteRepository)
export const DeleteNote = new DeleteNoteUseCase(noteRepository)
export const UpdateNotesUserBio = new UpdateNotesUserBioUseCase(noteRepository)

export { CourseFromModel } from './data/models/courses'
export { SchoolFromModel } from './data/models/schools'
export { VideoCommentFromModel } from './data/models/videoComments'
export { VideoFromModel } from './data/models/videos'
export { NoteFromModel } from './data/models/notes'

export { CourseEntity } from './domain/entities/courses'
export { SchoolEntity } from './domain/entities/schools'
export { VideoCommentEntity } from './domain/entities/videoComments'
export { VideoEntity } from './domain/entities/videos'
export { NoteEntity } from './domain/entities/notes'