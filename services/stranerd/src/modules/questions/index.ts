import { AnswerCommentRepository } from './data/repositories/answerComments'
import { AnswerRepository } from './data/repositories/answers'
import { AnswerUpvoteRepository } from './data/repositories/answerUpvotes'
import { QuestionRepository } from './data/repositories/questions'
import { SubjectRepository } from './data/repositories/subjects'
import { AddSubjectUseCase } from './domain/useCases/subjects/addSubject'
import { UpdateSubjectUseCase } from './domain/useCases/subjects/updateSubject'
import { DeleteSubjectUseCase } from './domain/useCases/subjects/deleteSubject'
import { FindSubjectUseCase } from './domain/useCases/subjects/findSubject'
import { GetSubjectsUseCase } from './domain/useCases/subjects/getSubjects'
import { GetAnswerCommentsUseCase } from './domain/useCases/answerComments/getAnswerComments'
import { FindAnswerCommentUseCase } from './domain/useCases/answerComments/findAnswerComment'
import { DeleteAnswersCommentsUseCase } from './domain/useCases/answerComments/deleteAnswerComments'
import { UpdateAnswerCommentsUserBioUseCase } from './domain/useCases/answerComments/updateAnswerCommentsUserBio'
import { AddAnswerCommentUseCase } from './domain/useCases/answerComments/addAnswerComment'
import { GetAnswersUseCase } from './domain/useCases/answers/getAnswers'
import { AddAnswerUseCase } from './domain/useCases/answers/addAnswer'
import { FindAnswerUseCase } from './domain/useCases/answers/findAnswer'
import { DeleteAnswerUseCase } from './domain/useCases/answers/deleteAnswer'
import { UpdateAnswerUseCase } from './domain/useCases/answers/updateAnswer'
import { UpdateAnswersCommentsCountUseCase } from './domain/useCases/answers/updateAnswersCommentsCount'
import { UpdateAnswersUserBioUseCase } from './domain/useCases/answers/updateAnswersUserBio'
import { DeleteQuestionAnswersUseCase } from './domain/useCases/answers/deleteQuestionAnswers'
import { GetQuestionsUseCase } from './domain/useCases/questions/getQuestions'
import { FindQuestionUseCase } from './domain/useCases/questions/findQuestion'
import { AddQuestionUseCase } from './domain/useCases/questions/addQuestion'
import { UpdateQuestionUseCase } from './domain/useCases/questions/updateQuestion'
import { DeleteQuestionUseCase } from './domain/useCases/questions/deleteQuestion'
import { UpdateBestAnswerUseCase } from './domain/useCases/questions/updateBestAnswer'
import { UpdateQuestionsAnswersUseCase } from './domain/useCases/questions/updateQuestionsAnswers'
import { UpdateQuestionsUserBioUseCase } from './domain/useCases/questions/updateQuestionsUserBio'
import { UpdateQuestionsClassNameUseCase } from './domain/useCases/questions/updateQuestionsClassName'
import { CreateAnswerUpvoteUseCase } from './domain/useCases/answerUpvotes/createAnswerUpvote'
import { GetAnswerUpvotesUseCase } from './domain/useCases/answerUpvotes/getAnswerUpvotes'
import { FindAnswerUpvoteUseCase } from './domain/useCases/answerUpvotes/findAnswerUpvote'

const subjectRepository = SubjectRepository.getInstance()
const answerCommentRepository = AnswerCommentRepository.getInstance()
const answerRepository = AnswerRepository.getInstance()
const questionRepository = QuestionRepository.getInstance()
const answerUpvoteRepository = AnswerUpvoteRepository.getInstance()

export const AddSubject = new AddSubjectUseCase(subjectRepository)
export const UpdateSubject = new UpdateSubjectUseCase(subjectRepository)
export const DeleteSubject = new DeleteSubjectUseCase(subjectRepository)
export const FindSubject = new FindSubjectUseCase(subjectRepository)
export const GetSubjects = new GetSubjectsUseCase(subjectRepository)

export const GetAnswerComments = new GetAnswerCommentsUseCase(answerCommentRepository)
export const FindAnswerComment = new FindAnswerCommentUseCase(answerCommentRepository)
export const AddAnswerComment = new AddAnswerCommentUseCase(answerCommentRepository)
export const DeleteAnswerComments = new DeleteAnswersCommentsUseCase(answerCommentRepository)
export const UpdateAnswerCommentsUserBio = new UpdateAnswerCommentsUserBioUseCase(answerCommentRepository)

export const GetAnswers = new GetAnswersUseCase(answerRepository)
export const FindAnswer = new FindAnswerUseCase(answerRepository)
export const AddAnswer = new AddAnswerUseCase(answerRepository)
export const UpdateAnswer = new UpdateAnswerUseCase(answerRepository)
export const DeleteAnswer = new DeleteAnswerUseCase(answerRepository)
export const DeleteQuestionAnswers = new DeleteQuestionAnswersUseCase(answerRepository)
export const UpdateAnswersCommentsCount = new UpdateAnswersCommentsCountUseCase(answerRepository)
export const UpdateAnswersUserBio = new UpdateAnswersUserBioUseCase(answerRepository)

export const GetQuestions = new GetQuestionsUseCase(questionRepository)
export const FindQuestion = new FindQuestionUseCase(questionRepository)
export const AddQuestion = new AddQuestionUseCase(questionRepository)
export const UpdateQuestion = new UpdateQuestionUseCase(questionRepository)
export const DeleteQuestion = new DeleteQuestionUseCase(questionRepository)
export const UpdateBestAnswer = new UpdateBestAnswerUseCase(questionRepository)
export const UpdateQuestionsAnswers = new UpdateQuestionsAnswersUseCase(questionRepository)
export const UpdateQuestionsUserBio = new UpdateQuestionsUserBioUseCase(questionRepository)
export const UpdateQuestionsClassName = new UpdateQuestionsClassNameUseCase(questionRepository)

export const GetAnswerUpvotes = new GetAnswerUpvotesUseCase(answerUpvoteRepository)
export const FindAnswerUpvote = new FindAnswerUpvoteUseCase(answerUpvoteRepository)
export const CreateAnswerUpvote = new CreateAnswerUpvoteUseCase(answerUpvoteRepository)

export { AnswerCommentFromModel } from './data/models/answerComments'
export { AnswerFromModel } from './data/models/answers'
export { AnswerUpvoteFromModel } from './data/models/answerUpvotes'
export { QuestionFromModel } from './data/models/questions'
export { SubjectFromModel } from './data/models/subjects'

export { AnswerCommentEntity } from './domain/entities/answerComments'
export { AnswerEntity } from './domain/entities/answers'
export { AnswerUpvoteEntity } from './domain/entities/answerUpvotes'
export { QuestionEntity } from './domain/entities/questions'
export { SubjectEntity } from './domain/entities/subjects'

export { QuestionType } from './domain/types'