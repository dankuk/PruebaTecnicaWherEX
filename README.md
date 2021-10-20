# Prueba Técnica
### Características

- Proyecto desarrollado en NodeJS y Express para el BackEnd y Angular para el FrontEnd

##### Nota: Se debe tener instalado previamente NodeJS y Angular

- Instalacion NodeJS (Incluye NPM) : https://nodejs.org/es/

- Para Instalación Angular se debe ejecutar el comando siguiente en línea de consola:

	- **npm install -g @angular/cli** (anteponer sudo para linux)




**Table of Contents**

[TOC]

### Estructura de carpetas:
- Item 1 - MVC
	- BDD
		- script SQL con estructura de base de datos
	- BackEnd
		- Código NodeJS
	- FrontEnd
		- Código Angular
-  Item 2 - SQL
	- Script SQL con consultas solicitadas

#Item 1 - MVC

###### Instalación de Base de datos
En un ambiente MySQL se debe ejecutar el script adjunto. Debe estar creada previamente la base de datos donde se ejecutará.

ej) mysqldump -u [user] -p [database_name] > item1.sql

###### Instalación de BackEnd (NodeJs)

- Se debe copiar la carpeta BackEnd en la ruta C:\<ruta>. luego desde la consola de comandos se deben instalar los módulos, esto se realiza ejecutando: 

		- npm i

- Se deben configurar las credenciales para tener acceso al motor de base de datos y a la base de datos con la cual se debe trabajar. por lo que se debe editar el archivo de configuración del backend, este se encuentra en al ruta:

		 C:\<ruta>\backend\config\db.config.js

- En la cual se encuentra el siguiente código:

> 'use strict';
const mysql = require('mysql');
//local mysql db connection
const dbConn = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'wherex'
});
dbConn.connect(function(err) {
  if (err) throw err;
  console.log("Conexión a BDD OK!");
});
module.exports = dbConn;

- se debe reemplazar **host**, **user**, **password** y **database** con la información de su ambiente.

- Luego para levantar el servicio solo debemos ejecutar:

		- npm start

###### Instalación de FrontEnd (Angular)

Se debe copiar la carpeta FrontEnd en la ruta C:\<ruta>. luego desde la consola de comandos se deben instalar los módulos, esto se realiza ejecutando: 

- **npm i**

Luego para levantar el servicio solo debemos ejecutar:

- **npm start**

#Item 2 - SQL
Además del script SQL con las consultas, se adjunta la base de datos implementada. solo se deben seguir los pasos del punto:

> Instalación de Base de datos







