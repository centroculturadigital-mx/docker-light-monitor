FROM node:20

WORKDIR /root

COPY package.json .

RUN npm install

COPY . .

ARG PORT
ARG API_URL
ENV PORT $PORT
ENV API_URL $API_URL


CMD node index.mjs
