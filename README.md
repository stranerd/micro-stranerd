# Stranerd MicroService Api

## Development
#### Software requirements: docker, docker-compose, git, make
```bash
# Setup
# clone project
$ git clone https://github.com/stranerd/micro-stranerd
# install dependencies for all microservices
$ make install-all
```

```bash
# Running project
# start all containers without detach
$ make dev-start
# start all containers in detach mode
$ make dev-start-detach
# check logs if started in detach mode
$ make watch-logs
# stop all containers if started in detach mode
$ make dev-stop

# run in production mode without detach
$ make prod-start
```

```bash
# New microservice
# A detailed example microservice has been defined in the microservice - example
# Use that as a starting point for any service that runs in javascript
```

```bash
# Lint entire codebase
# ensure all microservices have a lint script defined in it
$ make lint-all
```