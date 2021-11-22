export const catchDivideByZero = (num: number, den: number) => den === 0 ? 0 : num / den

export const getPercentage = (num: number, den: number) => 100 * (catchDivideByZero(num, den) > 1 ? 1 : catchDivideByZero(num, den))

export const getDateDifference = (date1: Date, date2: Date) => {
	const isSameDay = (date1: Date, date2: Date) => date1.getDate() === date2.getDate() &&
		date1.getMonth() === date2.getMonth() &&
		date1.getFullYear() === date2.getFullYear()
	const res = { isLessThan: false, isNextDay: false }
	res.isLessThan = date2 <= date1 || isSameDay(date1, date2)
	const start = new Date(
		date1.getFullYear(),
		date1.getMonth(),
		date1.getDate() + 2,
		0, 0, 0
	)
	res.isNextDay = date2 < start
	return res
}

export function getRandomN<Type> (population: Array<Type>, n: number) {
	const result = new Array<Type>(n)
	let setsize = 21

	if (n > 5) setsize += Math.pow(4, Math.ceil(Math.log(n * 3) / Math.log(4)))

	if (n <= setsize) {
		const pool = population.slice()
		for (let i = 0; i < n; i++) {
			const j = Math.random() * (n - i) | 0
			result[i] = pool[j]
			pool[j] = pool[n - i - 1]
		}
	} else {
		const selected = new Set()
		for (let i = 0; i < n; i++) {
			let j = Math.random() * n | 0
			while (selected.has(j)) j = Math.random() * n | 0
			selected.add(j)
			result[i] = population[j]
		}
	}

	return result
}