FROM node:22-alpine AS build-stage
#ARG DB_URL_TEST

WORKDIR /usr/app
COPY . .

RUN npm ci
RUN npm build
#RUN npm lint
#RUN DB_URL=$DB_URL_TEST npm test

FROM node:22-alpine AS production-stage

WORKDIR /usr/app
COPY package.json .
COPY package-lock.yaml .
COPY --from=build-stage /usr/app/build ./build

RUN npm ci --omit=dev

USER node
CMD ["npm", "start"]
