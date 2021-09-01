import { IAnswerRepository } from '../../questions/domain/irepositories/answers'
import { IQuestionRepository } from '../../questions/domain/irepositories/questions'
import { IUserRepository } from '../../users/domain/i-repositories/users'
import { BaseUseCase } from '@utils/commons'
import { SearchResult } from '../types/searchResult'

export class SearchModulesUseCase extends BaseUseCase<string,SearchResult> {
	private userRepository: IUserRepository
	private questionRespository: IQuestionRepository
	private answerRepository: IAnswerRepository

	private limit = 10

	constructor (userRepository: IUserRepository, questionRespository:IQuestionRepository, answerRepository: IAnswerRepository ) {
		super()
		this.userRepository = userRepository
		this.questionRespository = questionRespository
		this.answerRepository = answerRepository
	}

	async execute (searchText: string): Promise<SearchResult> {


		const query = {
			$text: {$search: searchText}
		}

		return  {
			users: await this.userRepository.search(query,this.limit),
			questions: await this.questionRespository.search(query,this.limit),
			answers: await this.answerRepository.search(query,this.limit)	
		}
        
	}
}
