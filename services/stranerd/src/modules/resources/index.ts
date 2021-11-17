import { SetRepository } from './data/repositories/sets'
import { CourseRepository } from './data/repositories/courses'
import { InstitutionRepository } from './data/repositories/institutions'
import { VideoCommentRepository } from './data/repositories/videoComments'
import { VideoRepository } from './data/repositories/videos'
import { NoteRepository } from './data/repositories/notes'
import { FlashCardRepository } from './data/repositories/flashCards'
import { PastQuestionObjRepository, PastQuestionTheoryRepository } from './data/repositories/pastQuestions'
import { GetSetsUseCase } from './domain/useCases/sets/getSets'
import { FindSetUseCase } from './domain/useCases/sets/findSet'
import { AddSetUseCase } from './domain/useCases/sets/addSet'
import { DeleteSetUseCase } from './domain/useCases/sets/deleteSet'
import { UpdateSetUseCase } from './domain/useCases/sets/updateSet'
import { UpdateSetsUserBioUseCase } from './domain/useCases/sets/updateSetsUserBio'
import { UpdateSetPropUseCase } from './domain/useCases/sets/updateSetProp'
import { AddCourseUseCase } from './domain/useCases/courses/addCourse'
import { UpdateCourseUseCase } from './domain/useCases/courses/updateCourse'
import { DeleteCourseUseCase } from './domain/useCases/courses/deleteCourse'
import { FindCourseUseCase } from './domain/useCases/courses/findCourse'
import { GetCoursesUseCase } from './domain/useCases/courses/getCourses'
import { AddInstitutionUseCase } from './domain/useCases/institutions/addInstitution'
import { UpdateInstitutionUseCase } from './domain/useCases/institutions/updateInstitution'
import { DeleteInstitutionUseCase } from './domain/useCases/institutions/deleteInstitution'
import { FindInstitutionUseCase } from './domain/useCases/institutions/findInstitution'
import { GetInstitutionsUseCase } from './domain/useCases/institutions/getInstitutions'
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
import { GetFlashCardsUseCase } from './domain/useCases/flashCards/getFlashCards'
import { FindFlashCardUseCase } from './domain/useCases/flashCards/findFlashCard'
import { AddFlashCardUseCase } from './domain/useCases/flashCards/addFlashCard'
import { UpdateFlashCardUseCase } from './domain/useCases/flashCards/updateFlashCard'
import { DeleteFlashCardUseCase } from './domain/useCases/flashCards/deleteFlashCard'
import { UpdateFlashCardsUserBioUseCase } from './domain/useCases/flashCards/updateFlashCardsUserBio'
import { GetPastQuestionsUseCase } from './domain/useCases/pastQuestions/getPastQuestions'
import { FindPastQuestionUseCase } from './domain/useCases/pastQuestions/findPastQuestion'
import { AddPastQuestionUseCase } from './domain/useCases/pastQuestions/addPastQuestion'
import { UpdatePastQuestionUseCase } from './domain/useCases/pastQuestions/updatePastQuestion'
import { DeletePastQuestionUseCase } from './domain/useCases/pastQuestions/deletePastQuestion'
import { PastQuestionObjToModel, PastQuestionTheoryToModel } from './data/models/pastQuestions'
import { PastQuestionObjEntity, PastQuestionTheoryEntity } from './domain/entities/pastQuestions'

const setRepository = SetRepository.getInstance()
const courseRepository = CourseRepository.getInstance()
const institutionRepository = InstitutionRepository.getInstance()
const videoCommentRepository = VideoCommentRepository.getInstance()
const videoRepository = VideoRepository.getInstance()
const noteRepository = NoteRepository.getInstance()
const flashCardRepository = FlashCardRepository.getInstance()
const pastQuestionTheoryRepository = PastQuestionTheoryRepository.getInstance()
const pastQuestionObjRepository = PastQuestionObjRepository.getInstance()

export const GetSets = new GetSetsUseCase(setRepository)
export const FindSet = new FindSetUseCase(setRepository)
export const AddSet = new AddSetUseCase(setRepository)
export const UpdateSet = new UpdateSetUseCase(setRepository)
export const DeleteSet = new DeleteSetUseCase(setRepository)
export const UpdateSetsUserBio = new UpdateSetsUserBioUseCase(setRepository)
export const UpdateSetProp = new UpdateSetPropUseCase(setRepository)

export const AddCourse = new AddCourseUseCase(courseRepository)
export const UpdateCourse = new UpdateCourseUseCase(courseRepository)
export const DeleteCourse = new DeleteCourseUseCase(courseRepository)
export const FindCourse = new FindCourseUseCase(courseRepository)
export const GetCourses = new GetCoursesUseCase(courseRepository)

export const AddInstitution = new AddInstitutionUseCase(institutionRepository)
export const UpdateInstitution = new UpdateInstitutionUseCase(institutionRepository)
export const DeleteInstitution = new DeleteInstitutionUseCase(institutionRepository)
export const FindInstitution = new FindInstitutionUseCase(institutionRepository)
export const GetInstitutions = new GetInstitutionsUseCase(institutionRepository)

export const GetVideoComments = new GetVideoCommentsUseCase(videoCommentRepository)
export const FindVideoComment = new FindVideoCommentUseCase(videoCommentRepository)
export const AddVideoComment = new AddVideoCommentUseCase(videoCommentRepository)
export const DeleteVideosComments = new DeleteVideosCommentsUseCase(videoCommentRepository)
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

export const GetFlashCards = new GetFlashCardsUseCase(flashCardRepository)
export const FindFlashCard = new FindFlashCardUseCase(flashCardRepository)
export const AddFlashCard = new AddFlashCardUseCase(flashCardRepository)
export const UpdateFlashCard = new UpdateFlashCardUseCase(flashCardRepository)
export const DeleteFlashCard = new DeleteFlashCardUseCase(flashCardRepository)
export const UpdateFlashCardsUserBio = new UpdateFlashCardsUserBioUseCase(flashCardRepository)

export const GetPastTheoryQuestions = new GetPastQuestionsUseCase<PastQuestionTheoryEntity>(pastQuestionTheoryRepository)
export const GetPastObjQuestions = new GetPastQuestionsUseCase<PastQuestionObjEntity>(pastQuestionObjRepository)
export const FindPastTheoryQuestion = new FindPastQuestionUseCase<PastQuestionTheoryEntity>(pastQuestionTheoryRepository)
export const FindPastObjQuestion = new FindPastQuestionUseCase<PastQuestionObjEntity>(pastQuestionObjRepository)
export const AddPastTheoryQuestion = new AddPastQuestionUseCase<PastQuestionTheoryToModel, PastQuestionTheoryEntity>(pastQuestionTheoryRepository)
export const AddPastObjQuestion = new AddPastQuestionUseCase<PastQuestionObjToModel, PastQuestionObjEntity>(pastQuestionObjRepository)
export const UpdatePastTheoryQuestion = new UpdatePastQuestionUseCase<PastQuestionTheoryToModel, PastQuestionTheoryEntity>(pastQuestionTheoryRepository)
export const UpdatePastObjQuestion = new UpdatePastQuestionUseCase<PastQuestionObjToModel, PastQuestionObjEntity>(pastQuestionObjRepository)
export const DeletePastTheoryQuestion = new DeletePastQuestionUseCase(pastQuestionTheoryRepository)
export const DeletePastObjQuestion = new DeletePastQuestionUseCase(pastQuestionObjRepository)

export { CourseFromModel } from './data/models/courses'
export { SetFromModel } from './data/models/sets'
export { InstitutionFromModel } from './data/models/institutions'
export { VideoCommentFromModel } from './data/models/videoComments'
export { VideoFromModel } from './data/models/videos'
export { NoteFromModel } from './data/models/notes'
export { FlashCardFromModel } from './data/models/flashCards'
export { PastQuestionObjFromModel, PastQuestionTheoryFromModel } from './data/models/pastQuestions'

export { CourseEntity } from './domain/entities/courses'
export { SetEntity } from './domain/entities/sets'
export { InstitutionEntity } from './domain/entities/institutions'
export { VideoCommentEntity } from './domain/entities/videoComments'
export { VideoEntity } from './domain/entities/videos'
export { NoteEntity } from './domain/entities/notes'
export { FlashCardEntity } from './domain/entities/flashCards'
export { PastQuestionTheoryEntity, PastQuestionObjEntity }