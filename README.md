# Docker Monitor

## Objective
 
This set of services work as a light resource monitor of docker containers

### Services

1. Docker API

Using `dockerode` node library we consult docker containers, thier status, started or stopped datetime, images and tags

1. Monitor Scripts

In here we store a set of scripts and some commands to have the fetching of the containers metrics using cronjobs and storing them on the monitor-backend

1. Monitor Keystone Backend

With a simple Headless CMS and a SQL DB, that exposes a GrahphQL API, we configure the services/containers we will monitor and store the metrics of CPU and RAM

1. Montor React Frontend

With a simple React App and ChartJS we show a dashboard of the monitored services and display different ways of projecting the metrics of CPU and Memory and also the status/image/tag of each containers

### How to use it

We use docker and docker-compose manifests to run locally and on the servers we need to monitor

#### To develop

docker compose -f docker-compose.local.yml up -d

#### To deploy

##### prerequisites

- docker installed
- traefik container running on a global/expernal network called: `traefik-network`
- define a url of the domain and/or subdomain to use for the services
- replace this domain on the docker-compose.yml file

docker compose up -d

