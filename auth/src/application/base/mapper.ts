/* eslint-disable no-unused-vars */
export abstract class Mapper<Input, Output> {
	abstract mapFrom (param: Input): Promise<Output>

	abstract mapTo (param: Output): Promise<Input>
}