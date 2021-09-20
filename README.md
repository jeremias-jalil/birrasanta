
![Logo](https://i.ibb.co/JmV719n/Birra-Santa-Logo-Color.png)    
# Birra Santa

Aplicativo para la gestión de Meetups, con cálculo automático de requerimientos 
de cerveza de acuerdo a la temperatura del día en que se va a realizar, considerando:
que más de 24° se consumen 2 cervezas por persona, una cerveza si la temperatura 
se encuentra entre 20° y 20°, y solo 0.75 cerveza por persona si es menor a 20°. 
También se considera que las cervezas se adquieren en paquetes de 6 unidades, de modo
que la aplicación le brinda al creador de la meetup la cantidad de cajas a comprar.


## La aplicación presenta dos niveles de usuarios: 

### Administrador:

    Meetups
    - Puede visualizar el estado de todas sus Meetups.
    - Puede crear Meetups.
    - Puede eliminar Meetups.
    - Puede ver los colegas que confirmaron, y los que asistieron. 
    - Puede ver la cantidad de cerveza a comprar. 
    - Puede ver la temperatura pronosticada para cada Meetup

    Invitaciones
    - Puede ver todas sus invitaciones pendientes. 
    - Puede invitar a colegas a sus las Meetups. 
    - Puede confirmar asistencia a sus propias Meetups. 
    - Puede recibir Invitaciones.

    Usuarios
    - Puede asignar el rol de Administrador a un usuario, o removerlo. 
    - Puede deshabilitar el acceso a un usuario, o habilitarlo. 
    - Puede ver a cuantas meetups confirmó, y cuantas invitaciones tiene. 

### Usuario:
    Meetups
    - Puede ver el estado de todas las Meetups a las que fue invitado.
    - Puede ver la temperatura pronosticada para cada Meetup.

    Invitaciones
    - Puede ver todas sus invitaciones pendientes. 
    - Recibe notificación por email cuando es invitado a una meetup. 
    - Puede confirmar asistencia si la Meetup a la que fue invitado aún no se llevó a cabo. 
    - Puede hacer check-in una vez que confirmó asistencia, y la Meetup ya se llevó a cabo.  

    Recibe notificación por email al crear una cuenta. 

## Deployment

El proyecto se encuentra publicado en el siguiente enlace: 
https://birrasanta.vercel.app/

### Tecnología usada
    Backend publicado con Heroku
    FrontEnd publicado con Versel

### Usuarios de ejemplo:
    Admin:
        User: lucas@abc.com
        Password: abc123
        
        User: Maria@abc.com
        Password: abc123
    
    Users:
        User: lucia@abc.com
        Password: abc123

        User: marcos@abc.com
        Password: abc123

        User: elian@abc.com
        Password: abc123
        
  ## Configuraciones para instalar aplicación en local:

### BackEnd: (puerto /3010)
    1- Dentro de carpeta /api crear un archivo .env con la siguiente estructura:
```
DB_USER = "usuario postgres"
DB_PASSWORD = "clave usuario postgres"
DB_HOST = localhost
DB_HOST_PORT = "puerto postgres"
DB_DATABASE = "nombre de base de datos en postgres"
DB_DIALECT = postgres

AUTH_SECRET=loquemasteguste
AUTH_EXPIRES=7d
AUTH_ROUNDS=10

MAILUSER = birrasanta@yahoo.com 
MAILPASS = zyyhbgwfdlmecxbl

ADMIN_PASS=admin1234
```
    2- Dentro de carpeta /api
    npm install
    npm start

### FrontEnd: (puerto /3000)
    1- Dentro de carpeta /client
    npm install
    npm start

Al iniciar por primera vez se crea el usuario administrador: 

    email: admin@admin.com
    password: admin1234
## Documentation

[Documentation BackEnd](https://documenter.getpostman.com/view/16696292/UUxtGBak)

  
## Tecnologías utilizadas

**FrontEnd:** React, Redux, Material UI v5.0.0

**BackEnd:** Node, Express, Sequelize, PostgreSQL, NodeMailer, J.W.T

**Deployment:** GitHub, Heroku, Versel

  