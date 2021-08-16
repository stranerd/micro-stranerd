export enum EventTypes {}

export interface Event<Data> {
	type: EventTypes;
	data: Data;
}