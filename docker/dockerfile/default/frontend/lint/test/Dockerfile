FROM node:22 AS build-stage

WORKDIR /usr/app
COPY . .

RUN corepack enable && corepack prepare pnpm@10 --activate
RUN pnpm i --frozen-lockfile
RUN pnpm build
RUN pnpm lint
RUN pnpm test

FROM node:22

WORKDIR /usr/app
COPY --from=build-stage /usr/app/package.json .
COPY --from=build-stage /usr/app/pnpm-lock.yaml .
COPY --from=build-stage /usr/app/pnpm-workspace.yam[l] .
COPY --from=build-stage /usr/app/build ./build

RUN corepack enable && corepack prepare pnpm@10 --activate
RUN pnpm i --frozen-lockfile --prod

USER node
CMD ["pnpm", "start"]
