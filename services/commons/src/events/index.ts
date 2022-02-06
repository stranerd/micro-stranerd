import { EventBus } from './events'

export * from './eventTypes'
export * from './types/push'

export const eventBus = new EventBus()