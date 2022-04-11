import { ConsoleLogger, Logger as Log } from './logger'

let logger: Log | null = null
export const getLogger = () => {
	if (!logger) logger = new ConsoleLogger()
	return logger
}
export const Logger: Log = new ConsoleLogger()