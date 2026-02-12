FROM node:22 AS build-stage
ARG DB_URL_TEST

WORKDIR /usr/app
COPY . .

RUN npm ci
RUN npm build
#RUN npm lint
RUN DB_URL=$DB_URL_TEST npm test

FROM node:22

WORKDIR /usr/app
COPY --from=build-stage /usr/app/package.json .
COPY --from=build-stage /usr/app/package-lock.yaml .
COPY --from=build-stage /usr/app/build ./build

RUN npm ci --omit=dev

USER node
CMD ["npm", "start"]
