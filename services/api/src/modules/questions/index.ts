import { AnswerRepository } from './data/repositories/answers'
import { QuestionRepository } from './data/repositories/questions'
import { AnswersUseCase } from './domain/useCases/answers'
import { QuestionsUseCase } from './domain/useCases/questions'

const answerRepository = AnswerRepository.getInstance()
const questionRepository = QuestionRepository.getInstance()

export const AnswersUseCases = new AnswersUseCase(answerRepository)
export const QuestionsUseCases = new QuestionsUseCase(questionRepository)

export { AnswerFromModel } from './data/models/answers'
export { QuestionFromModel } from './data/models/questions'

export { AnswerEntity } from './domain/entities/answers'
export { QuestionEntity } from './domain/entities/questions'
export { AnswerMetaType, QuestionMetaType } from './domain/types'
