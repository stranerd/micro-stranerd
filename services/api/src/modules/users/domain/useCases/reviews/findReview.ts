import { BaseUseCase } from '@utils/commons'
import { ReviewEntity } from '../../entities/reviews'
import { IReviewRepository } from '../../i-repositories/reviews'

export class FindReviewUseCase implements BaseUseCase<string, ReviewEntity | null> {
	repository: IReviewRepository

	constructor (repo: IReviewRepository) {
		this.repository = repo
	}

	async execute (input: string) {
		return await this.repository.findReview(input)
	}
}