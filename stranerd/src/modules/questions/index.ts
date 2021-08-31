import {
	AnswerCommentRepository,
	AnswerRepository,
	QuestionRepository,
	SubjectRepository,
	TagRepository
} from './data/repositories'
import { FindTagUseCase } from './domain/useCases/tags/findTag'
import { GetTagsUseCase } from './domain/useCases/tags/getTags'
import { UpdateCountUseCase } from './domain/useCases/tags/updateTagCount'
import { AddSubjectUseCase } from './domain/useCases/subjects/addSubject'
import { DeleteSubjectUseCase } from './domain/useCases/subjects/deleteSubject'
import { FindSubjectUseCase } from './domain/useCases/subjects/findSubject'
import { GetSubjectsUseCase } from './domain/useCases/subjects/getSubjects'
import { UpdateSubjectUseCase } from './domain/useCases/subjects/updateSubject'
import { GetAnswerCommentsUseCase } from './domain/useCases/comments/getAnswerComments'
import { FindAnswerCommentUseCase } from './domain/useCases/comments/findAnswerComment'
import { AddAnswerCommentUseCase } from './domain/useCases/comments/addAnswerComment'
import { GetAnswersUseCase } from './domain/useCases/answers/getAnswers'
import { AddAnswerUseCase } from './domain/useCases/answers/addAnswer'
import { FindAnswerUseCase } from './domain/useCases/answers/findAnswer'
import { DeleteAnswerUseCase } from './domain/useCases/answers/deleteAnswer'
import { MarkAsBestAnswerUseCase } from './domain/useCases/answers/markAsBestAnswer'
import { RateAnswerUseCase } from './domain/useCases/answers/rateAnswer'
import { UpdateAnswerUseCase } from './domain/useCases/answers/updateAnswer'
import { GetQuestionsUseCase } from './domain/useCases/questions/getQuestions'
import { FindQuestionUseCase } from './domain/useCases/questions/findQuestion'
import { AddQuestionUseCase } from './domain/useCases/questions/addQuestion'
import { UpdateQuestionUseCase } from './domain/useCases/questions/updateQuestion'
import { DeleteQuestionUseCase } from './domain/useCases/questions/deleteQuestion'
import { DeletQuestionAnswersUseCase } from './domain/useCases/answers/deleteQuestionAnswers'
import { ModifyCommentCountUseCase } from './domain/useCases/answers/modifyCommentCount'
import { UpdateAnswerUserBioUseCase } from './domain/useCases/answers/updateAnswerUserBio'
import { DeletAnswerCommentsUseCase } from './domain/useCases/comments/deleteAnswerComment'
import { MarkBestAnswerUseCase } from './domain/useCases/questions/markBestAnswer'
import { ModifyAnswerCountUseCase } from './domain/useCases/questions/modifyAnswerCount'
import { RemoveBestAnswersUseCase } from './domain/useCases/questions/removeBestAnswers'
import { UpdateQuestionUserBioUseCase } from './domain/useCases/questions/updateQuestionUserBio'

const tagRepository = TagRepository.getInstance()
const subjectRepository = SubjectRepository.getInstance()
const answerCommentRepository = AnswerCommentRepository.getInstance()
const answerRepository = AnswerRepository.getInstance()
const questionRepository = QuestionRepository.getInstance()

export const FindTag = new FindTagUseCase(tagRepository)
export const GetTags = new GetTagsUseCase(tagRepository)
export const UpdateTagsCount = new UpdateCountUseCase(tagRepository)

export const AddSubject = new AddSubjectUseCase(subjectRepository)
export const DeleteSubject = new DeleteSubjectUseCase(subjectRepository)
export const FindSubject = new FindSubjectUseCase(subjectRepository)
export const GetSubjects = new GetSubjectsUseCase(subjectRepository)
export const UpdateSubject = new UpdateSubjectUseCase(subjectRepository)

export const GetAnswerComments = new GetAnswerCommentsUseCase(answerCommentRepository)
export const FindAnswerComment = new FindAnswerCommentUseCase(answerCommentRepository)
export const AddAnswerComment = new AddAnswerCommentUseCase(answerCommentRepository)
export const DeletAnswerComments = new DeletAnswerCommentsUseCase(answerCommentRepository)

export const GetAnswers = new GetAnswersUseCase(answerRepository)
export const FindAnswer = new FindAnswerUseCase(answerRepository)
export const AddAnswer = new AddAnswerUseCase(answerRepository)
export const UpdateAnswer = new UpdateAnswerUseCase(answerRepository)
export const DeleteAnswer = new DeleteAnswerUseCase(answerRepository)
export const MarkAsBestAnswer = new MarkAsBestAnswerUseCase(answerRepository)
export const RateAnswer = new RateAnswerUseCase(answerRepository)
export const DeletQuestionAnswers = new DeletQuestionAnswersUseCase(answerRepository)
export const ModifyCommentCount = new ModifyCommentCountUseCase(answerRepository)
export const UpdateAnswerUserBio = new UpdateAnswerUserBioUseCase(answerRepository)

export const GetQuestions = new GetQuestionsUseCase(questionRepository)
export const FindQuestion = new FindQuestionUseCase(questionRepository)
export const AddQuestion = new AddQuestionUseCase(questionRepository)
export const UpdateQuestion = new UpdateQuestionUseCase(questionRepository)
export const DeleteQuestion = new DeleteQuestionUseCase(questionRepository)
export const MarkBestAnswer = new MarkBestAnswerUseCase(questionRepository)
export const ModifyAnswerCount = new ModifyAnswerCountUseCase(questionRepository)
export const RemoveBestAnswers = new RemoveBestAnswersUseCase(questionRepository)
export const UpdateQuestionUserBio = new UpdateQuestionUserBioUseCase(questionRepository)
