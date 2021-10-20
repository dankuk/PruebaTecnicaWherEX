-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         5.7.33 - MySQL Community Server (GPL)
-- SO del servidor:              Win64
-- HeidiSQL Versión:             11.2.0.6213
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Volcando estructura para tabla wherex.cliente
CREATE TABLE IF NOT EXISTS `cliente` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `estado` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Volcando datos para la tabla wherex.cliente: ~5 rows (aproximadamente)
DELETE FROM `cliente`;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` (`id`, `nombre`, `estado`) VALUES
	(1, 'Daniel', 1),
	(2, 'Ester', 0),
	(3, 'Luis', 0),
	(4, 'Hugo', 1),
	(7, 'Ester Bravo', 1),
	(12, 'Bola Negra dalila', 0);
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;

-- Volcando estructura para tabla wherex.detalle
CREATE TABLE IF NOT EXISTS `detalle` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `venta_id` int(11) NOT NULL,
  `cliente_id` int(11) DEFAULT NULL,
  `producto_id` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL DEFAULT '0',
  `subtotal` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `FK_detalle_venta` (`venta_id`),
  KEY `FK_detalle_cliente` (`cliente_id`),
  KEY `FK_detalle_producto` (`producto_id`),
  CONSTRAINT `FK_detalle_cliente` FOREIGN KEY (`cliente_id`) REFERENCES `cliente` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_detalle_producto` FOREIGN KEY (`producto_id`) REFERENCES `producto` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_detalle_venta` FOREIGN KEY (`venta_id`) REFERENCES `venta` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Volcando datos para la tabla wherex.detalle: ~0 rows (aproximadamente)
DELETE FROM `detalle`;
/*!40000 ALTER TABLE `detalle` DISABLE KEYS */;
INSERT INTO `detalle` (`id`, `venta_id`, `cliente_id`, `producto_id`, `cantidad`, `subtotal`) VALUES
	(1, 1, 1, 1, 2, 200),
	(2, 2, 2, 3, 3, 180),
	(3, 3, 7, 3, 1, 60),
	(4, 4, 1, 3, 6, 300),
	(5, 5, 7, 3, 5, 300),
	(6, 6, 2, 3, 1, 60),
	(7, 7, 4, 1, 1, 100),
	(8, 8, 1, 1, 1, 100),
	(9, 9, 4, 2, 1, 50),
	(10, 10, 4, 3, 1, 60);
/*!40000 ALTER TABLE `detalle` ENABLE KEYS */;

-- Volcando estructura para tabla wherex.producto
CREATE TABLE IF NOT EXISTS `producto` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `precio` int(10) unsigned DEFAULT '0',
  `cantidad` int(10) unsigned DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Volcando datos para la tabla wherex.producto: ~3 rows (aproximadamente)
DELETE FROM `producto`;
/*!40000 ALTER TABLE `producto` DISABLE KEYS */;
INSERT INTO `producto` (`id`, `nombre`, `precio`, `cantidad`) VALUES
	(1, 'Moto', 100, 91),
	(2, 'Auto', 50, 2),
	(3, 'Flores', 60, 1);
/*!40000 ALTER TABLE `producto` ENABLE KEYS */;

-- Volcando estructura para tabla wherex.venta
CREATE TABLE IF NOT EXISTS `venta` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fecha` datetime NOT NULL,
  `iva` int(11) NOT NULL DEFAULT '0',
  `descuento` int(11) NOT NULL DEFAULT '0',
  `total` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Volcando datos para la tabla wherex.venta: ~0 rows (aproximadamente)
DELETE FROM `venta`;
/*!40000 ALTER TABLE `venta` DISABLE KEYS */;
INSERT INTO `venta` (`id`, `fecha`, `iva`, `descuento`, `total`) VALUES
	(1, '2021-10-20 10:02:02', 19, 0, 238),
	(2, '2021-10-20 10:03:24', 19, 0, 214),
	(3, '2021-10-19 21:10:42', 19, 0, 357),
	(4, '2021-10-19 21:13:09', 19, 0, 357),
	(5, '2021-10-19 21:16:23', 19, 0, 357),
	(6, '2021-10-19 21:19:32', 19, 0, 71),
	(7, '2021-10-19 21:22:48', 19, 0, 119),
	(8, '2021-10-19 21:24:17', 19, 5, 113),
	(9, '2021-10-20 10:13:47', 19, 0, 60),
	(10, '2021-10-20 10:07:20', 19, 0, 71);
/*!40000 ALTER TABLE `venta` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
