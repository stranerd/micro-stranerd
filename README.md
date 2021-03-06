# Stranerd MicroService Api

## Development

#### Software requirements: docker, docker-compose, git, make

```bash
# Setup

# clone project
$ git clone https://github.com/stranerd/micro-stranerd
# setup git hooks
$ npx husky install
# create symbolic links for commons
$ make link-commons
# install dependencies for all microservices
$ make install-all
# copy env.example.json to env.json & fill in all env values in env.json
$ cp env.example.json env.json
# run to populate .envs in all services with values from env.json
$ make copy-envs
```

```bash
# Run project

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
# Lint entire codebase
# ensure all microservices have a lint script defined in it
$ make lint-all
```

To make user in rabbitmq:

1. Run ```docker-compose exec rabbitmq rabbitmqctl add_user username password```
2. Run ```docker-compose exec rabbitmq rabbitmqctl set_user_tags username administrator```
3. Run ```docker-compose exec rabbitmq rabbitmqctl set_permissions -p / username ".*" ".*" ".*"```
4. Update env.json with new rabbitmq username and password and run ```make copy-envs``` to populate all .envs
