# 📦 Gestión de Stock para el Taller Municipal

## 🔍 Descripción General
Este sistema está diseñado para gestionar el stock de productos en el Taller Municipal, permitiendo registrar ingresos y egresos de materiales y consultar su historial.  
Ofrece un **panel de administración** accesible por navegador con una interfaz limpia e intuitiva, y un **backend robusto** con una base de datos relacional.

## 🧩 Tecnologías Utilizadas
- **Frontend:** React + TypeScript  
- **Backend:** Node.js con Express  
- **Base de Datos:** PostgreSQL / MySQL (según configuración del entorno)  
- **Comunicación:** API REST vía Axios

### 📌 Herramientas utilizadas:
- **XAMPP:** Entorno de desarrollo que incluye Apache, MySQL y PHP.  
- **phpMyAdmin:** Interfaz gráfica para gestionar bases de datos MySQL de manera sencilla.  
- **Postman:** Para pruebas de API REST.  
- **VS Code:** Editor de código principal con extensiones para TypeScript y SQL.  
- **Git y GitHub:** Control de versiones y gestión del código en un repositorio remoto.  


### 🌍 **Rutas Principales**


- `/` → **Panel de Administración General** con funciones BREAD (Browse, Read, Edit, Add, Delete) para gestionar productos, tipos, marcas, depósitos y vehículos.
- `/ingresos` → **Gestión de Ingresos de Stock**, donde se registran y consultan los productos ingresados en los depósitos.
- `/egresos` → **Gestión de Egresos de Stock**, que permite registrar y visualizar el movimiento de salida de productos.
- `/reportes` → **Reportes de Movimiento de Stock**, donde se pueden consultar historiales y generar informes de ingresos y egresos.
- `/stock` → **Stock Disponible**, mostrando la cantidad de productos en cada depósito.



### 1️⃣ 🗂️ Funcionalidades BREAD
Se desarrollaron las operaciones BREAD (_Browse, Read, Edit, Add, Delete_) para los siguientes recursos:
- **Productos**
- **Tipos de Producto**
- **Marcas de Producto**
- **Depósitos**
- **Vehículos**

Cada entidad cuenta con:
- ✅ Listado completo (**Browse**)  
- ✅ Visualización individual (**Read**)  
- ✅ Edición de registros (**Edit**)  
- ✅ Formulario para nuevos registros (**Add**)  
- ✅ Eliminación (**Delete**)

  ![image](https://github.com/user-attachments/assets/8514199e-7c16-4606-ad12-957b8e294650)


### 2️⃣ 📦 Registro de Ingresos de Stock
- **Formulario** para registrar ingresos de productos.  
- **Validación de campos** (producto, cantidad, depósito, fecha).  
- **Almacenamiento** mediante petición `POST` al backend.  
- **Visualización en tabla** con:
  - ID de ingreso  
  - Producto y depósito (con nombre y ID)  
  - Cantidad ingresada  
  - Fecha formateada  

### 3️⃣ 🚚 Registro de Egresos de Stock
- **Formulario** para registrar egresos de productos.  
- **Campos requeridos:** producto, cantidad, depósito, vehículo, tipo y valor de destino.  
- **Validación estricta** de todos los campos.  
- **Petición `POST` al backend**.  
- **Planificación para visualización** similar a ingresos.  

### 4️⃣ 📜 Historial de movimientos
- **Consulta histórica** de ingresos y egresos de productos.  
- **Visualización por producto** con formato legible.  
- **Filtro y procesamiento de datos** con SQL (`JOIN` con nombres relacionados).  

## 🧠 Extras y Detalles Técnicos
- Se utilizó **JSON** para el intercambio de datos entre frontend y backend.  
- La estructura del backend permite **escalar a múltiples endpoints REST** por recurso.  
- **Código modular y reutilizable** para formularios, manejo de errores y tablas.  
- Uso de **componentes reutilizables** en React para mantener un diseño limpio y responsivo.  
- **Feedback visual inmediato** (alertas, validaciones en pantalla).  

## 📌 Pendientes o Mejoras Futuras
- 📅 **Filtros por fecha y producto** en la vista de ingresos/egresos.  
- 📄 **Exportación de reportes**.  
- 🔑 **Autenticación de usuarios** para el panel de administración.  
- 📊 **Visualización de stock en tiempo real** por depósito.  
- 🔄 **CRUD completo** para movimientos de stock (actualmente solo `Add` y `Browse`).
- 🔧 **Correccion general** de bugs y organizacion.

## 🔗 Endpoints API


| **Recurso**             | **Método** | **Ruta**                           | **Descripción**                                    |
|------------------------|------------|-----------------------------------|--------------------------------------------------|
| **Productos**          | GET        | `/api/productos`                 | Obtener todos los productos.                     |
|                        | GET        | `/api/productos/:id`             | Obtener un producto por ID.                      |
|                        | POST       | `/api/productos`                 | Crear un nuevo producto.                         |
|                        | PUT        | `/api/productos/:id`             | Actualizar un producto por ID.                   |
|                        | DELETE     | `/api/productos/:id`             | Eliminar un producto por ID.                     |
| **Tipos de Productos** | GET        | `/api/productos-tipos`           | Obtener todos los tipos de productos.            |
|                        | GET        | `/api/productos-tipos/:id`       | Obtener un tipo de producto por ID.              |
|                        | POST       | `/api/productos-tipos`           | Crear un nuevo tipo de producto.                 |
|                        | PUT        | `/api/productos-tipos/:id`       | Actualizar un tipo de producto por ID.           |
|                        | DELETE     | `/api/productos-tipos/:id`       | Eliminar un tipo de producto por ID.             |
| **Marcas de Productos**| GET        | `/api/productos-marcas`          | Obtener todas las marcas de productos.          |
|                        | GET        | `/api/productos-marcas/:id`      | Obtener una marca por ID.                        |
|                        | POST       | `/api/productos-marcas`          | Crear una nueva marca.                           |
|                        | PUT        | `/api/productos-marcas/:id`      | Actualizar una marca por ID.                     |
|                        | DELETE     | `/api/productos-marcas/:id`      | Eliminar una marca por ID.                       |
| **Depósitos**          | GET        | `/api/depositos`                 | Obtener todos los depósitos.                     |
|                        | GET        | `/api/depositos/:id`             | Obtener un depósito por ID.                      |
|                        | POST       | `/api/depositos`                 | Crear un nuevo depósito.                         |
|                        | PUT        | `/api/depositos/:id`             | Actualizar un depósito por ID.                   |
|                        | DELETE     | `/api/depositos/:id`             | Eliminar un depósito por ID.                     |
| **Vehículos**          | GET        | `/api/vehiculos`                 | Obtener todos los vehículos.                     |
|                        | GET        | `/api/vehiculos/:id`             | Obtener un vehículo por ID.                      |
|                        | POST       | `/api/vehiculos`                 | Crear un nuevo vehículo.                         |
|                        | PUT        | `/api/vehiculos/:id`             | Actualizar un vehículo por ID.                   |
|                        | DELETE     | `/api/vehiculos/:id`             | Eliminar un vehículo por ID.                     |
| **Ingresos de Stock**  | GET        | `/api/stock-ingresado`           | Obtener todos los ingresos de stock.             |
|                        | GET        | `/api/stock-ingresado/:id`       | Obtener un ingreso de stock por ID.              |
|                        | POST       | `/api/stock-ingresado`           | Crear un nuevo ingreso de stock.                 |
|                        | PUT        | `/api/stock-ingresado/:id`       | Actualizar un ingreso de stock por ID.           |
|                        | DELETE     | `/api/stock-ingresado/:id`       | Eliminar un ingreso de stock por ID.             |
| **Egresos de Stock**   | GET        | `/api/stock-egresado`            | Obtener todos los egresos de stock.              |
|                        | GET        | `/api/stock-egresado/:id`        | Obtener un egreso de stock por ID.               |
|                        | POST       | `/api/stock-egresado`            | Crear un nuevo egreso de stock.                  |
|                        | PUT        | `/api/stock-egresado/:id`        | Actualizar un egreso de stock por ID.            |
|                        | DELETE     | `/api/stock-egresado/:id`        | Eliminar un egreso de stock por ID.              |
| **Funciones de Stock** | GET        | `/api/stock-funciones/disponible`| Obtener el stock disponible por producto y depósito. |
|                        | GET        | `/api/stock-funciones/movimientos/:id` | Obtener historial de movimientos de stock. |
