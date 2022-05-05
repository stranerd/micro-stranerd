export enum EventType {
	repeatable = 'repeatable',
	oneOff = 'oneOff'
}

type EventRepeatableType = {
	type: EventType.repeatable
	cron: string
}

type EventOneOffType = {
	type: EventType.oneOff
	occurredAt: number
}

export type EventDataType = EventRepeatableType | EventOneOffType