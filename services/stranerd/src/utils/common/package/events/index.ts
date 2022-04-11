import { EventBus } from './events'

let eventBus: EventBus | null = null
export const getEventBus = () => {
	if (!eventBus) eventBus = new EventBus
	return eventBus
}