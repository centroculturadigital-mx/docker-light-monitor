FROM node:21-alpine as deps

RUN npm install -g pnpm

WORKDIR /app


COPY ./package.json .
COPY ./pnpm-lock.yaml .

RUN pnpm install;

COPY . .


# 2. Build

FROM node:21-alpine as builder

WORKDIR /app

RUN npm install -g pnpm

COPY . .

COPY --from=deps ./app/node_modules ./node_modules


RUN pnpm build


# 3. Run

FROM node:21-alpine as runner

RUN npm install -g pnpm


WORKDIR /app

COPY ./package.json .
COPY ./pnpm-lock.yaml .


RUN pnpm install --prod

COPY --from=builder ./app/.keystone ./.keystone

ARG PORT=3000

ENV PORT=${PORT}

RUN mkdir -p public/images
RUN mkdir -p public/files

COPY . .

# TODO: import after ignoring in .dockerignore to prevent re-builds when the file changes:
#COPY ./migrate_deploy_prod.js ./migrate_deploy_prod.js


CMD ["pnpm", "start"]