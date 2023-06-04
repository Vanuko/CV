-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 04, 2023 at 06:05 PM
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
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `base_data`
--
ALTER TABLE `base_data`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `custom_data`
--
ALTER TABLE `custom_data`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=748;

--
-- AUTO_INCREMENT for table `education_data`
--
ALTER TABLE `education_data`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `work_data`
--
ALTER TABLE `work_data`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
