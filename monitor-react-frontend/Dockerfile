# Use an official Node runtime as the base image
FROM node:20 AS react

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the app dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

ARG REACT_APP_BACKEND_URL
ENV REACT_APP_BACKEND_URL=${REACT_APP_BACKEND_URL}

ARG REACT_APP_BACKEND_URL2
ENV REACT_APP_BACKEND_URL2=${REACT_APP_BACKEND_URL2}

ARG REACT_APP_BACKEND_URL3
ENV REACT_APP_BACKEND_URL3=${REACT_APP_BACKEND_URL3}

ARG REACT_APP_DOCKER_API
ENV REACT_APP_DOCKER_API=${REACT_APP_DOCKER_API}

RUN npm run build

FROM alpine:edge

RUN apk update \
    && apk add lighttpd \
    && rm -rf /var/cache/apk/*

COPY --from=react /app/build /var/www/localhost/htdocs
COPY --from=react /app/build /var/www/localhost/htdocs/dashboard

CMD ["lighttpd", "-D", "-f", "/etc/lighttpd/lighttpd.conf"]
