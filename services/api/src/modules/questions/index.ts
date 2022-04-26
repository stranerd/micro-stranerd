import { AnswerCommentRepository } from './data/repositories/answerComments'
import { AnswerRepository } from './data/repositories/answers'
import { AnswerUpvoteRepository } from './data/repositories/answerUpvotes'
import { QuestionRepository } from './data/repositories/questions'
import { AnswerCommentsUseCase } from './domain/useCases/answerComments'
import { AnswersUseCase } from './domain/useCases/answers'
import { QuestionsUseCase } from './domain/useCases/questions'
import { AnswerUpvotesUseCase } from './domain/useCases/answerUpvotes'

const answerCommentRepository = AnswerCommentRepository.getInstance()
const answerRepository = AnswerRepository.getInstance()
const questionRepository = QuestionRepository.getInstance()
const answerUpvoteRepository = AnswerUpvoteRepository.getInstance()

export const AnswerCommentsUseCases = new AnswerCommentsUseCase(answerCommentRepository)
export const AnswersUseCases = new AnswersUseCase(answerRepository)
export const QuestionsUseCases = new QuestionsUseCase(questionRepository)
export const AnswerUpvotesUseCases = new AnswerUpvotesUseCase(answerUpvoteRepository)

export { AnswerCommentFromModel } from './data/models/answerComments'
export { AnswerFromModel } from './data/models/answers'
export { AnswerUpvoteFromModel } from './data/models/answerUpvotes'
export { QuestionFromModel } from './data/models/questions'

export { AnswerCommentEntity } from './domain/entities/answerComments'
export { AnswerEntity } from './domain/entities/answers'
export { AnswerUpvoteEntity } from './domain/entities/answerUpvotes'
export { QuestionEntity } from './domain/entities/questions'

export { QuestionType } from './domain/types'