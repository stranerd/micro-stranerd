import { UserEntity } from '../../users/domain/entities/users'
import { QuestionEntity } from '../../questions/domain/entities/questions'
import { AnswerEntity } from '../../questions/domain/entities/answers'

export type SearchResult = {
	users: UserEntity[]
	questions: QuestionEntity[]
	answers: AnswerEntity[]
}