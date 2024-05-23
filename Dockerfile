FROM node:20

WORKDIR /root

COPY package.json .

RUN npm install

COPY . .

CMD node index.js
