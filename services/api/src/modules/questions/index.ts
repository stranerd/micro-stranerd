import { AnswerRepository } from './data/repositories/answers'
import { QuestionRepository } from './data/repositories/questions'
import { TagRepository } from './data/repositories/tags'
import { AnswersUseCase } from './domain/useCases/answers'
import { QuestionsUseCase } from './domain/useCases/questions'
import { TagsUseCase } from './domain/useCases/tags'

const answerRepository = AnswerRepository.getInstance()
const questionRepository = QuestionRepository.getInstance()
const tagRepository = TagRepository.getInstance()

export const AnswersUseCases = new AnswersUseCase(answerRepository)
export const QuestionsUseCases = new QuestionsUseCase(questionRepository)
export const TagsUseCases = new TagsUseCase(tagRepository)

export { AnswerFromModel } from './data/models/answers'
export { QuestionFromModel } from './data/models/questions'
export { TagFromModel } from './data/models/tags'

export { AnswerEntity } from './domain/entities/answers'
export { QuestionEntity } from './domain/entities/questions'
export { TagEntity } from './domain/entities/tags'
export { AnswerMetaType } from './domain/types'
