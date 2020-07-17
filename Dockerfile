FROM node:alpine

RUN mkdir -p /app
WORKDIR /app

RUN npm install --global nodemon

COPY package*.json ./
RUN npm install --quiet --no-optional

EXPOSE ${NODE_PORT}

CMD nodemon server/server.js