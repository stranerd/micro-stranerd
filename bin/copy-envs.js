const fs = require('fs')

const paths = process.argv.slice(2)

if (fs.existsSync('env.json')) {
	const content = fs.readFileSync('env.json').toString()
	const envs = JSON.parse(content)
	paths.forEach((path) => {
		const entries = Object.entries({
			...envs['general'],
			...envs[path]
		}).map(([key, value]) => ([key, typeof value === 'string' ? value : JSON.stringify(value)]))
		const envFormattedEntries = entries.reduce((accumulator, currentValue) => {
			const [key, value] = currentValue
			return accumulator + `${ key.toUpperCase() }=${ value }\n`
		}, '')
		fs.writeFileSync(`${ path }/.env`, envFormattedEntries)
	})
} else throw new Error('Env.json doesn\'t exist. Try creating one by copying the env.example.json')
