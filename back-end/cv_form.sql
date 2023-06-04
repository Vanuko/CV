-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 04, 2023 at 06:42 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cv_form`
--

-- --------------------------------------------------------

--
-- Table structure for table `address_data`
--

CREATE TABLE `address_data` (
  `ID` int(11) NOT NULL,
  `ID_base_data` int(11) NOT NULL,
  `address_country` varchar(80) NOT NULL,
  `address_index` varchar(80) NOT NULL,
  `address_city` varchar(80) NOT NULL,
  `address_street` varchar(80) NOT NULL,
  `address_number` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_latvian_ci;

--
-- Dumping data for table `address_data`
--

INSERT INTO `address_data` (`ID`, `ID_base_data`, `address_country`, `address_index`, `address_city`, `address_street`, `address_number`) VALUES
(24, 22, 'Latvija', 'LV-3402', 'Rīga', 'Slazdu iela', '7a');

-- --------------------------------------------------------

--
-- Table structure for table `base_data`
--

CREATE TABLE `base_data` (
  `ID` int(11) NOT NULL,
  `name` varchar(60) NOT NULL,
  `surname` varchar(60) NOT NULL,
  `phone_nr` varchar(20) NOT NULL,
  `email` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_latvian_ci;

--
-- Dumping data for table `base_data`
--

INSERT INTO `base_data` (`ID`, `name`, `surname`, `phone_nr`, `email`) VALUES
(22, 'Toms', 'Sārmanis', '+371 29894623', 'toms.sārmanis@inbox.lv');

-- --------------------------------------------------------

--
-- Table structure for table `custom_data`
--

CREATE TABLE `custom_data` (
  `ID` int(11) NOT NULL,
  `ID_base_data` int(11) NOT NULL,
  `custom_name` varchar(80) NOT NULL,
  `custom_value` varchar(600) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_latvian_ci;

--
-- Dumping data for table `custom_data`
--

INSERT INTO `custom_data` (`ID`, `ID_base_data`, `custom_name`, `custom_value`) VALUES
(749, 22, 'Valodas Prasmes', 'Latviešu - Dzimtā\nAngļu - Runas\nKrievu - Runas\n');

-- --------------------------------------------------------

--
-- Table structure for table `education_data`
--

CREATE TABLE `education_data` (
  `ID` int(11) NOT NULL,
  `ID_base_data` int(11) NOT NULL,
  `education_institution` varchar(80) NOT NULL,
  `education_faculty` varchar(80) NOT NULL,
  `education_field_of_study` varchar(80) NOT NULL,
  `education_level` varchar(80) NOT NULL,
  `education_status` varchar(80) NOT NULL,
  `education_time_spent` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_latvian_ci;

--
-- Dumping data for table `education_data`
--

INSERT INTO `education_data` (`ID`, `ID_base_data`, `education_institution`, `education_faculty`, `education_field_of_study`, `education_level`, `education_status`, `education_time_spent`) VALUES
(30, 22, 'Pilsētas Skola', 'Skolas Fakultāte', 'Valoda un Kultūra', 'Pabeigts', 'Pamatizglītība', '07/09/2021 - 28/01/2022');

-- --------------------------------------------------------

--
-- Table structure for table `work_data`
--

CREATE TABLE `work_data` (
  `ID` int(11) NOT NULL,
  `ID_base_data` int(11) NOT NULL,
  `work_place` varchar(60) NOT NULL,
  `work_position` varchar(60) NOT NULL,
  `work_load` varchar(60) NOT NULL,
  `work_experience` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_latvian_ci;

--
-- Dumping data for table `work_data`
--

INSERT INTO `work_data` (`ID`, `ID_base_data`, `work_place`, `work_position`, `work_load`, `work_experience`) VALUES
(62, 22, 'McDonalds', 'Galvenais Cepējs', 'Pusslodze', '03/05/1995 - 31/03/2004'),
(63, 22, 'Spa Centrs', 'Masieris', 'Pilna laika', '17/11/2005 - 18/03/2011');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `address_data`
--
ALTER TABLE `address_data`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `base_data`
--
ALTER TABLE `base_data`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `custom_data`
--
ALTER TABLE `custom_data`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `education_data`
--
ALTER TABLE `education_data`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `work_data`
--
ALTER TABLE `work_data`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `address_data`
--
ALTER TABLE `address_data`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `base_data`
--
ALTER TABLE `base_data`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `custom_data`
--
ALTER TABLE `custom_data`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=750;

--
-- AUTO_INCREMENT for table `education_data`
--
ALTER TABLE `education_data`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `work_data`
--
ALTER TABLE `work_data`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
