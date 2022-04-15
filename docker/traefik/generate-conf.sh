#!/bin/sh

CONF_PATH=/etc/traefik/traefik.yml

CERT_TYPE=production

CERT_PATH_STAGING=/etc/traefik/acmeStaging.json
CERT_PATH_PRODUCTION=/etc/traefik/acmeProduction.json

if [ "$USE_SSL" = 1 ]; then
cat > $CONF_PATH <<- EOF
global:
  checkNewVersion: true
  sendAnonymousUsage: false

entryPoints:
  web:
    address: :80

  websecure:
    address: :443

accessLog:
  filePath: /etc/traefik/accessLog.json
  format: json

log:
  level: DEBUG
  filePath: /etc/traefik/log.json
  format: json

http:
  middlewares:
    stripRoutePrefix:
      stripPrefix:
        prefixes:
          - "/auth"
          - "/stranerd"
          - "/utils"
  routers:
    auth:
      tls:
        certresolver: $CERT_TYPE
      rule: "Host(\`$BASE_DOMAIN\`) && PathPrefix(\`/auth/\`)"
      middlewares:
        - stripRoutePrefix
      service: auth
    stranerd:
      tls:
        certresolver: $CERT_TYPE
      rule: "Host(\`$BASE_DOMAIN\`) && PathPrefix(\`/stranerd/\`)"
      middlewares:
        - stripRoutePrefix
      service: stranerd
    utils:
      tls:
        certresolver: $CERT_TYPE
      rule: "Host(\`$BASE_DOMAIN\`) && PathPrefix(\`/utils/\`)"
      middlewares:
        - stripRoutePrefix
      service: utils

  services:
    auth:
      loadBalancer:
        servers:
          - url: http://auth:$PORT/
    stranerd:
      loadBalancer:
        servers:
          - url: http://stranerd:$PORT/
    utils:
      loadBalancer:
        servers:
          - url: http://utils:$PORT/

api:
  insecure: true
  dashboard: true

providers:
  file:
    directory: /etc/traefik
    watch: true

certificatesResolvers:
  staging:
    acme:
      email: kevin@stranerd.com
      storage: $CERT_PATH_STAGING
      caServer: "https://acme-staging-v02.api.letsencrypt.org/directory"
      httpChallenge:
        entryPoint: web

  production:
    acme:
      email: kevin@stranerd.com
      storage: $CERT_PATH_PRODUCTION
      caServer: "https://acme-v02.api.letsencrypt.org/directory"
      httpChallenge:
        entryPoint: web
EOF
else
cat > $CONF_PATH <<- EOF
global:
  checkNewVersion: true
  sendAnonymousUsage: false

entryPoints:
  web:
    address: :80

accessLog:
  filePath: /etc/traefik/accessLog.json
  format: json

log:
  level: DEBUG
  filePath: /etc/traefik/log.json
  format: json

http:
  middlewares:
    stripRoutePrefix:
      stripPrefix:
        prefixes:
          - "/auth"
          - "/stranerd"
          - "/utils"
  routers:
    auth:
      rule: "PathPrefix(\`/auth/\`)"
      middlewares:
        - stripRoutePrefix
      service: auth
    stranerd:
      rule: "PathPrefix(\`/stranerd/\`)"
      middlewares:
        - stripRoutePrefix
      service: stranerd
    utils:
      rule: "PathPrefix(\`/utils/\`)"
      middlewares:
        - stripRoutePrefix
      service: utils

  services:
    auth:
      loadBalancer:
        servers:
          - url: http://auth:$PORT/
    stranerd:
      loadBalancer:
        servers:
          - url: http://stranerd:$PORT/
    utils:
      loadBalancer:
        servers:
          - url: http://utils:$PORT/

api:
  insecure: true
  dashboard: true

providers:
  file:
    directory: /etc/traefik
    watch: true
EOF
fi