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
import { IncrementTagCountUseCase } from './domain/useCases/tags/incrementTagCount'
import { DecrementTagCountUseCase } from './domain/useCases/tags/decrementTagCount'
import { AddSubjectUseCase } from './domain/useCases/subjects/addSubject'
import { DeleteSubjectUseCase } from './domain/useCases/subjects/deleteSubject'
import { FindSubjectUseCase } from './domain/useCases/subjects/findSubject'
import { GetSubjectsUseCase } from './domain/useCases/subjects/getSubjects'
import { UpdateSubjectUseCase } from './domain/useCases/subjects/updateSubject'
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
import { GetAnswerUpvotesUseCase } from './domain/useCases/answerUpvotes/getAnswerUpvotes'
import { FindAnswerUpvoteUseCase } from './domain/useCases/answerUpvotes/findAnswerUpvote'
import { CreateAnswerUpvoteUseCase } from './domain/useCases/answerUpvotes/createAnswerUpvote'
import { CreateAnswerDownvoteUseCase } from './domain/useCases/answerUpvotes/createAnswerDownvote'

const tagRepository = TagRepository.getInstance()
const subjectRepository = SubjectRepository.getInstance()
const answerCommentRepository = AnswerCommentRepository.getInstance()
const answerRepository = AnswerRepository.getInstance()
const questionRepository = QuestionRepository.getInstance()
const answerUpvoteRepository = AnswerUpvoteRepository.getInstance()

export const FindTag = new FindTagUseCase(tagRepository)
export const GetTags = new GetTagsUseCase(tagRepository)
export const IncrementTagCount = new IncrementTagCountUseCase(tagRepository)
export const DecrementTagCount = new DecrementTagCountUseCase(tagRepository)

export const AddSubject = new AddSubjectUseCase(subjectRepository)
export const DeleteSubject = new DeleteSubjectUseCase(subjectRepository)
export const FindSubject = new FindSubjectUseCase(subjectRepository)
export const GetSubjects = new GetSubjectsUseCase(subjectRepository)
export const UpdateSubject = new UpdateSubjectUseCase(subjectRepository)

export const GetAnswerComments = new GetAnswerCommentsUseCase(answerCommentRepository)
export const FindAnswerComment = new FindAnswerCommentUseCase(answerCommentRepository)
export const AddAnswerComment = new AddAnswerCommentUseCase(answerCommentRepository)

export const GetAnswers = new GetAnswersUseCase(answerRepository)
export const FindAnswer = new FindAnswerUseCase(answerRepository)
export const AddAnswer = new AddAnswerUseCase(answerRepository)
export const UpdateAnswer = new UpdateAnswerUseCase(answerRepository)
export const DeleteAnswer = new DeleteAnswerUseCase(answerRepository)

export const GetQuestions = new GetQuestionsUseCase(questionRepository)
export const FindQuestion = new FindQuestionUseCase(questionRepository)
export const AddQuestion = new AddQuestionUseCase(questionRepository)
export const UpdateQuestion = new UpdateQuestionUseCase(questionRepository)
export const DeleteQuestion = new DeleteQuestionUseCase(questionRepository)

export const GetAnswerUpvotes = new GetAnswerUpvotesUseCase(answerUpvoteRepository)
export const FindAnswerUpvote = new FindAnswerUpvoteUseCase(answerUpvoteRepository)
export const CreateAnswerUpvote = new CreateAnswerUpvoteUseCase(answerUpvoteRepository)
export const CreateAnswerDownvote = new CreateAnswerDownvoteUseCase(answerUpvoteRepository)