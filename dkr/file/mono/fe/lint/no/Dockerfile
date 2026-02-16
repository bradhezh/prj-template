FROM node:22-alpine AS build-stage
ARG FRONTEND

WORKDIR /usr/app
COPY . .

RUN corepack enable && corepack prepare pnpm@10 --activate
RUN pnpm i --frozen-lockfile
RUN pnpm build
RUN pnpm lint
#RUN pnpm test

FROM nginx:stable-alpine AS production-stage
ARG FRONTEND

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /usr/app/$FRONTEND/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
