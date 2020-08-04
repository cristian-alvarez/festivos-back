# Festivos App Back Server

## Descripción

Aplicación Node JS - Express- Mongoose que consume la API de días festivos argentinos del año 2020, guarda los feriados en la base de datos
local del servidor (MongoDB) para su posterior edición, eliminación y visualización.

La aplicación consume y guarda la lista de días en caso de no encontrar algún día guardado.

## Instalación

Descarga o clona el presente repositorio. Luego en el directorio raíz de la aplicación ejecutar el comando "yarn" para descargar todas las dependencias, una alternativa a este comando sería "npm update". Repetir estos comandos en caso de que la conexión falle u ocurra un error que no permita descargar las librerias.

Tener MongoDB instalado y arriba para escuchar la conexión con la app back.

Una vez esté creada la carpeta node_modules y la conexión con mondoDb esté arriba, disponible y lista, entonces ejecutar "yarn start" para iniciar el servidor.

## Uso

El servidor iniciará en la siguiente dirección: http://localhost:3977 y la api para consumir los distintos endpoints es http://localhost/3977/api/v1

## Licensia
[MIT](https://choosealicense.com/licenses/mit/)