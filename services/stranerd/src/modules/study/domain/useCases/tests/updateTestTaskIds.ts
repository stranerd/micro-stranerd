import { ITestRepository } from '../../irepositories/tests'
import { BaseUseCase } from '@utils/commons'
import { TaskID } from '../../types'

type Input = {
	testId: string
	taskIds: TaskID[]
}

export class UpdateTestTaskIdsUseCase extends BaseUseCase<Input, void> {
	private repository: ITestRepository

	constructor (repository: ITestRepository) {
		super()
		this.repository = repository
	}

	async execute (input: Input) {
		return await this.repository.updateTaskIds(input.testId, input.taskIds)
	}
}