-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 12-05-2025 a las 05:55:13
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `taller_stock_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `depositos`
--

CREATE TABLE `depositos` (
  `idDeposito` int(11) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `ubicacion` varchar(100) DEFAULT NULL,
  `estado` enum('AC','BA') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `depositos`
--

INSERT INTO `depositos` (`idDeposito`, `nombre`, `ubicacion`, `estado`) VALUES
(1, 'Depósito Centr', 'Buenos Aires', 'AC'),
(2, 'Depósito Secundario', 'Córdoba', 'AC'),
(3, 'Depósito xxxx', 'Córdoba', 'BA'),
(4, 'caca', 'sadas', 'AC'),
(5, 'asd', 'sadas', 'AC');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productomarcas`
--

CREATE TABLE `productomarcas` (
  `idProductoMarca` int(11) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `estado` enum('AC','BA') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productomarcas`
--

INSERT INTO `productomarcas` (`idProductoMarca`, `nombre`, `estado`) VALUES
(1, 'Samsung', 'AC'),
(2, 'Nike', 'AC'),
(3, 'Ikea', 'AC'),
(4, 'nashee', ''),
(5, 'juanyyy', 'AC'),
(6, 'Juani', 'AC');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `idTipoProducto` int(11) DEFAULT NULL,
  `idMarca` int(11) DEFAULT NULL,
  `estado` enum('AC','BA') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `nombre`, `descripcion`, `idTipoProducto`, `idMarca`, `estado`) VALUES
(2, 'Televisor 50\"', 'Smart TV 50lgadas', 3, 1, 'AC'),
(3, 'Zapatillas deportivas', 'Modelo running de alta gama', 3, 2, 'AC'),
(4, 'Mesa de comedor', 'Mesa de madera para 6 personas', 2, 3, 'BA'),
(5, 'Lapicera', 'Roja', 1, 1, 'BA'),
(6, 'coca', 'coca c', 2, 1, 'AC'),
(7, 'Esa', '231', 1, 1, 'AC'),
(8, 'pepsi', 'gaseosa god', 1, 1, 'BA');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productostipos`
--

CREATE TABLE `productostipos` (
  `idProductoTipo` int(11) NOT NULL,
  `descripcion` varchar(100) DEFAULT NULL,
  `estado` enum('AC','BA') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productostipos`
--

INSERT INTO `productostipos` (`idProductoTipo`, `descripcion`, `estado`) VALUES
(1, 'Electrónicos333', 'BA'),
(2, 'Muebles', 'AC'),
(3, 'Ropa', 'AC'),
(4, 'Alimentoxx', 'BA'),
(5, 'casa', 'AC'),
(6, 'yea', 'AC'),
(7, 'factoy', 'AC');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `stockegresado`
--

CREATE TABLE `stockegresado` (
  `idStockEgresado` int(11) NOT NULL,
  `idProducto` int(11) DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `idDeposito` int(11) DEFAULT NULL,
  `idVehiculo` int(11) DEFAULT NULL,
  `fechaEgreso` date DEFAULT NULL,
  `estado` enum('AC','BA') DEFAULT NULL,
  `destinoTipo` enum('vehiculo','oficina','otro') NOT NULL,
  `destinoValor` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `stockegresado`
--

INSERT INTO `stockegresado` (`idStockEgresado`, `idProducto`, `cantidad`, `idDeposito`, `idVehiculo`, `fechaEgreso`, `estado`, `destinoTipo`, `destinoValor`) VALUES
(1, 2, 10, 1, 1, '2025-05-05', 'AC', 'vehiculo', 'ofis'),
(2, 3, 20, 2, 2, '2025-05-06', 'AC', 'vehiculo', 'vava'),
(3, 2, 2, 1, 3, '2025-05-09', 'BA', 'oficina', 'asdads'),
(4, 3, 1, 1, 1, '2025-03-21', 'AC', 'vehiculo', '3232');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `stockingresado`
--

CREATE TABLE `stockingresado` (
  `idStockIngresado` int(11) NOT NULL,
  `idProducto` int(11) DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `idDeposito` int(11) DEFAULT NULL,
  `fechaIngreso` date DEFAULT NULL,
  `estado` enum('AC','BA') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `stockingresado`
--

INSERT INTO `stockingresado` (`idStockIngresado`, `idProducto`, `cantidad`, `idDeposito`, `fechaIngreso`, `estado`) VALUES
(4, 2, 50, 1, '2025-05-01', 'AC'),
(5, 3, 100, 1, '2025-05-02', 'AC'),
(6, 2, 233333, 1, '2025-05-09', 'BA'),
(8, 2, 10, 1, '2025-05-09', 'AC'),
(9, 4, 14, 1, '1999-03-21', 'AC'),
(11, 2, 1, 1, '1212-02-21', 'AC');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vehiculos`
--

CREATE TABLE `vehiculos` (
  `idVehiculo` int(11) NOT NULL,
  `dominio` varchar(100) DEFAULT NULL,
  `idMarca` int(11) DEFAULT NULL,
  `modelo` varchar(100) DEFAULT NULL,
  `anio` int(11) DEFAULT NULL,
  `estado` enum('AC','BA') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `vehiculos`
--

INSERT INTO `vehiculos` (`idVehiculo`, `dominio`, `idMarca`, `modelo`, `anio`, `estado`) VALUES
(1, 'ABC123yfhghf', 1, 'Camión de carga', 2015, 'BA'),
(2, 'XYZ789', 3, 'Furgoneta', 2020, 'AC'),
(3, 'LPN085', 3, 'SANDERO', 2012, NULL),
(4, 'EEEEEEEEEE', 3, 'SANDERO', 2012, 'BA');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `depositos`
--
ALTER TABLE `depositos`
  ADD PRIMARY KEY (`idDeposito`);

--
-- Indices de la tabla `productomarcas`
--
ALTER TABLE `productomarcas`
  ADD PRIMARY KEY (`idProductoMarca`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idTipoProducto` (`idTipoProducto`),
  ADD KEY `idMarca` (`idMarca`);

--
-- Indices de la tabla `productostipos`
--
ALTER TABLE `productostipos`
  ADD PRIMARY KEY (`idProductoTipo`);

--
-- Indices de la tabla `stockegresado`
--
ALTER TABLE `stockegresado`
  ADD PRIMARY KEY (`idStockEgresado`),
  ADD KEY `idProducto` (`idProducto`),
  ADD KEY `idDeposito` (`idDeposito`),
  ADD KEY `idVehiculo` (`idVehiculo`);

--
-- Indices de la tabla `stockingresado`
--
ALTER TABLE `stockingresado`
  ADD PRIMARY KEY (`idStockIngresado`),
  ADD KEY `idProducto` (`idProducto`),
  ADD KEY `idDeposito` (`idDeposito`);

--
-- Indices de la tabla `vehiculos`
--
ALTER TABLE `vehiculos`
  ADD PRIMARY KEY (`idVehiculo`),
  ADD KEY `idMarca` (`idMarca`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `depositos`
--
ALTER TABLE `depositos`
  MODIFY `idDeposito` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `productomarcas`
--
ALTER TABLE `productomarcas`
  MODIFY `idProductoMarca` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `productostipos`
--
ALTER TABLE `productostipos`
  MODIFY `idProductoTipo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `stockegresado`
--
ALTER TABLE `stockegresado`
  MODIFY `idStockEgresado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `stockingresado`
--
ALTER TABLE `stockingresado`
  MODIFY `idStockIngresado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `vehiculos`
--
ALTER TABLE `vehiculos`
  MODIFY `idVehiculo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`idTipoProducto`) REFERENCES `productostipos` (`idProductoTipo`),
  ADD CONSTRAINT `productos_ibfk_2` FOREIGN KEY (`idMarca`) REFERENCES `productomarcas` (`idProductoMarca`);

--
-- Filtros para la tabla `stockegresado`
--
ALTER TABLE `stockegresado`
  ADD CONSTRAINT `stockegresado_ibfk_1` FOREIGN KEY (`idProducto`) REFERENCES `productos` (`id`),
  ADD CONSTRAINT `stockegresado_ibfk_2` FOREIGN KEY (`idDeposito`) REFERENCES `depositos` (`idDeposito`),
  ADD CONSTRAINT `stockegresado_ibfk_3` FOREIGN KEY (`idVehiculo`) REFERENCES `vehiculos` (`idVehiculo`);

--
-- Filtros para la tabla `stockingresado`
--
ALTER TABLE `stockingresado`
  ADD CONSTRAINT `stockingresado_ibfk_1` FOREIGN KEY (`idProducto`) REFERENCES `productos` (`id`),
  ADD CONSTRAINT `stockingresado_ibfk_2` FOREIGN KEY (`idDeposito`) REFERENCES `depositos` (`idDeposito`);

--
-- Filtros para la tabla `vehiculos`
--
ALTER TABLE `vehiculos`
  ADD CONSTRAINT `vehiculos_ibfk_1` FOREIGN KEY (`idMarca`) REFERENCES `productomarcas` (`idProductoMarca`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
