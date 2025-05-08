CREATE TABLE `Productos` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `nombre` VARCHAR(50),
  `descripcion` TEXT,
  `idTipoProducto` INT,
  `idMarca` INT,
  `estado` ENUM('AC', 'BA')
);

CREATE TABLE `ProductosTipos` (
  `idProductoTipo` INT PRIMARY KEY AUTO_INCREMENT,
  `descripcion` VARCHAR(100),
  `estado` ENUM('AC', 'BA')
);

CREATE TABLE `ProductoMarcas` (
  `idProductoMarca` INT PRIMARY KEY AUTO_INCREMENT,
  `nombre` VARCHAR(50),
  `estado` ENUM('AC', 'BA')
);

CREATE TABLE `Depositos` (
  `idDeposito` INT PRIMARY KEY AUTO_INCREMENT,
  `nombre` VARCHAR(50),
  `ubicacion` VARCHAR(100),
  `estado` ENUM('AC', 'BA')
);

CREATE TABLE `StockIngresado` (
  `idStockIngresado` INT PRIMARY KEY AUTO_INCREMENT,
  `idProducto` INT,
  `cantidad` INT,
  `idDeposito` INT,
  `fechaIngreso` DATE,
  `estado` ENUM('AC', 'BA')
);

CREATE TABLE `StockEgresado` (
  `idStockEgresado` INT PRIMARY KEY AUTO_INCREMENT,
  `idProducto` INT,
  `cantidad` INT,
  `idDeposito` INT,
  `idVehiculo` INT,
  `fechaEgreso` DATE,
  `estado` ENUM('AC', 'BA')
);

CREATE TABLE `Vehiculos` (
  `idVehiculo` INT PRIMARY KEY AUTO_INCREMENT,
  `dominio` VARCHAR(100),
  `idMarca` INT,
  `modelo` VARCHAR(100),
  `anio` INT,
  `estado` ENUM('AC', 'BA')
);

-- Agregando claves foráneas
ALTER TABLE `Productos` ADD FOREIGN KEY (`idTipoProducto`) REFERENCES `ProductosTipos` (`idProductoTipo`);
ALTER TABLE `Productos` ADD FOREIGN KEY (`idMarca`) REFERENCES `ProductoMarcas` (`idProductoMarca`);
ALTER TABLE `StockIngresado` ADD FOREIGN KEY (`idProducto`) REFERENCES `Productos` (`id`);
ALTER TABLE `StockIngresado` ADD FOREIGN KEY (`idDeposito`) REFERENCES `Depositos` (`idDeposito`);
ALTER TABLE `StockEgresado` ADD FOREIGN KEY (`idProducto`) REFERENCES `Productos` (`id`);
ALTER TABLE `StockEgresado` ADD FOREIGN KEY (`idDeposito`) REFERENCES `Depositos` (`idDeposito`);
ALTER TABLE `StockEgresado` ADD FOREIGN KEY (`idVehiculo`) REFERENCES `Vehiculos` (`idVehiculo`);
ALTER TABLE `Vehiculos` ADD FOREIGN KEY (`idMarca`) REFERENCES `ProductoMarcas` (`idProductoMarca`);