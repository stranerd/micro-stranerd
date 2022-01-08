#!/bin/sh

CONF_PATH=/etc/nginx/nginx.conf

if [ "$USE_SSL" = 0 ]; then
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
        listen [::]:80;
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
else
cat > $CONF_PATH <<- EOF
user nginx;
worker_processes 1;

pid /var/run/nginx.pid;

events {
    worker_connections 1024;
}

http {
    server {
        listen 80;
        listen [::]:80;
        server_name $BASE_DOMAIN;

        location /.well-known/acme-challenge/ {
            root /var/www/certbot;
        }

        location / {
            return 301 https://\$host\$request_uri;
        }
    }
}
EOF
fi