# Monitor de Docker

## Objetivo

Este conjunto de servicios funciona como un monitor ligero de recursos de contenedores Docker.

### Servicios

1. [Docker API](./docker-api/)

Usando la biblioteca `dockerode` en Node, consultamos los contenedores Docker, su estado, la fecha y hora de inicio o parada, las imágenes y etiquetas.

2. [Scripts de Monitorización](./monitor-scripts/)

Aquí almacenamos un conjunto de scripts y algunos comandos para obtener métricas de los contenedores utilizando cronjobs y almacenándolos en el backend de monitorización.

3. [Backend de Monitorización con Keystone](./monitor-keystone-backend/)

Con un CMS simple sin cabeza (Headless CMS) y una base de datos SQL que expone una API GraphQL, configuramos los servicios/contenedores que vamos a monitorear y almacenamos las métricas de CPU y RAM.

4. [Frontend de Monitorización con React](./monitor-react-frontend/)

Con una aplicación simple en React y ChartJS mostramos un panel de control de los servicios monitoreados y diferentes formas de proyectar las métricas de CPU y Memoria, así como el estado/imágenes/etiquetas de cada contenedor.

### Cómo usarlo

Utilizamos Docker y manifiestos de Docker Compose para ejecutarlo localmente y en los servidores que necesitamos monitorear.

#### Para desarrollar

```bash
docker compose -f docker-compose.local.yml up -d
```

#### Para desplegar

##### Requisitos previos

- Docker instalado
- Contenedor de Traefik ejecutándose en una red global/externa llamada: `traefik-network`
- Definir una URL del dominio y/o subdominio a utilizar para los servicios en el archivo `.env`
- Reemplazar este dominio en el archivo `docker-compose.yml`

```bash
docker compose up -d
```