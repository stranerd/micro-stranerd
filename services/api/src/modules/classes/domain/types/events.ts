export enum EventType {
	timetable = 'timetable',
	oneOff = 'oneOff'
}

export type Cron = {
	day: number
	hour: number
	minute: number
	tz: string
}

type EventTimetableType = {
	lecturer: string
	type: EventType.timetable
	start: Cron
	end: Cron
}

type EventOneOffType = {
	type: EventType.oneOff
	scheduledAt: number
	announcementId: string
}

export type EventDataType = EventTimetableType | EventOneOffType