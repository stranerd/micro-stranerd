const fs = require('fs')

const appContent = (name) => {
	return {
		development: `runtime: nodejs16
service: ${name}

instance_class: B1

env_variables:
  PORT: 8080

handlers:
  - url: /.*
    script: auto
    secure: always
    redirect_http_response_code: 301

manual_scaling:
  instances: 1`,
		staging: `runtime: nodejs16
service: ${name}

instance_class: B1

env_variables:
  PORT: 8080

handlers:
  - url: /.*
    script: auto
    secure: always
    redirect_http_response_code: 301

manual_scaling:
  instances: 1`,
		production: `runtime: nodejs16
service: ${name}

instance_class: B2

env_variables:
  PORT: 8080

handlers:
  - url: /.*
    script: auto
    secure: always
    redirect_http_response_code: 301

manual_scaling:
  instances: 1`
	}
}

const args = process.argv.slice(2)

if (args.length > 1) {
	const env = args[0]
	const paths = args.slice(1)

	paths.forEach((path) => {
		const allContent = appContent(path)
		const content = allContent[env] ?? allContent['development']

		fs.writeFileSync(`${path}/app.yaml`, content)
	})
} else throw new Error('You need to provide both the environment name and paths')