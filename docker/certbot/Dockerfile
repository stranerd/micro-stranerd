FROM certbot/certbot:latest

ARG BASE_DOMAIN
ARG USE_SSL
ARG BUILD_SSL
ENV BASE_DOMAIN $BASE_DOMAIN
ENV USE_SSL $USE_SSL
ENV BUILD_SSL $BUILD_SSL

ENTRYPOINT if [[ $BUILD_SSL = 0 && $USE_SSL = 1 ]]; then \
  certbot certonly --webroot \
    --webroot-path=/var/www/certbot/ \
    --email kevin@stranerd.com \
    --agree-tos \
    --no-eff-email \
    -d $BASE_DOMAIN; \
else echo; \
fi