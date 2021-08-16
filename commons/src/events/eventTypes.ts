export enum EventTypes {}

export interface Event<Data> {
	topic: EventTypes;
	data: Data;
}