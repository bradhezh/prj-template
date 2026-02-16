FROM node:22-alpine AS build-stage
#ARG DB_URL_TEST
ARG BACKEND

WORKDIR /usr/app
COPY . .

RUN corepack enable && corepack prepare pnpm@10 --activate
RUN pnpm i --frozen-lockfile
RUN pnpm build
#RUN pnpm lint
#RUN DB_URL=$DB_URL_TEST pnpm test

FROM node:22-alpine AS production-stage
ARG BACKEND

WORKDIR /usr/app
COPY package.json .
COPY pnpm-lock.yaml .
COPY pnpm-workspace.yaml .
COPY ./$BACKEND/package.json ./$BACKEND/
COPY --from=build-stage /usr/app/$BACKEND/build ./$BACKEND/build

RUN corepack enable && corepack prepare pnpm@10 --activate
RUN pnpm --filter $BACKEND i --frozen-lockfile --prod

USER node
CMD ["pnpm", "start"]
