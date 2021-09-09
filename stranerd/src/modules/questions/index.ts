import {
	AnswerCommentRepository,
	AnswerRepository,
	AnswerUpvoteRepository,
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
import { GetAnswerCommentsUseCase } from './domain/useCases/answerComments/getAnswerComments'
import { FindAnswerCommentUseCase } from './domain/useCases/answerComments/findAnswerComment'
import { AddAnswerCommentUseCase } from './domain/useCases/answerComments/addAnswerComment'
import { GetAnswersUseCase } from './domain/useCases/answers/getAnswers'
import { AddAnswerUseCase } from './domain/useCases/answers/addAnswer'
import { FindAnswerUseCase } from './domain/useCases/answers/findAnswer'
import { DeleteAnswerUseCase } from './domain/useCases/answers/deleteAnswer'
import { UpdateAnswerUseCase } from './domain/useCases/answers/updateAnswer'
import { GetQuestionsUseCase } from './domain/useCases/questions/getQuestions'
import { FindQuestionUseCase } from './domain/useCases/questions/findQuestion'
import { AddQuestionUseCase } from './domain/useCases/questions/addQuestion'
import { UpdateQuestionUseCase } from './domain/useCases/questions/updateQuestion'
import { DeleteQuestionUseCase } from './domain/useCases/questions/deleteQuestion'
import { DeleteQuestionAnswersUseCase } from './domain/useCases/answers/deleteQuestionAnswers'
import { ModifyCommentsCountUseCase } from './domain/useCases/answers/modifyCommentsCount'
import { UpdateAnswersUserBioUseCase } from './domain/useCases/answers/updateAnswersUserBio'
import { UpdateQuestionAnswersTagsUseCase } from './domain/useCases/answers/updateQuestionAnswersTags'
import { MarkBestAnswerUseCase } from './domain/useCases/questions/markBestAnswer'
import { ModifyAnswersUseCase } from './domain/useCases/questions/modifyAnswers'
import { RemoveBestAnswerUseCase } from './domain/useCases/questions/removeBestAnswer'
import { UpdateQuestionsUserBioUseCase } from './domain/useCases/questions/updateQuestionsUserBio'
import { GetAnswerUpvotesUseCase } from './domain/useCases/answerUpvotes/getAnswerUpvotes'
import { FindAnswerUpvoteUseCase } from './domain/useCases/answerUpvotes/findAnswerUpvote'
import { CreateAnswerUpvoteUseCase } from './domain/useCases/answerUpvotes/createAnswerUpvote'
import { CreateAnswerDownvoteUseCase } from './domain/useCases/answerUpvotes/createAnswerDownvote'
import { DeleteAnswersCommentsUseCase } from './domain/useCases/answerComments/deleteAnswerComments'
import { UpdateAnswerCommentsUserBioUseCase } from './domain/useCases/answerComments/updateAnswerCommentsUserBio'

const tagRepository = TagRepository.getInstance()
const subjectRepository = SubjectRepository.getInstance()
const answerCommentRepository = AnswerCommentRepository.getInstance()
const answerRepository = AnswerRepository.getInstance()
const questionRepository = QuestionRepository.getInstance()
const answerUpvoteRepository = AnswerUpvoteRepository.getInstance()

export const FindTag = new FindTagUseCase(tagRepository)
export const GetTags = new GetTagsUseCase(tagRepository)
export const UpdateTagsCount = new UpdateCountUseCase(tagRepository)

export const AddSubject = new AddSubjectUseCase(subjectRepository)
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
export const ModifyCommentsCount = new ModifyCommentsCountUseCase(answerRepository)
export const UpdateAnswersUserBio = new UpdateAnswersUserBioUseCase(answerRepository)
export const UpdateQuestionAnswersTags = new UpdateQuestionAnswersTagsUseCase(answerRepository)

export const GetQuestions = new GetQuestionsUseCase(questionRepository)
export const FindQuestion = new FindQuestionUseCase(questionRepository)
export const AddQuestion = new AddQuestionUseCase(questionRepository)
export const UpdateQuestion = new UpdateQuestionUseCase(questionRepository)
export const DeleteQuestion = new DeleteQuestionUseCase(questionRepository)
export const MarkBestAnswer = new MarkBestAnswerUseCase(questionRepository)
export const ModifyAnswers = new ModifyAnswersUseCase(questionRepository)
export const RemoveBestAnswer = new RemoveBestAnswerUseCase(questionRepository)
export const UpdateQuestionsUserBio = new UpdateQuestionsUserBioUseCase(questionRepository)

export const GetAnswerUpvotes = new GetAnswerUpvotesUseCase(answerUpvoteRepository)
export const FindAnswerUpvote = new FindAnswerUpvoteUseCase(answerUpvoteRepository)
export const CreateAnswerUpvote = new CreateAnswerUpvoteUseCase(answerUpvoteRepository)
export const CreateAnswerDownvote = new CreateAnswerDownvoteUseCase(answerUpvoteRepository)