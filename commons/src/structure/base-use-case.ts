export abstract class UseCase<Input, Output> {
	abstract execute (params: Input): Promise<Output>
}