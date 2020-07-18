FROM node:alpine

RUN mkdir -p /app

WORKDIR /app
ADD . /app

RUN npm install --global nodemon

COPY package*.json ./
RUN npm install --quiet --no-optional

RUN npm run build
RUN rm -rf ./build
RUN rm -rf ./src

ENV NODE_ENV=production

EXPOSE ${NODE_PORT}

CMD node server/server.js