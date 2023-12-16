# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/engine/reference/builder/

ARG NODE_VERSION=20.6.0
FROM node:${NODE_VERSION}-alpine as base
WORKDIR /usr/src/app

FROM base as dev_deps
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=yarn.lock,target=yarn.lock \
    --mount=type=cache,target=/root/.yarn \
    yarn install
COPY . .
RUN yarn run build

FROM base as prod_deps
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=yarn.lock,target=yarn.lock \
    --mount=type=cache,target=/root/.yarn \
    yarn install --production
COPY . .
RUN yarn run build

FROM base as dev
COPY --from=dev_deps /usr/src/app .
# Allow the container user to write files in this folder whilst debugging
RUN chown -R node /usr/src/app
USER node
EXPOSE 3000
CMD yarn start:debug

FROM base as migrate
ENV NODE_ENV production
COPY --from=dev_deps /usr/src/app .
USER node
CMD yarn migrations:run

FROM base as test
ENV NODE_ENV test
COPY --from=dev_deps /usr/src/app .
USER node
CMD yarn test

FROM base as prod
ENV NODE_ENV production
USER node
COPY --from=prod_deps /usr/src/app/node_modules ./node_modules
COPY --from=prod_deps /usr/src/app/dist ./dist
COPY package.json .
EXPOSE 3000
CMD yarn start:prod
