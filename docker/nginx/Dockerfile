FROM nginx:1.21.1-alpine

ARG BASE_DOMAIN
ARG USE_SSL
ARG BUILD_SSL
ENV BASE_DOMAIN $BASE_DOMAIN
ENV USE_SSL $USE_SSL
ENV BUILD_SSL $BUILD_SSL

COPY ./generate-conf.sh /etc/nginx/generate-conf.sh
RUN sh /etc/nginx/generate-conf.sh

COPY ./generate-ssl.sh /etc/nginx/generate-ssl.sh
RUN if [[ $BUILD_SSL = 1 ]]; then sh /etc/nginx/generate-ssl.sh; else echo; fi