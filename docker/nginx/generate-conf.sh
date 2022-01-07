#!/bin/sh

CONF_PATH=/etc/nginx/nginx.conf

if [ "$USE_SSL" = 1 ]; then
cat > $CONF_PATH <<- EOF
user nginx;
worker_processes 1;

pid /var/run/nginx.pid;

events {
    worker_connections 1024;
}

http {
    client_max_body_size 200M;
    server {
        listen 80;
        server_name $BASE_DOMAIN;
        return 301 \$scheme://\$host\$request_uri;
    }

    server {
          listen 443 ssl;
          server_name $BASE_DOMAIN;

          ssl_certificate /etc/nginx/ssl-cert.crt;
          ssl_certificate_key /etc/nginx/ssl-cert.key;
          ssl_protocols       TLSv1 TLSv1.1 TLSv1.2;
          ssl_ciphers         HIGH:!aNULL:!MD5;

        location /auth/ {
            proxy_pass http://auth:8080/;
            proxy_set_header X-Real-IP \$remote_addr;
            proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
            proxy_set_header Host \$http_host;
            proxy_set_header X-Nginx-Proxy true;
            proxy_redirect off;
            proxy_set_header Upgrade \$http_upgrade;
            proxy_set_header Connection "upgrade";
        }

        location /stranerd/ {
            proxy_pass http://stranerd:8080/;
            proxy_set_header X-Real-IP \$remote_addr;
            proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
            proxy_set_header Host \$http_host;
            proxy_set_header X-Nginx-Proxy true;
            proxy_redirect off;
            proxy_set_header Upgrade \$http_upgrade;
            proxy_set_header Connection "upgrade";
        }

        location /utils/ {
            proxy_pass http://utils:8080/;
            proxy_set_header X-Real-IP \$remote_addr;
            proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
            proxy_set_header Host \$http_host;
            proxy_set_header X-Nginx-Proxy true;
            proxy_redirect off;
            proxy_set_header Upgrade \$http_upgrade;
            proxy_set_header Connection "upgrade";
        }
    }
}
EOF
else
cat > $CONF_PATH <<- EOF
user nginx;
worker_processes 1;

pid /var/run/nginx.pid;

events {
    worker_connections 1024;
}

http {
    client_max_body_size 200M;
    server {
        server_name $BASE_DOMAIN;

        location /auth/ {
            proxy_pass http://auth:8080/;
            proxy_set_header X-Real-IP \$remote_addr;
            proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
            proxy_set_header Host \$http_host;
            proxy_set_header X-Nginx-Proxy true;
            proxy_redirect off;
            proxy_set_header Upgrade \$http_upgrade;
            proxy_set_header Connection "upgrade";
        }

        location /stranerd/ {
            proxy_pass http://stranerd:8080/;
            proxy_set_header X-Real-IP \$remote_addr;
            proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
            proxy_set_header Host \$http_host;
            proxy_set_header X-Nginx-Proxy true;
            proxy_redirect off;
            proxy_set_header Upgrade \$http_upgrade;
            proxy_set_header Connection "upgrade";
        }

        location /utils/ {
            proxy_pass http://utils:8080/;
            proxy_set_header X-Real-IP \$remote_addr;
            proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
            proxy_set_header Host \$http_host;
            proxy_set_header X-Nginx-Proxy true;
            proxy_redirect off;
            proxy_set_header Upgrade \$http_upgrade;
            proxy_set_header Connection "upgrade";
        }
    }
}
EOF
fi