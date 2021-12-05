import { TestPrepRepository } from './data/repositories/testPreps'
import { SetRepository } from './data/repositories/sets'
import { CourseRepository } from './data/repositories/courses'
import { InstitutionRepository } from './data/repositories/institutions'
import { CommentRepository } from './data/repositories/comments'
import { VideoRepository } from './data/repositories/videos'
import { NoteRepository } from './data/repositories/notes'
import { FlashCardRepository } from './data/repositories/flashCards'
import { PastQuestionRepository } from './data/repositories/pastQuestions'
import { TestRepository } from './data/repositories/tests'
import { GetTestPrepsUseCase } from './domain/useCases/testPreps/getTestPreps'
import { FindTestPrepUseCase } from './domain/useCases/testPreps/findTestPrep'
import { AddTestPrepUseCase } from './domain/useCases/testPreps/addTestPrep'
import { DeleteTestPrepUseCase } from './domain/useCases/testPreps/deleteTestPrep'
import { UpdateTestPrepUseCase } from './domain/useCases/testPreps/updateTestPrep'
import { GetSetsUseCase } from './domain/useCases/sets/getSets'
import { FindSetUseCase } from './domain/useCases/sets/findSet'
import { AddSetUseCase } from './domain/useCases/sets/addSet'
import { DeleteSetUseCase } from './domain/useCases/sets/deleteSet'
import { UpdateSetUseCase } from './domain/useCases/sets/updateSet'
import { UpdateSetsUserBioUseCase } from './domain/useCases/sets/updateSetsUserBio'
import { UpdateSetPropUseCase } from './domain/useCases/sets/updateSetProp'
import { RemoveSetPropUseCase } from './domain/useCases/sets/removeSetProp'
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
import { GetCommentsUseCase } from './domain/useCases/comments/getComments'
import { FindCommentUseCase } from './domain/useCases/comments/findComment'
import { AddCommentUseCase } from './domain/useCases/comments/addComment'
import { DeletePropertyCommentsUseCase } from './domain/useCases/comments/deletePropertyComments'
import { UpdateCommentsUserBioUseCase } from './domain/useCases/comments/updateCommentsUserBio'
import { GetVideosUseCase } from './domain/useCases/videos/getVideos'
import { FindVideoUseCase } from './domain/useCases/videos/findVideo'
import { AddVideoUseCase } from './domain/useCases/videos/addVideo'
import { UpdateVideoUseCase } from './domain/useCases/videos/updateVideo'
import { DeleteVideoUseCase } from './domain/useCases/videos/deleteVideo'
import { UpdateVideosUserBioUseCase } from './domain/useCases/videos/updateVideosUserBio'
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
import { GetTestsUseCase } from './domain/useCases/tests/getTests'
import { FindTestUseCase } from './domain/useCases/tests/findTest'
import { AddTestUseCase } from './domain/useCases/tests/addTest'
import { UpdateTestUseCase } from './domain/useCases/tests/updateTest'
import { DeleteTestUseCase } from './domain/useCases/tests/deleteTest'
import { UpdateTestAnswerUseCase } from './domain/useCases/tests/updateTestAnswer'
import { UpdateTestTaskIdsUseCase } from './domain/useCases/tests/updateTestTaskIds'

const testPrepRepository = TestPrepRepository.getInstance()
const setRepository = SetRepository.getInstance()
const courseRepository = CourseRepository.getInstance()
const institutionRepository = InstitutionRepository.getInstance()
const commentRepository = CommentRepository.getInstance()
const videoRepository = VideoRepository.getInstance()
const noteRepository = NoteRepository.getInstance()
const flashCardRepository = FlashCardRepository.getInstance()
const pastQuestionRepository = PastQuestionRepository.getInstance()
const testRepository = TestRepository.getInstance()

export const GetTestPreps = new GetTestPrepsUseCase(testPrepRepository)
export const FindTestPrep = new FindTestPrepUseCase(testPrepRepository)
export const AddTestPrep = new AddTestPrepUseCase(testPrepRepository)
export const UpdateTestPrep = new UpdateTestPrepUseCase(testPrepRepository)
export const DeleteTestPrep = new DeleteTestPrepUseCase(testPrepRepository)

export const GetSets = new GetSetsUseCase(setRepository)
export const FindSet = new FindSetUseCase(setRepository)
export const AddSet = new AddSetUseCase(setRepository)
export const UpdateSet = new UpdateSetUseCase(setRepository)
export const DeleteSet = new DeleteSetUseCase(setRepository)
export const UpdateSetsUserBio = new UpdateSetsUserBioUseCase(setRepository)
export const UpdateSetProp = new UpdateSetPropUseCase(setRepository)
export const RemoveSetProp = new RemoveSetPropUseCase(setRepository)

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

export const GetComments = new GetCommentsUseCase(commentRepository)
export const FindComment = new FindCommentUseCase(commentRepository)
export const AddComment = new AddCommentUseCase(commentRepository)
export const DeletePropertyComments = new DeletePropertyCommentsUseCase(commentRepository)
export const UpdateCommentsUserBio = new UpdateCommentsUserBioUseCase(commentRepository)

export const GetVideos = new GetVideosUseCase(videoRepository)
export const FindVideo = new FindVideoUseCase(videoRepository)
export const AddVideo = new AddVideoUseCase(videoRepository)
export const UpdateVideo = new UpdateVideoUseCase(videoRepository)
export const DeleteVideo = new DeleteVideoUseCase(videoRepository)
export const UpdateVideosUserBio = new UpdateVideosUserBioUseCase(videoRepository)

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

export const GetPastQuestions = new GetPastQuestionsUseCase(pastQuestionRepository)
export const FindPastQuestion = new FindPastQuestionUseCase(pastQuestionRepository)
export const AddPastQuestion = new AddPastQuestionUseCase(pastQuestionRepository)
export const UpdatePastQuestion = new UpdatePastQuestionUseCase(pastQuestionRepository)
export const DeletePastQuestion = new DeletePastQuestionUseCase(pastQuestionRepository)

export const GetTests = new GetTestsUseCase(testRepository)
export const FindTest = new FindTestUseCase(testRepository)
export const AddTest = new AddTestUseCase(testRepository)
export const UpdateTest = new UpdateTestUseCase(testRepository)
export const DeleteTest = new DeleteTestUseCase(testRepository)
export const UpdateTestAnswer = new UpdateTestAnswerUseCase(testRepository)
export const UpdateTestTaskIds = new UpdateTestTaskIdsUseCase(testRepository)

export { PrepType, PrepData } from './domain/types'
export { PastQuestionData, PastQuestionType } from './domain/types'
export { TestData, TestType } from './domain/types'
export { CommentData, CommentType } from './domain/types'

export { TestPrepFromModel } from './data/models/testPreps'
export { CourseFromModel } from './data/models/courses'
export { SetFromModel } from './data/models/sets'
export { InstitutionFromModel } from './data/models/institutions'
export { CommentFromModel } from './data/models/comments'
export { VideoFromModel } from './data/models/videos'
export { NoteFromModel } from './data/models/notes'
export { FlashCardFromModel } from './data/models/flashCards'
export { PastQuestionFromModel } from './data/models/pastQuestions'
export { TestFromModel } from './data/models/tests'

export { TestPrepEntity } from './domain/entities/testPreps'
export { CommentEntity } from './domain/entities/comments'
export { CourseEntity } from './domain/entities/courses'
export { SetEntity } from './domain/entities/sets'
export { InstitutionEntity } from './domain/entities/institutions'
export { VideoEntity } from './domain/entities/videos'
export { NoteEntity } from './domain/entities/notes'
export { FlashCardEntity } from './domain/entities/flashCards'
export { PastQuestionEntity } from './domain/entities/pastQuestions'
export { TestEntity } from './domain/entities/tests'