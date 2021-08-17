export enum EventTypes {
	TEST = 'TEST'
}

interface Event<Data> {
	topic: keyof typeof EventTypes;
	data: Data;
}

export interface Events extends Record<EventTypes, Event<any>> {
	TEST: {
		topic: typeof EventTypes.TEST,
		data: string
	}
}