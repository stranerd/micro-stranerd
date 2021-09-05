FROM node:16-alpine as base
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install
COPY . .

FROM base as production
RUN yarn build