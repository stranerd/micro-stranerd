#!/bin/sh

CONF_PATH=/etc/traefik/traefik.yml

CERT_TYPE=staging

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

http:
  middlewares:
    stripRoutePrefix:
      stripPrefix:
        prefixes:
          - "/auth"
          - "/stranerd"
          - "/utils"
  routers:
    to-auth:
      tls:
        certresolver: $CERT_TYPE
      rule: "PathPrefix(\`/auth/\`)"
      middlewares:
        - stripRoutePrefix
      service: auth
    to-stranerd:
      tls:
        certresolver: $CERT_TYPE
      rule: "PathPrefix(\`/stranerd/\`)"
      middlewares:
        - stripRoutePrefix
      service: stranerd
    to-utils:
      tls:
        certresolver: $CERT_TYPE
      rule: "PathPrefix(\`/utils/\`)"
      middlewares:
        - stripRoutePrefix
      service: utils

  services:
    auth:
      loadBalancer:
        servers:
          - url: http://auth:8080/
    stranerd:
      loadBalancer:
        servers:
          - url: http://stranerd:8080/
    utils:
      loadBalancer:
        servers:
          - url: http://utils:8080/

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
      storage: /etc/traefik/certs/acme.json
      caServer: "https://acme-staging-v02.api.letsencrypt.org/directory"
      httpChallenge:
        entryPoint: web

  production:
    acme:
      email: kevin@stranerd.com
      storage: /etc/traefik/certs/acme.json
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

http:
  middlewares:
    stripRoutePrefix:
      stripPrefix:
        prefixes:
          - "/auth"
          - "/stranerd"
          - "/utils"
  routers:
    to-auth:
      rule: "PathPrefix(\`/auth/\`)"
      middlewares:
        - stripRoutePrefix
      service: auth
    to-stranerd:
      rule: "PathPrefix(\`/stranerd/\`)"
      middlewares:
        - stripRoutePrefix
      service: stranerd
    to-utils:
      rule: "PathPrefix(\`/utils/\`)"
      middlewares:
        - stripRoutePrefix
      service: utils

  services:
    auth:
      loadBalancer:
        servers:
          - url: http://auth:8080/
    stranerd:
      loadBalancer:
        servers:
          - url: http://stranerd:8080/
    utils:
      loadBalancer:
        servers:
          - url: http://utils:8080/

api:
  insecure: true
  dashboard: true

providers:
  file:
    directory: /etc/traefik
    watch: true
EOF
fi