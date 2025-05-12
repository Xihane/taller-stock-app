-- Insertar datos de prueba en la tabla `depositos`
INSERT INTO `depositos` (`nombre`, `ubicacion`, `estado`) VALUES
('Depósito Central', 'Buenos Aires', 'AC'),
('Depósito Norte', 'Rosario', 'AC'),
('Depósito Sur', 'Mendoza', 'AC'),
('Depósito Temporal', 'San Juan', 'BA'),
('Depósito Córdoba', 'Córdoba', 'AC');

-- Insertar datos de prueba en la tabla `productomarcas`
INSERT INTO `productomarcas` (`nombre`, `estado`) VALUES
('LG', 'AC'),
('Adidas', 'AC'),
('Sony', 'AC'),
('Apple', 'AC'),
('Lenovo', 'BA');

-- Insertar datos de prueba en la tabla `productos`
INSERT INTO `productos` (`nombre`, `descripcion`, `idTipoProducto`, `idMarca`, `estado`) VALUES
('Televisor 55"', 'Smart TV OLED', 1, 1, 'AC'),
('Zapatillas Running', 'Calzado deportivo ultra ligero', 3, 2, 'AC'),
('Laptop Gamer', 'Laptop de alto rendimiento con RTX 4080', 1, 5, 'AC'),
('Mesa de Centro', 'Mesa de madera moderna', 2, 3, 'BA'),
('Bebida Energética', 'Lata de 500ml', 4, 4, 'AC');

-- Insertar datos de prueba en la tabla `productostipos`
INSERT INTO `productostipos` (`descripcion`, `estado`) VALUES
('Electrónicos', 'AC'),
('Muebles', 'AC'),
('Ropa Deportiva', 'AC'),
('Alimentos', 'AC'),
('Herramientas', 'BA');

-- Insertar datos de prueba en la tabla `stockegresado`
INSERT INTO `stockegresado` (`idProducto`, `cantidad`, `idDeposito`, `idVehiculo`, `fechaEgreso`, `estado`, `destinoTipo`, `destinoValor`) VALUES
(1, 5, 1, 1, '2025-05-10', 'AC', 'vehiculo', 'Distribución'),
(2, 10, 2, 2, '2025-05-12', 'AC', 'oficina', 'Evento deportivo'),
(3, 3, 1, 1, '2025-05-15', 'BA', 'otro', 'Muestra comercial');

-- Insertar datos de prueba en la tabla `stockingresado`
INSERT INTO `stockingresado` (`idProducto`, `cantidad`, `idDeposito`, `fechaIngreso`, `estado`) VALUES
(1, 50, 1, '2025-05-05', 'AC'),
(2, 100, 2, '2025-05-06', 'AC'),
(3, 30, 3, '2025-05-07', 'BA');

-- Insertar datos de prueba en la tabla `vehiculos`
INSERT INTO `vehiculos` (`dominio`, `idMarca`, `modelo`, `anio`, `estado`) VALUES
('ABC123', 1, 'Camioneta SUV', 2022, 'AC'),
('XYZ789', 2, 'Furgón de carga', 2019, 'AC'),
('MNO456', 3, 'Auto Sedan', 2021, 'BA');
