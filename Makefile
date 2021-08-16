dev-start:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build --remove-orphans

dev-start-detach:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build -d --remove-orphans

dev-stop:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml down -v --remove-orphans

watch-logs:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml logs -f

prod-start:
	docker-compose -f docker-compose.yml up --build
