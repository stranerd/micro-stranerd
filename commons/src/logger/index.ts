import { ConsoleLogger, Logger } from './logger'

export const getNewLoggerInstance = () :Logger => new ConsoleLogger()