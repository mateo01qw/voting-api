# Voting System API

Este es un API RESTful para gestionar un sistema de votaciones. Permite registrar votantes, candidatos, emitir votos y obtener estadísticas de la votación. Está construido con Node.js, Express y una base de datos MySQL.

## Requisitos

- **Node.js**: 16.x o superior.
- **MySQL**: Para almacenar los datos de los votantes, candidatos y votos.

## Instalación

### 1. Clonar el repositorio

Primero, clona el repositorio en tu máquina local:

```
git clone https://github.com/mateo01qw/voting-api.git
```
### 2. Instalar dependencias
```
cd voting-api
npm install
````
### 3. Configuración de la base de datos
````
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=***
DB_NAME=voting_db
````
### 4. Iniciar el servidor
````
npm start
````
El servidor estará disponible en http://localhost:3000.

Uso
Endpoints de la API
1. Votantes
POST /voters: Registrar un nuevo votante.

Ejemplo de solicitud:
````
{
  "name": "Juan Pérez",
  "email": "juan@example.com"
}
````
Obtener estadísticas de votos
````
http://localhost:3000/votes/statistics
````
![image](https://github.com/user-attachments/assets/8e3c1cdf-6397-4bf0-9d1b-4e1879e3041a)

Respuesta de error
````
{
  "error": "Nombre y email son obligatorios"
}
````

Tecnologías Usadas

- **Node.js**: Entorno de ejecución para JavaScript.
- **Express.js**: Framework de Node.js para construir la API.
- **MySQL**: Base de datos para almacenar los datos.
