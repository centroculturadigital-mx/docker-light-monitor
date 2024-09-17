FROM node:21-alpine

WORKDIR /app

COPY ./package.json ./
COPY ./keystone.ts ./schema.* auth.ts* ./

RUN npm install;

COPY . .

RUN npm run  build

ARG PORT=3000

ENV PORT=${PORT}

CMD ["npm", "run", "start"]
