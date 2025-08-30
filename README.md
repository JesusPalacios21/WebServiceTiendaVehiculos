## APIrest utilizando Express + Mysql

No olvide construir la tabla:
```sql
CREATE DATABASE tiendaveh;
USE tiendaveh;
CREATE TABLE vehiculos(
	id INT AUTO_INCREMENT PRIMARY KEY,
    marca VARCHAR(50) NOT NULL,
    modelo VARCHAR(50) NOT NULL,
    color VARCHAR(20) NOT NULL,
    precio DECIMAL(9,2) NOT NULL,
    placa CHAR(7) NOT NULL,
    CONSTRAINT uk_placa_veh UNIQUE(placa)
)ENGINE = INNODB;
```
Módulos requeridos:
```
npm install express mysql2 dotenv nodemon
```

## Instalación

Clonar el repositorio o descargar el proyecto.

Instalar dependencias:
```
npm install express mysql2 dotenv nodemon
```

Crear un archivo .env en la raíz del proyecto con la configuración de tu base de datos:

```
DB_HOST=localhost
DB_USER=tu_usuario
DB_PASSWORD=tu_password
DB_DATABASE=tiendaveh
PORT=3000
```

## Ejecución

En la terminal del proyecto:

```
nodemon app
```

Servidor iniciado en:

```
http://localhost:3000
```

## Endpoints disponibles
* Obtener todos los vehículos
```
GET /vehiculos
```

* Buscar vehículo por placa
```
GET /vehiculos/placa/:placa
```

*Ejemplo:*
```
GET http://localhost:3000/vehiculos/placa/ABC-123
```

* Crear un vehículo
```
POST /vehiculos
```

Body (JSON):

```json
{
  "marca": "Toyota",
  "modelo": "Corolla",
  "color": "Rojo",
  "precio": 20000,
  "placa": "XYZ-999"
}
```

* Actualizar vehículo
```
PUT /vehiculos/:id
```

Body (JSON):

```json
{
  "marca": "Toyota",
  "modelo": "Hilux",
  "color": "Azul",
  "precio": 35000,
  "placa": "XYZ-999"
}
```

* Eliminar vehículo
```
DELETE /vehiculos/:id
```

## *Notas*

La placa debe ser única (no se permiten duplicados).

Si un vehículo no existe, los endpoints PUT o DELETE devolverán un error 404.

Usa Postman o una extensión de Visual Studio Code llamado _Thunder Client_ para probar los endpoints.