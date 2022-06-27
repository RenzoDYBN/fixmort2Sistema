-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 18, 2022 at 02:49 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `crud_nodejs`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

create table users(
  id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name varchar(50) NOT NULL,
  email varchar(100) NOT NULL,
  rol varchar(50) NOT NULL ,
  pass varchar(255) NOT NULL,
  image varchar(100) NOT NULL
);

create table users(
id INT(11) PRIMARY KEY,
name varchar(50),
rol varchar(50), email varchar(100)
);

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `email` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `rol` varchar(50) COLLATE utf8_spanish_ci NOT NULL DEFAULT 'Subscriber',
  `pass` varchar(255) COLLATE utf8_spanish_ci NOT NULL,
  `image` varchar(100) COLLATE utf8_spanish_ci NOT NULL DEFAULT 'noImage.jpeg'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `rol`, `pass`, `image`) VALUES
(1, 'Maria', 'maria@test.com', 'Admin', '', '1655409421032.png'),
(7, 'Jose', 'jose@hotmail.com', 'Subscriber', '', '1655409627991.png'),
(8, 'Mateo', 'mateo@gmail.com', 'Admin', '', '1655409836422.png'),
(9, 'Santiago', 'santiago@gmail.com', 'Subscriber', '', '1655415867482.png'),
(10, 'Tadeo', 'tadeo@hotmail.com', 'Admin', '', '1655409887488.png'),
(11, 'Simón', 'simon@aol.com', 'Admin', '', ''),
(12, 'Juan', 'juan@msn.com', 'Admin', '', ''),
(13, 'Felipe', 'felipe@twitter.com', 'Admin', '', ''),
(14, 'Judas', 'judas@facebook.com', 'Admin', '', ''),
(15, 'Bernabé', 'bernabe@oracle.com', 'Admin', '', ''),
(21, 'Gustavo Arias', 'gustabin@yahoo.com', 'Admin', '$2a$10$Wx2tWZEHrBQ56DhawBeaz.eZvV7xTmsu1wVTXnvjAGN.G8rop7J0G', 'noImage.jpeg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;


CREATE TABLE empresas(
id_empresas INT (11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
ruc varchar(30) NOT NULL,
id_representante INT (05) NOT NULL,
nombre_empresa VARCHAR(50) NOT NULL,
numero_contacto INT(09) NOT NULL,
CONSTRAINT fk_repr FOREIGN KEY(id_representante) REFERENCES representante(id_representante)
)