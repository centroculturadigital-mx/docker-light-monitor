# Backend del monitor de contendores

Guarda para cada proyecto: 
    - Nombre del proyecto
    - Nombre del contenedor
    - El url donde está el servicio
    - Su imagen
    - Tag
    - Fecha de inicio y fin 
    - Métricas de uso de CPU y memoria

## Cómo continuar el desarrollo de esta app

¡Bienvenid@ a Keystone!

Ejecuta

```
yarn dev
```

Para ver la configuración de tu nueva aplicación, revisa el archivo [./keystone.ts](./keystone.ts).

Este proyecto de inicio está diseñado para que te hagas una idea del poder que te puede ofrecer Keystone y para mostrarte algunas de sus características principales. También es una configuración bastante simple si deseas desarrollarlo a partir de aquí.

Te recomendamos que lo uses junto con nuestra [guía de inicio](https://keystonejs.com/docs/walkthroughs/getting-started-with-create-keystone-app), que te guiará a través de todo lo que obtienes como parte de este proyecto inicial.

Si quieres una visión general de todas las características que ofrece Keystone, consulta nuestra página de [características](https://keystonejs.com/why-keystone#features).

## Algunas Notas Rápidas Para Comenzar

### Cambiando la base de datos

Hemos configurado una [base de datos SQLite](https://keystonejs.com/docs/apis/config#sqlite) para facilitar el uso. ¡Si prefieres usar PostgreSQL, puedes hacerlo!

Simplemente cambia la propiedad `db` en la línea 16 del archivo de Keystone [./keystone.ts](./keystone.ts) a:

```typescript
db: {
    provider: 'postgresql',
    url: process.env.DATABASE_URL || 'DATABASE_URL_TO_REPLACE',
}
```

Y proporciona la URL de tu base de datos de PostgreSQL.

Para más información sobre la configuración de bases de datos, consulta nuestra [documentación de la API de bases de datos](https://keystonejs.com/docs/apis/config#db).

### Autenticación

Hemos colocado la autenticación en su propio archivo para que este proyecto de inicio sea más fácil de navegar. Para explorarlo sin que la autenticación esté activada, comenta la función `isAccessAllowed` en la línea 21 del archivo de Keystone [./keystone.ts](./keystone.ts).

Para más información sobre autenticación, consulta nuestra [documentación de la API de autenticación](https://keystonejs.com/docs/apis/auth#authentication-api).

### Agregando un frontend

Como un CMS sin cabeza, Keystone se puede usar con cualquier frontend que utilice GraphQL. Proporciona un endpoint de GraphQL contra el que puedes escribir consultas en `/api/graphql` (por defecto [http://localhost:3000/api/graphql](http://localhost:3000/api/graphql)). En Thinkmill, solemos usar [Next.js](https://nextjs.org/) y [Apollo GraphQL](https://www.apollographql.com/docs/react/get-started/) como nuestro frontend y la forma de escribir consultas, pero si tienes tu propio favorito, siéntete libre de usarlo.

Próximamente habrá una guía sobre cómo hacerlo, pero mientras tanto, nuestro [ejemplo de todo](https://github.com/keystonejs/keystone-react-todo-demo) muestra una configuración de Keystone con un frontend. Para un ejemplo más completo, también puedes consultar una aplicación de ejemplo que construimos para el [Prisma Day 2021](https://github.com/keystonejs/prisma-day-2021-workshop).

### Incrustando Keystone en un frontend de Next.js

Aunque Keystone funciona como una aplicación independiente, puedes incrustar tu aplicación de Keystone en una aplicación de Next.js. Esta es una configuración bastante diferente a la del proyecto inicial, y te recomendamos que revises nuestra guía para eso aquí.