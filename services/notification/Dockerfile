FROM node:17.0.1-slim

WORKDIR /app

COPY yarn.lock yarn.lock
COPY package.json package.json

RUN yarn

COPY tsconfig.json tsconfig.json
COPY src src

RUN yarn build

RUN  chown -R node:node /app
ENV  HOME /home/node
USER node

CMD ["yarn", "start"]