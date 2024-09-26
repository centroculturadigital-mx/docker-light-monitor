# Scripts to Monitor Docker containers

## Cronjobs

```
0 * * * * /usr/bin/bash $HOME/monitor/container-stats.sh
```

## Script de Estadísticas del contenedor

El escript `container-stats.sh` se encarga de guardar las medidas de uso de recursos (CPU y memoria) para cada contenedor listado en el backend. Se usa un cronjob para que se ejecute cada hora `(0 * * * *)`, de quere realizarlo con distinta frecuencia cambiar el patrón del cron. 