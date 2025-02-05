-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           8.0.41 - MySQL Community Server - GPL
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              12.10.0.7000
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Copiando estrutura do banco de dados para ifixtrack
CREATE DATABASE IF NOT EXISTS `ifixtrack` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `ifixtrack`;

-- Copiando estrutura para tabela ifixtrack.fiis
CREATE TABLE IF NOT EXISTS `fiis` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fii` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Copiando dados para a tabela ifixtrack.fiis: ~50 rows (aproximadamente)
INSERT INTO `fiis` (`id`, `fii`) VALUES
	(1, 'KNCR11'),
	(2, 'KNIP11'),
	(3, 'XPML11'),
	(4, 'HGLH11'),
	(5, 'MXRF11'),
	(6, 'BTLG11'),
	(7, 'KNRI11'),
	(8, 'XPLG11'),
	(9, 'KNHY11'),
	(10, 'VISC11'),
	(11, 'HGRU11'),
	(12, 'HGBL11'),
	(13, 'IRDM11'),
	(14, 'PVBI11'),
	(15, 'CPTS11'),
	(16, 'TGAR11'),
	(17, 'TRXF11'),
	(18, 'RECR11'),
	(19, 'KNSC11'),
	(20, 'KNHF11'),
	(21, 'RZTR11'),
	(22, 'KNUQ11'),
	(23, 'LVBI11'),
	(24, 'BRCO11'),
	(25, 'HSML11'),
	(26, 'HGCR11'),
	(27, 'GARE11'),
	(28, 'TVRI11'),
	(29, 'VGIR11'),
	(30, 'MCCI11'),
	(31, 'RBVA11'),
	(32, 'HFOF11'),
	(33, 'ALZR11'),
	(34, 'VGHF11'),
	(35, 'RBRR1'),
	(36, 'MALL11'),
	(37, 'VRTA11'),
	(38, 'JSRE11'),
	(39, 'HGRE11'),
	(40, 'GGRC11'),
	(41, 'RBRY11'),
	(42, 'VILG11'),
	(43, 'VCJR11'),
	(44, 'HSLG11'),
	(45, 'GZIT11'),
	(46, 'CVBI11'),
	(47, 'VGIP11'),
	(48, 'BTCII11'),
	(49, 'RBRF11'),
	(50, 'GTWR11');

-- Copiando estrutura para tabela ifixtrack.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Copiando dados para a tabela ifixtrack.users: ~2 rows (aproximadamente)
INSERT INTO `users` (`id`, `name`, `email`) VALUES
	(1, 'Leticia', 'leticiamirly@gmail.com'),
	(9, 'Tope', 'topezera123@gmail.com');

-- Copiando estrutura para tabela ifixtrack.usersfiis
CREATE TABLE IF NOT EXISTS `usersfiis` (
  `userId` int NOT NULL,
  `fiiId` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Copiando dados para a tabela ifixtrack.usersfiis: ~10 rows (aproximadamente)
INSERT INTO `usersfiis` (`userId`, `fiiId`) VALUES
	(1, 2),
	(1, 3),
	(1, 4),
	(1, 1),
	(1, 9),
	(1, 17),
	(1, 25),
	(1, 33),
	(1, 41),
	(9, 1),
	(9, 2),
	(9, 11),
	(9, 10),
	(9, 3),
	(9, 18),
	(9, 19),
	(9, 17),
	(9, 9);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
