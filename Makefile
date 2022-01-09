APPS = auth stranerd utils
COMMONS = commons
ALL_FOLDERS = ${APPS} ${COMMONS}
args = $(filter-out $@,$(MAKECMDGOALS))

make-acme:
	touch ./docker/traefik/acme.json && chmod 600 ./docker/traefik/acme.json

dev-start:
	make make-acme && docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build --remove-orphans;

dev-start-detach:
	make make-acme && docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build -d --remove-orphans;

dev-stop:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml down --remove-orphans;

dev-watch-logs:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml logs -f;

prod-build:
	docker-compose -f docker-compose.yml build;

prod-start:
	make make-acme && docker-compose -f docker-compose.yml up --remove-orphans;

prod-start-detach:
	make make-acme && docker-compose -f docker-compose.yml up -d --remove-orphans;

prod-stop:
	docker-compose -f docker-compose.yml down --remove-orphans;

prod-watch-logs:
	docker-compose -f docker-compose.yml logs -f;

install-all:
	$(foreach folder, $(ALL_FOLDERS), yarn --cwd ./services/$(folder) &&) echo

lint-all:
	$(foreach folder, $(ALL_FOLDERS), yarn --cwd ./services/$(folder) lint &&) echo

build-all:
	$(foreach folder, $(ALL_FOLDERS), yarn --cwd ./services/$(folder) build &&) echo

publish-commons:
	yarn --cwd ./services/${COMMONS} pub;

pub-and-inst:
	make publish-commons && make install-commons

install-commons:
	$(foreach app, $(APPS), yarn --cwd ./services/$(app) add @stranerd/api-commons@latest &&) echo

copy-envs:
	node bin/copy-envs.js $(APPS);

link-commons:
	$(foreach app, $(APPS),\
	rm ./services/$(app)/src/utils/commons.ts &&\
	ln ./services/commons/links/commons.ts ./services/$(app)/src/utils &&\
	rm -r ./services/$(app)/src/utils/common &&\
	mkdir ./services/$(app)/src/utils/common -p &&\
	cp -al ./services/commons/src/* ./services/$(app)/src/utils/common &&\
) echo