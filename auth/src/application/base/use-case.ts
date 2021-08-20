/* eslint-disable no-unused-vars */
export abstract class UseCase<Request, Response> {
	abstract execute (params: Request): Promise<Response>
}