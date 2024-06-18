# Smartvirtual

Proyecto Web en `Node.js` desarrollado para el Instituto Profesional `Santo Tomás de Valdivia`, diseñado para demostrar los contenidos de la asignatura de `Programación Web`. Este proyecto está desarrollado en `JavaScript`, con el lado del cliente y el lado del servidor utilizando `Node.js`.

En esta versión inicial, el proyecto incluye únicamente el sistema de inicio de sesión (login) y la estructura básica de la aplicación. Implementa el uso de `.env`, un archivo de texto utilizado para definir variables de entorno en aplicaciones de software. Estas variables se utilizan típicamente para configurar aspectos sensibles de la aplicación, como credenciales de bases de datos, claves de API y otras configuraciones específicas del entorno.

También hace uso de `package.json`, un componente esencial en proyectos `Node.js y JavaScript`. Este archivo de configuración proporciona información sobre el proyecto, incluidas las dependencias necesarias para su funcionamiento.

## Tabla de Contenidos

-[Instalación](#instalación)
-[Iniciar Servidor Web Local de la Aplicación](#iniciar-servidor-web-local-de-la-aplicación)
-[Crear Primer Usuario](#crear-primer-usuario)
-[Uso](#uso)

## Instalación

Sigue estos pasos para instalar el proyecto en tu entorno local:

1. **Clonar el repositorio:**

```sh
git clone https://github.com/alkemistin/proyecto-web-santotomas.git
cd proyecto-web-santotomas
```
2. **Instalación de Dependencias:**

Desde la raíz del proyecto:
```sh
npm install express express-session connect-flash mysql dotenv bcrypt
```
Esto instalará todas las dependencias necesarias para ejecutar tu aplicación correctamente.

`express`: Framework web para Node.js que maneja las rutas y vistas.<br>
`express-session`: Middleware para la gestión de sesiones de usuario en Express.<br>
`connect-flash`: Middleware para mostrar mensajes flash en Express.<br>
`mysql`: Controlador de MySQL para Node.js que permite la comunicación con la base de datos MySQL.<br>
`dotenv`: Módulo para cargar variables de entorno desde un archivo .env.<br>
`bcrypt`: Biblioteca para el hash y la comparación segura de contraseñas.<br>    


Además en tu computador local deberas tener instalado:<br>
`MySQL`: Es el motor de base de datos, puede ser MariaDB.<br>
`Apache`: Software httpd que cambia tu computador a un servior web local. En este proyecto solo es usado para poder iniciar `phpMyAdmin`. El servidor web local de la aplicación se inicia con Node.js.<br>
`phpMyAdmin`: Para crear tu base de datos desde un entorno visual entrando a http://localhost/phpmyadmin
Todo lo anterior (MySQL, Apache y phpMyAdmin) lo puedes instalar con `XAMPP`.<br>
Puedes descargar XAMPP desde su sitio oficial:<br>
-[XAMPP](https://www.apachefriends.org/es/download.html) - Descarga XAMPP que es una distribución de Apache fácil de instalar que contiene MariaDB, PHP y Perl.

    
3. **Configuración de Variables de Entorno:**

Copia el archivo `.env.example` ubicado en la raíz del proyecto y renómbralo a `.env`. Luego, edita este archivo con tus propios valores para las variables de entorno necesarias:

```dotenv
APP_NAME = Smartvirtual
SERVER_PORT = 3000
DB_HOST = localhost
DB_DATABASE = nombre_base_Datos
DB_USER = usuario_mysql
DB_PASS = clave_usuario_mysql
SESSION_SECRET = secreto_para_sesiones
```

Asegúrate de que las variables reflejen la configuración específica de tu entorno local, especialmente las credenciales de la base de datos y la configuración de sesiones.

4. **Instalar la Base de Datos MySQL**

En la raíz del proyecto se encuentra un directorio llamado `db`, donde está almacenada la base de datos de la plataforma con el nombre de archivo `db_node.sql`. Para configurarlo, accede a `phpMyAdmin` o una herramienta similar, crea una nueva base de datos y luego importa el archivo `db_node.sql` dentro de esta nueva base de datos.

## Iniciar Servidor Web Local de la Aplicación
    
El servidor web de la aplicación se inicia mediante `Node.js`. En este proyecto, `Apache` se utiliza exclusivamente para acceder a `phpMyAdmin`.

Una vez instaladas las dependencias y configuradas las variables de entorno, puedes iniciar el servidor web local ejecutando el siguiente comando desde la raíz del proyecto:
```sh
npm start
```

## Crear Primer Usuario

Nuestra aplicación requiere que se cree un usuario en la tabla `users` de la base de datos para realizar pruebas en el backend, como iniciar sesión, visualizar módulos y realizar operaciones CRUD.

En MySQL y/o MariaDB no existe una función integrada para cifrar contraseñas de la misma manera que lo hacemos en Node.js. Por esta razón, creamos un script que inserte el primer usuario en nuestra tabla `users`.<br>
Este script se encuentra en la raíz del proyecto: `/`.<br>

Podemos realizar este paso sin necesidad de iniciar el servidor web local de la aplicación.

Para crear el Usuario, desde la raíz del proyecto:
```sh
node addPrimerUsuario.js
```
El `user` y el `password` del nuevo usuario para iniciar sesión se encuentran en el código fuente del archivo`addPrimerUsuario.js`. Debe cambiar las credenciales por una segura.

## Uso

Una vez que el servidor web local de la aplicación esté en funcionamiento, para acceder al sitio de los usuarios no autenticados (Sitio Frontend), simplemente ingresa la URL `http://localhost:3000` en tu navegador web.

Por defecto, la plataforma utiliza el puerto local `3000`. Si deseas modificar este puerto, puedes hacerlo directamente en el archivo `.env`. Recuerda que si cambias el puerto en el archivo `.env`, también debes actualizar la `URL` de acceso correspondientemente.

Para acceder al sitio del `administrador`, visita la siguiente URL: `http://localhost:3000/auth/login`. Aquí encontrarás una página de inicio de sesión donde podrás ingresar las credenciales del usuario que creaste.

La plataforma web, cuando está en ejecución, solo requiere el servicio de `MySQL` para conectarse a la base de datos. No es necesario tener iniciado `Apache`, ya que el servidor web de nuestra aplicación se ejecuta con `Node.js`. Sin embargo, puedes iniciar `Apache` si necesitas acceder a `phpMyAdmin` para gestionar la base de datos de manera visual.