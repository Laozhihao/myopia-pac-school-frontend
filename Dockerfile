# syntax = docker/dockerfile:experimental

# asset builder
FROM node:14-alpine3.11 AS node-builder
WORKDIR /build

COPY package.json .yarnrc yarn.lock ./

RUN --mount=type=cache,target=/root/.yarn \
    YARN_CACHE_FOLDER=/root/.yarn yarn install

ARG APP_ENV
ARG NODE_ENV

COPY . ./
RUN yarn build

# application busybox
FROM busybox:musl
COPY --from=node-builder /build/dist/ /dist/
