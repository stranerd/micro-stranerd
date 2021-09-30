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
	$(foreach folder, $(ALL_FOLDERS), yarn --cwd $(folder);)

lint-all:
	$(foreach folder, $(ALL_FOLDERS), yarn --cwd $(folder) lint;)

build-all:
	$(foreach folder, $(ALL_FOLDERS), yarn --cwd $(folder) build;)

publish-commons:
	yarn --cwd ${COMMONS} pub;

pub-and-inst:
	make publish-commons && make install-commons

install-commons:
	$(foreach app, $(APPS), yarn --cwd $(app) add @stranerd/api-commons@latest;)

copy-envs:
	node bin/copy-envs.js $(APPS);

echo-apps:
	@echo $(foreach app, $(APPS), $(app)/app.yaml)

link-commons:
	$(foreach app, $(APPS),\
	rm ./$(app)/src/utils/commons.ts;\
	ln ./commons/links/commons.ts ./$(app)/src/utils;\
	rm -r ./$(app)/src/utils/common;\
	mkdir ./$(app)/src/utils/common -p;\
	cp -al ./commons/src/* ./$(app)/src/utils/common;\
)

generate-config-development:
	node bin/generate-configs.js development $(APPS);

generate-config-staging:
	node bin/generate-configs.js staging $(APPS);

generate-config-production:
	node bin/generate-configs.js production $(APPS);