-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 23, 2026 at 07:22 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `skill_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `assigmments`
--

CREATE TABLE `assigmments` (
  `id` int(11) NOT NULL,
  `indicator_id` int(11) NOT NULL,
  `evaluator_id` int(11) NOT NULL,
  `type` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `assigmments`
--

INSERT INTO `assigmments` (`id`, `indicator_id`, `evaluator_id`, `type`, `created_at`) VALUES
(10, 30, 10, 'ร่วม', '2026-02-15 09:40:05');

-- --------------------------------------------------------

--
-- Table structure for table `attachments`
--

CREATE TABLE `attachments` (
  `id` int(11) NOT NULL,
  `evaluatee_id` int(11) NOT NULL,
  `period_id` int(11) NOT NULL,
  `indicator_id` int(11) NOT NULL,
  `file_name` varchar(255) NOT NULL,
  `storage_path` varchar(255) NOT NULL,
  `url_name` varchar(255) NOT NULL,
  `self_assessment_score` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `attachments`
--

INSERT INTO `attachments` (`id`, `evaluatee_id`, `period_id`, `indicator_id`, `file_name`, `storage_path`, `url_name`, `self_assessment_score`, `created_at`) VALUES
(13, 15, 24, 30, '016.png', 'C:\\projectPAO\\backend\\uploads\\misc\\1771466265711_016.png', '', '3', '2026-02-19 01:57:45');

-- --------------------------------------------------------

--
-- Table structure for table `departments`
--

CREATE TABLE `departments` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `departments`
--

INSERT INTO `departments` (`id`, `name`) VALUES
(1, 'เทคโนโลยีสารสนเทส'),
(2, 'เทคโนโลยีสารสนเทส2'),
(3, 'เทคโนโลยีสารสนเทส3');

-- --------------------------------------------------------

--
-- Table structure for table `evaluation_results`
--

CREATE TABLE `evaluation_results` (
  `id` int(11) NOT NULL,
  `period_id` int(11) NOT NULL,
  `evaluator_id` int(11) NOT NULL,
  `evaluatee_id` int(11) NOT NULL,
  `indicator_id` int(11) NOT NULL,
  `score` decimal(5,2) NOT NULL,
  `comment` varchar(255) NOT NULL,
  `signature_path` varchar(255) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `evaluation_topics`
--

CREATE TABLE `evaluation_topics` (
  `id` int(11) NOT NULL,
  `period_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `weight` decimal(5,2) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `evaluation_topics`
--

INSERT INTO `evaluation_topics` (`id`, `period_id`, `name`, `description`, `weight`, `status`, `created_at`) VALUES
(1, 1, 'การประเมินการเรียน', 'การสอนของครู', 5.00, 1, '2025-12-24 04:22:53'),
(3, 1, 'testtopic2', 'testdescription2', 3.50, 1, '2025-12-28 06:14:52');

-- --------------------------------------------------------

--
-- Table structure for table `evluation_periods`
--

CREATE TABLE `evluation_periods` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `year` int(50) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `create_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `evluation_periods`
--

INSERT INTO `evluation_periods` (`id`, `name`, `year`, `start_date`, `end_date`, `status`, `create_at`) VALUES
(23, '1/2569', 2569, '2026-02-05', '2026-02-05', 1, '2026-02-05 07:04:57'),
(24, 'test', 2569, '2026-02-15', '2026-02-15', 1, '2026-02-15 09:37:44');

-- --------------------------------------------------------

--
-- Table structure for table `indicators`
--

CREATE TABLE `indicators` (
  `id` int(11) NOT NULL,
  `period_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `type` enum('yes/no','score_1_4') NOT NULL,
  `assemble_file` varchar(255) DEFAULT NULL,
  `assemble_url` varchar(255) DEFAULT NULL,
  `weight` decimal(5,2) NOT NULL,
  `min_score` int(11) NOT NULL DEFAULT 1,
  `max_score` int(11) NOT NULL DEFAULT 4,
  `department_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `indicators`
--

INSERT INTO `indicators` (`id`, `period_id`, `name`, `description`, `type`, `assemble_file`, `assemble_url`, `weight`, `min_score`, `max_score`, `department_id`, `created_at`) VALUES
(30, 24, 'test', 'test', 'score_1_4', 'test/1771148393154_images__1_.jpg', 'https://www.google.com/', 4.00, 1, 4, 1, '2026-02-15 09:39:53');

-- --------------------------------------------------------

--
-- Table structure for table `org_groups`
--

CREATE TABLE `org_groups` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `org_groups`
--

INSERT INTO `org_groups` (`id`, `name`) VALUES
(1, 'ฝ่ายวิชการ');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL DEFAULT 'images.png',
  `role` enum('admin','evaluatee','evaluator') NOT NULL,
  `status` int(11) NOT NULL DEFAULT 0,
  `department_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  `create_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `image`, `role`, `status`, `department_id`, `group_id`, `create_at`) VALUES
(1, 'test71', 'Test71@gmail.com', '$2b$10$F.5BsJ/mT4WN4A2jzV2koujB9x1zVJIUMrA4bP.qF12PHbcOGFwPq', 'images.png', 'evaluator', 1, 3, 1, '2026-02-15 06:28:28'),
(2, 'test1', 'test1@gmail.com', '$2b$10$GSPew7tD1rCT6ULp9bfNq.g4ogmGDnkMPaZNc6uiw/sJpKrRdlNUe', 'images.png', 'evaluatee', 1, 1, 1, '2026-02-05 06:50:15'),
(6, 'Phukao', 'Phukao@gmail.com', '$2b$10$hhEeh0H23SzeSUI7xMFNPOxwnriaO7zTrSSLw/LpKKNvU9PPPP0Ai', 'images.png', 'admin', 1, 1, 1, '2026-02-05 06:50:19'),
(9, 'Admin', 'Admin@gmail.com', '$2b$10$x11UXyCCs45F/VKIEzIyO.ozjUhLWORFSRaQAAl5/Mk/KA5v8/k1S', 'images.png', 'admin', 1, 1, 1, '2026-02-15 06:27:29'),
(10, 'Nilawan', 'Nilawan@gmail.com', '$2b$10$nsZ4.F1G8Z/3cbw/2FHuKe6yZaC0G1vCiiYDJipb1X93P7TMHJCY2', 'images.png', 'evaluator', 1, 1, 1, '2026-02-05 06:50:25'),
(13, 'pipo', 'Pipo@gmail.com', '$2b$10$OctL/MsHKNVFNpN4NlQm4OLlbh7PAlLGj1IGe8Zq2vFJxMfpde/1.', 'images.png', 'admin', 1, 1, 1, '2026-02-05 07:02:14'),
(14, 'test67', 'Test67@gmail.com', '$2b$10$PNKhL/hKX7Wo4IUeNgFQfO4WmFLNBOjAjxT.DlD5Xt8fJkXUFR6Ku', 'images.png', 'evaluatee', 1, 1, 1, '2026-02-05 07:03:11'),
(15, 'Tarzan', 'Tarzan@gmail.com', '$2b$10$ntk2trWGDq77y3M4/yCq6uWmhGAQOzyhaUwF/jqr3lRveGaSZeP/m', 'images.png', 'evaluatee', 1, 1, 1, '2026-02-15 06:31:03'),
(16, 'testadd', 'Testadd@gmail.com', '$2b$10$qqUszun.zPwz3iWvoLiEwuQWIC9ebsub/gP7KOjRtYPcbkJ/xfMAi', 'images.png', 'evaluatee', 1, 1, 1, '2026-02-18 13:12:57');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `assigmments`
--
ALTER TABLE `assigmments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `attachments`
--
ALTER TABLE `attachments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `departments`
--
ALTER TABLE `departments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `evaluation_results`
--
ALTER TABLE `evaluation_results`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `evaluation_topics`
--
ALTER TABLE `evaluation_topics`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `evluation_periods`
--
ALTER TABLE `evluation_periods`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `indicators`
--
ALTER TABLE `indicators`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `org_groups`
--
ALTER TABLE `org_groups`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `assigmments`
--
ALTER TABLE `assigmments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `attachments`
--
ALTER TABLE `attachments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `departments`
--
ALTER TABLE `departments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `evaluation_results`
--
ALTER TABLE `evaluation_results`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `evaluation_topics`
--
ALTER TABLE `evaluation_topics`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `evluation_periods`
--
ALTER TABLE `evluation_periods`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `indicators`
--
ALTER TABLE `indicators`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `org_groups`
--
ALTER TABLE `org_groups`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
