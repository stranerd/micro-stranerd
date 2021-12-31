APPS = auth stranerd utils
COMMONS = commons
ALL_FOLDERS = ${APPS} ${COMMONS}
args = $(filter-out $@,$(MAKECMDGOALS))

dev-start:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build --remove-orphans;

dev-start-detach:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build -d --remove-orphans;

dev-stop:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml down --remove-orphans;

watch-logs:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml logs -f;

prod-start:
	docker-compose -f docker-compose.yml up --build;

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

echo-apps:
	@echo $(foreach app, $(APPS), ./services/$(app)/app.yaml)

link-commons:
	$(foreach app, $(APPS),\
	rm ./services/$(app)/src/utils/commons.ts &&\
	ln ./services/commons/links/commons.ts ./services/$(app)/src/utils &&\
	rm -r ./services/$(app)/src/utils/common &&\
	mkdir ./services/$(app)/src/utils/common -p &&\
	cp -al ./services/commons/src/* ./services/$(app)/src/utils/common &&\
) echo

rm-dockerfile:
	$(foreach app, $(APPS), rm ./services/$(app)/Dockerfile && rm ./services/$(app)/.dockerignore &&) echo

generate-config-development:
	node bin/generate-configs.js development $(APPS) && make rm-dockerfile;

generate-config-staging:
	node bin/generate-configs.js staging $(APPS) && make rm-dockerfile;

generate-config-production:
	node bin/generate-configs.js production $(APPS) && make rm-dockerfile;