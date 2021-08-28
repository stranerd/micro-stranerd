// This file re-exports every export from the common npm module
// However, while developing, you might want to test out changes you make in the package,
// without having to publish the package, and update the package wherever you plan to use it.

// For standalone mode, everything is exported from the source code of the commons package, so you test your changes immediately
// For production or in docker, everything is exported from the latest version of the commons package published to npm-js

// When running in standalone mode, uncomment this export && comment the other
// export * from '../../../commons/src'

// For production or in docker, uncomment this export && comment the other
export * from '@stranerd/api-commons'


enum Numbers {
	thousand = 10 ** 3,
	million = 10 ** 6,
	billion = 10 ** 9,
	trillion = 10 ** 12,
	quadrillion = 10 ** 15,
	quintillion = 10 ** 18,
}

export const catchDivideByZero = (num: number, den: number) => den === 0 ? 0 : num / den

export const formatNumber = (num: number, dp = 0) => {
	num = Math.abs(num)
	const zerosOfDp = '.' + new Array(dp).fill('0').map((x) => x).join('')
	if (num < Numbers.thousand) return num.toFixed(dp).replace(zerosOfDp, '')
	else if (num < Numbers.million) return (num / Numbers.thousand).toFixed(1).replace('.0', '') + 'k'
	else if (num < Numbers.billion) return (num / Numbers.million).toFixed(1).replace('.0', '') + 'm'
	else if (num < Numbers.trillion) return (num / Numbers.billion).toFixed(1).replace('.0', '') + 'b'
	else if (num < Numbers.quadrillion) return (num / Numbers.trillion).toFixed(1).replace('.0', '') + 'tr'
	else return num.toFixed(0)
}

export const pluralize = (count: number, singular: string, plural: string) => count === 1 ? singular : plural

export const getRandomValue = () => Date.now() + Math.random().toString(36).substr(2)

export const capitalize = (text: string) => text[0].toUpperCase() + text.slice(1).toLowerCase()

export const extractTextFromHTML = (html: string) => html?.trim().replace(/<[^>]+>/g, '') ?? ''

export const getStringCount = (text: string, occ: string) => (text.match(new RegExp(occ, 'gi')) ?? []).length

export const trimToLength = (body: string, length: number) => {
	if (body.length < length) return body
	return `${body.slice(0, length)}...`
}

export const timestampToMs = (timestamp: Date | number | undefined) => {
	if (typeof timestamp === 'number') return timestamp
	return timestamp?.getTime() ?? new Date().getTime()
}
