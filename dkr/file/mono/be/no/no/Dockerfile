FROM node:22 AS build-stage
#ARG DB_URL_TEST
ARG BACKEND

WORKDIR /usr/app
COPY . .

RUN corepack enable && corepack prepare pnpm@10 --activate
RUN pnpm i --frozen-lockfile
RUN pnpm build
#RUN pnpm lint
#RUN DB_URL=$DB_URL_TEST pnpm test

FROM node:22
ARG BACKEND

WORKDIR /usr/app
COPY --from=build-stage /usr/app/package.json .
COPY --from=build-stage /usr/app/pnpm-lock.yaml .
COPY --from=build-stage /usr/app/pnpm-workspace.yaml .
COPY --from=build-stage /usr/app/$BACKEND/package.json ./$BACKEND/
COPY --from=build-stage /usr/app/$BACKEND/build ./$BACKEND/build

RUN corepack enable && corepack prepare pnpm@10 --activate
RUN pnpm --filter $BACKEND i --frozen-lockfile --prod

USER node
CMD ["pnpm", "start"]
