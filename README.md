<h1>BarrelBlow-Backend</h1>

En este repositorio utilizamos los siguientes lenguajes:

- Node.js con Express
- PostgreSQL con Sequelize

Node.js: Es un entorno de ejecución de JavaScript que permite ejecutar código JavaScript fuera del navegador web.

Express: Es un marco de aplicacion web para Node.js que facilita la creacion de API robustas y escalables


PostgreSQL: Es una base de datos relacional de código abierto ampliamente utilizada que ofrece robustez, escalabilidad y una amplia gama de caracteristicas avanzadas.

Sequelize: Para interactuar con la base de datos, se utilizo Sequelize como ORM (Mapeo Objeto-Relacional). Sequelize simplifica la interacción con la base de datos al mapear objetos JavaScript a filas de la base de datos y viceversa.


<h1>Modo de Instalación</h1>

<h2>Instalación de Dependencias</h2>

Las variables de entorno necesarias para arrancar el proyecto, esas variables son las siguiente

- PORT: puerto que se le asigna para correr la aplicación.
- DB_HOST: la dirección del host en el cual está la base de datos. (127.0.0.1 o localhost).
- DB_NAME: el nombre de la base de datos (barrelglow_db).
- DB_PORT: puerto en el cual está la base de datos (5432).
- DB_USER: usuario para ingresar a la base de datos.
- DB_PASSWORD: contraseña de la base de datos

[![var.png](https://i.postimg.cc/Qdq8JDQk/var.png)](https://postimg.cc/PCPndBFP)
[![var2.png](https://i.postimg.cc/RhbsBWxQ/var2.png)](https://postimg.cc/9wZtPFMr)

<h2>Configuración de Base de Datos</h2>

Al correr el proyecto te va a generar en terminal una serie de scripts SQL en terminal los cuales provienen de la creación de los modelos en base de datos, estos se verán de la siguiente manera.

[![base.png](https://i.postimg.cc/qvj8Zzy1/base.png)](https://postimg.cc/WdqFdp9Z)

[![base2.png](https://i.postimg.cc/hjxQgjQW/base2.png)](https://postimg.cc/BLSnBJCM)

<h2>Base de Datos</h2>

Se esta utilizando PostgreSQL con el entorno de trabajo PgAdmin4
- Versión 16

[![post.png](https://i.postimg.cc/xTdj38jf/post.png)](https://postimg.cc/YjJwppmZ)

<h2>Instalación del Backend</h2>

Ubicar la carpeta proyecto final cd origin_ api

[![bakend.png](https://i.postimg.cc/Dfp3FgFh/bakend.png)](https://postimg.cc/3WGcF2df)

<h3>Instalar las dependencias</h3>

- npm Install

[![ejecucion.png](https://i.postimg.cc/7ZnkvyZs/ejecucion.png)](https://postimg.cc/qNqYnSny)

<h3>Crear las variables de entorno en el</h3>

- env

[![eje.png](https://i.postimg.cc/3wfz7r5B/eje.png)](https://postimg.cc/KKL0D2Yk)

<h3>Ejecutar alguno de los comandos</h3>

- npm run dev

[![ejec.png](https://i.postimg.cc/WpGSwpWH/ejec.png)](https://postimg.cc/z3fnJN1C)






