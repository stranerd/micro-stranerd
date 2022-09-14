export abstract class Logger {
	abstract success (...args: any[]): Promise<void>

	abstract info (...args: any[]): Promise<void>

	abstract warn (...args: any[]): Promise<void>

	abstract error (...args: any[]): Promise<void>
}

export class ConsoleLogger extends Logger {
	// eslint-disable-next-line no-console
	log = console.log

	async error (...args: any[]) {
		this.log('LOG:ERROR:', ...args)
	}

	async success (...args: any[]) {
		this.log('LOG:SUCCESS:', ...args)
	}

	async info (...args: any[]) {
		this.log('LOG:INFO:', ...args)
	}

	async warn (...args: any[]) {
		this.log('LOG:WARN:', ...args)
	}
}