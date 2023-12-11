# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/engine/reference/builder/

ARG NODE_VERSION=20.6.0
FROM node:${NODE_VERSION}-alpine as base
WORKDIR /usr/src/app

FROM base as dev
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=yarn.lock,target=yarn.lock \
    --mount=type=cache,target=/root/.yarn \
    yarn install --production=false
COPY . .
# Allow the container user to write files in this folder whilst debugging
RUN chown -R node /usr/src/app
USER node
EXPOSE 3000
CMD yarn start:debug

FROM base as deps
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=yarn.lock,target=yarn.lock \
    --mount=type=cache,target=/root/.yarn \
    yarn install --frozen-lockfile
COPY . .
RUN yarn run build

FROM base as prod
ENV NODE_ENV production
USER node
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY --from=deps /usr/src/app/dist ./dist
COPY package.json .
EXPOSE 3000
CMD yarn start:prod
