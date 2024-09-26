# Docker API

Utilizando la librería `dockerode`, levanta un API de express que tiene dos puntos de acceso:

1. Arroja los contenedores corriendo actualmente 
2. Arroja la información de cierto contenedor:
  - Imagen
  - Tag
  - Hora de inicio
  - Hora de terminación

3. (por terminar) POST donde será posible cambiar el tag o la imagen para cierto contenedor  