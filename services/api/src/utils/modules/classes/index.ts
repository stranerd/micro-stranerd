import { Cron } from '@modules/classes'

export const getCronString = (cron: Cron) => {
	const { day, hour, minute } = cron
	return `${minute % 60} ${hour % 24} * * ${day % 7}`
}

const getBaseConv = (num: number, base: number) => num >= 0 ? num % base : base + (num % base)

export const addCron = (cron: Cron, addMinutes: number) => {
	const min = cron.minute + addMinutes
	const hr = cron.hour + Math.floor(min / 60)
	const day = cron.day + Math.floor(hr / 24)
	return {
		...cron,
		minute: getBaseConv(min, 60),
		hour: getBaseConv(hr, 24),
		day: getBaseConv(day, 7)
	}
}