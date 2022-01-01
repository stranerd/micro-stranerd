const fs = require('fs')

const appContent = (name) => {
	return {
		development: `runtime: custom
service: ${name}
env: flex

network:
  session_affinity: true

handlers:
  - url: /.*
    script: auto
    secure: always
    redirect_http_response_code: 301

resources:
  cpu: 1
  memory_gb: 0.5
  disk_size_gb: 10

manual_scaling:
  instances: 1`,
		staging: `runtime: custom
service: ${name}
env: flex

network:
  session_affinity: true

handlers:
  - url: /.*
    script: auto
    secure: always
    redirect_http_response_code: 301
    
resources:
  cpu: 1
  memory_gb: 0.5
  disk_size_gb: 10

manual_scaling:
  instances: 1`,
		production: `runtime: custom
service: ${name}
env: flex

network:
  session_affinity: true

handlers:
  - url: /.*
    script: auto
    secure: always
    redirect_http_response_code: 301

resources:
  cpu: 1
  memory_gb: 2
  disk_size_gb: 10

manual_scaling:
  instances: 1`
	}
}

const args = process.argv.slice(2)

if (args.length > 1) {
	const env = args[0]
	const paths = args.slice(1)

	paths.forEach((path) => {
		const allContent = appContent(path + 'flex')
		const content = allContent[env] ?? allContent['development']

		fs.writeFileSync(`./services/${path}/app.yaml`, content)
	})
} else throw new Error('You need to provide both the environment name and paths')
