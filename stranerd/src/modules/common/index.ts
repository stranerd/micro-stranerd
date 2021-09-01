import {
	UserRepository
} from '../users/data/repositories/users'

import {
	AnswerRepository,
	QuestionRepository,
} from '../questions/data/repositories'

import { SearchModulesUseCase } from './useCases/searchModules'

const userRepository = UserRepository.getInstance()
const answerRepository = AnswerRepository.getInstance()
const questionRepository = QuestionRepository.getInstance()

export const SearchModules = new SearchModulesUseCase(userRepository,questionRepository,answerRepository)
