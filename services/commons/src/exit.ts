const listeners = [] as any

export const addWaitBeforeExit = (fn: any) => {
	listeners.push(fn)
}

const signals = {
	SIGHUP: 1,
	SIGINT: 2,
	SIGTERM: 15
}

Object.entries(signals).forEach(([signal, code]) => {
	process.on(signal, async () => {
		console.log(signal, 'called: Closing out', listeners.length, 'activities')
		await Promise.all(listeners.map((l) => typeof l === 'function' ? l() : l))
		process.exit(128 + code)
	})
})