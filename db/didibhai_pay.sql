-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Feb 02, 2026 at 09:08 AM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `didibhai_pay`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin_users`
--

CREATE TABLE `admin_users` (
  `id` char(36) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `role` varchar(50) NOT NULL DEFAULT 'admin',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `admin_users`
--

INSERT INTO `admin_users` (`id`, `email`, `password_hash`, `role`, `created_at`) VALUES
('aa9eb1ce-6d01-4730-b90c-a289f14fb634', 'admin@didibhai.com', '$2b$10$/S14i1PSx3vju7MCxQn.7OnkMqMW9obDsN6tdYhPJpZ04TIgt7sGO', 'admin', '2026-01-30 12:08:17');

-- --------------------------------------------------------

--
-- Table structure for table `fees`
--

CREATE TABLE `fees` (
  `id` int NOT NULL,
  `name` varchar(50) NOT NULL,
  `fixed_fee` decimal(18,2) NOT NULL DEFAULT '0.00',
  `percent_fee` decimal(6,4) NOT NULL DEFAULT '0.0000',
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `fees`
--

INSERT INTO `fees` (`id`, `name`, `fixed_fee`, `percent_fee`, `updated_at`) VALUES
(1, 'default', 10.00, 5.0000, '2026-01-31 00:46:37');

-- --------------------------------------------------------

--
-- Table structure for table `fx_rates`
--

CREATE TABLE `fx_rates` (
  `id` int NOT NULL,
  `pair` varchar(20) NOT NULL,
  `rate` decimal(18,6) NOT NULL,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `fx_rates`
--

INSERT INTO `fx_rates` (`id`, `pair`, `rate`, `updated_at`) VALUES
(1, 'NPR-INR', 0.625000, '2026-01-29 09:13:45'),
(2, 'INR-NPR', 1.600000, '2026-01-29 09:13:45');

-- --------------------------------------------------------

--
-- Table structure for table `ledger_entries`
--

CREATE TABLE `ledger_entries` (
  `id` char(36) NOT NULL,
  `transaction_id` char(36) DEFAULT NULL,
  `entry_type` varchar(50) NOT NULL,
  `amount` decimal(18,2) NOT NULL,
  `currency` varchar(10) NOT NULL,
  `meta` json DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `id` char(36) NOT NULL,
  `transaction_id` char(36) DEFAULT NULL,
  `provider` varchar(50) NOT NULL,
  `provider_ref` varchar(255) DEFAULT NULL,
  `amount` decimal(18,2) NOT NULL,
  `currency` varchar(10) NOT NULL,
  `status` varchar(20) NOT NULL DEFAULT 'PENDING',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `payouts`
--

CREATE TABLE `payouts` (
  `id` char(36) NOT NULL,
  `transaction_id` char(36) DEFAULT NULL,
  `provider` varchar(50) NOT NULL,
  `provider_ref` varchar(255) DEFAULT NULL,
  `amount` decimal(18,2) NOT NULL,
  `currency` varchar(10) NOT NULL,
  `status` varchar(20) NOT NULL DEFAULT 'PENDING',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `id` char(36) NOT NULL,
  `direction` varchar(10) NOT NULL,
  `sender_user_id` char(36) DEFAULT NULL,
  `sender_details` json NOT NULL,
  `receiver_details` json NOT NULL,
  `amount` decimal(18,2) NOT NULL,
  `currency` varchar(10) NOT NULL,
  `exchange_rate` decimal(18,6) DEFAULT NULL,
  `fees_total` decimal(18,2) DEFAULT '0.00',
  `payout_amount` decimal(18,2) DEFAULT NULL,
  `status` varchar(20) NOT NULL DEFAULT 'INITIATED',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`id`, `direction`, `sender_user_id`, `sender_details`, `receiver_details`, `amount`, `currency`, `exchange_rate`, `fees_total`, `payout_amount`, `status`, `created_at`, `updated_at`) VALUES
('2a7dbfc1-13fd-43d5-8581-d12f04b4a8d1', 'IN-NP', 'seed-user-id', '{\"id\": \"seed-user-id\", \"name\": \"Test User\", \"email\": \"user@example.com\"}', '{\"name\": \"Roshan\", \"email\": \"surendrahzn786@gmail.com\", \"phone\": \"9819490778\", \"upiId\": \"9844632144\", \"ifscCode\": \"\", \"walletId\": \"\", \"payoutMethod\": \"upi\", \"accountNumber\": \"\"}', 1000.00, 'INR', 1.600000, 10.00, 1600.00, 'INITIATED', '2026-01-31 03:24:05', '2026-01-31 03:24:05'),
('6c10db8f-59c0-4be4-964a-14db6e9c1ca8', 'IN-NP', 'seed-user-id', '{\"id\": \"seed-user-id\", \"name\": \"Test User\", \"email\": \"user@example.com\", \"phone\": \"1234567890\"}', '{\"name\": \"sdf\", \"email\": \"surendrahzn786@gmail.com\", \"phone\": \"9819490778\", \"upiId\": \"9844632144\", \"ifscCode\": \"\", \"walletId\": \"\", \"payoutMethod\": \"upi\", \"accountNumber\": \"\"}', 10000.00, 'INR', 1.600000, 50010.00, 16000.00, 'INITIATED', '2026-01-31 01:11:09', '2026-01-31 01:11:09'),
('709d5959-1bc8-4e2e-a2ac-4f6218e537e2', 'IN-NP', 'c0ba5098-eba7-4cf9-baf6-6565adf38cc2', '{\"id\": \"c0ba5098-eba7-4cf9-baf6-6565adf38cc2\", \"name\": \"User Two\", \"email\": \"user2@example.com\"}', '{\"name\": \"Nepal Recipient\", \"phone\": \"9811111111\", \"walletId\": \"esewa123\", \"payoutMethod\": \"wallet\"}', 1000.00, 'INR', 1.600000, 10.00, 1584.00, 'INITIATED', '2026-01-29 09:25:54', '2026-01-29 09:25:54'),
('8f922126-8a85-4ae2-9d66-17f4a8b715b7', 'IN-NP', 'seed-user-id', '{\"id\": \"seed-user-id\", \"name\": \"Test User\", \"email\": \"user@example.com\", \"phone\": \"1234567890\"}', '{\"name\": \"sdf\", \"email\": \"surendrahzn786@gmail.com\", \"phone\": \"9819490778\", \"upiId\": \"\", \"ifscCode\": \"sd\", \"walletId\": \"\", \"payoutMethod\": \"bank\", \"accountNumber\": \"23\"}', 123321.00, 'INR', 1.600000, 1233220.00, -1775838.40, 'INITIATED', '2026-01-31 00:34:21', '2026-01-31 00:34:21'),
('aa5c3634-3008-46ce-b909-bba4bdc191db', 'IN-NP', 'seed-user-id', '{\"id\": \"seed-user-id\", \"name\": \"Test User\", \"email\": \"user@example.com\", \"phone\": \"1234567890\"}', '{\"name\": \"sdf\", \"email\": \"surendrahzn786@gmail.com\", \"phone\": \"9819490778\", \"upiId\": \"\", \"ifscCode\": \"sd\", \"walletId\": \"\", \"payoutMethod\": \"bank\", \"accountNumber\": \"23\"}', 123321.00, 'INR', 1.600000, 1233220.00, -1775838.40, 'INITIATED', '2026-01-31 00:34:21', '2026-01-31 00:34:21'),
('aca51f49-8742-40c0-9b70-4c98a1f80549', 'IN-NP', 'seed-user-id', '{\"id\": \"seed-user-id\", \"name\": \"Test User\", \"email\": \"user@example.com\", \"phone\": \"1234567890\"}', '{\"name\": \"Roshan\", \"email\": \"surendrahzn786@gmail.com\", \"phone\": \"9819490778\", \"upiId\": \"9844632144\", \"ifscCode\": \"\", \"walletId\": \"\", \"payoutMethod\": \"upi\", \"accountNumber\": \"\"}', 10000.00, 'INR', 1.600000, 50010.00, 16000.00, 'INITIATED', '2026-01-31 07:36:46', '2026-01-31 07:36:46'),
('b74610b8-41f9-4ace-a678-3926c9ed52dc', 'NP-IN', 'seed-user-id', '{\"id\": \"seed-user-id\", \"name\": \"Test User\", \"email\": \"user@example.com\", \"phone\": \"1234567890\"}', '{\"name\": \"Roshan\", \"email\": \"surendrahzn786@gmail.com\", \"phone\": \"9819490778\", \"upiId\": \"\", \"ifscCode\": \"\", \"walletId\": \"\", \"payoutMethod\": \"upi\", \"accountNumber\": \"\"}', 10000.00, 'NPR', 0.625000, 50010.00, 6250.00, 'INITIATED', '2026-01-31 07:39:20', '2026-01-31 07:39:20'),
('cbdfa5df-1098-49eb-a4a7-95630151999e', 'IN-NP', 'seed-user-id', '{\"id\": \"seed-user-id\", \"name\": \"Test User\", \"email\": \"user@example.com\", \"phone\": \"1234567890\"}', '{\"name\": \"sdf\", \"email\": \"surendrahzn786@gmail.com\", \"phone\": \"9819490778\", \"upiId\": \"9844632144\", \"ifscCode\": \"\", \"walletId\": \"\", \"payoutMethod\": \"upi\", \"accountNumber\": \"\"}', 10000.00, 'INR', 1.600000, 50010.00, 16000.00, 'INITIATED', '2026-01-31 01:08:43', '2026-01-31 01:08:43');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` char(36) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `country` varchar(50) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password_hash`, `phone`, `full_name`, `country`, `created_at`) VALUES
('3a167ead-0fbd-4d9b-8a9f-f48cf730d8f0', 'test@example.com', '$2y$10$D.xcsQ9N8i2/xaKf73sYF.sQp2f7ZvMzFDmrQJWBLlD9Au8P.BKUu', '9999999999', 'Test User', 'IN', '2026-01-29 09:24:49'),
('c0ba5098-eba7-4cf9-baf6-6565adf38cc2', 'user2@example.com', '$2b$10$8Nafr6OUzBG6FlXcc61BZO5tgOorcIePzoAR1s20ajsYfvXJYCjcC', '9888888888', 'User Two', 'NP', '2026-01-29 09:25:22'),
('ed906f51-4d04-46d8-944e-4601d85373f4', 'user_1769774986674@example.com', '$2b$10$USf1/D/AvLPxZnvQhIxns.LgGtmM0bclaVXG099Ft9EFZ0ZxNbsey', '9800000000', 'Test User', 'NP', '2026-01-30 12:09:46'),
('seed-user-id', 'user@example.com', '$2b$10$r4V6ZFMjLL4UH7bGOCwmkesZIH3FgVuR/OM33k/wyxuXYoIos.G4.', '1234567890', 'Test User', 'NP', '2026-01-30 22:35:41');

-- --------------------------------------------------------

--
-- Table structure for table `webhook_logs`
--

CREATE TABLE `webhook_logs` (
  `id` char(36) NOT NULL,
  `provider` varchar(50) NOT NULL,
  `event_type` varchar(100) DEFAULT NULL,
  `payload` json NOT NULL,
  `signature` varchar(512) DEFAULT NULL,
  `verified` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin_users`
--
ALTER TABLE `admin_users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `fees`
--
ALTER TABLE `fees`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `fx_rates`
--
ALTER TABLE `fx_rates`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `pair` (`pair`);

--
-- Indexes for table `ledger_entries`
--
ALTER TABLE `ledger_entries`
  ADD PRIMARY KEY (`id`),
  ADD KEY `transaction_id` (`transaction_id`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `transaction_id` (`transaction_id`);

--
-- Indexes for table `payouts`
--
ALTER TABLE `payouts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `transaction_id` (`transaction_id`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `webhook_logs`
--
ALTER TABLE `webhook_logs`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `fees`
--
ALTER TABLE `fees`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `fx_rates`
--
ALTER TABLE `fx_rates`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `ledger_entries`
--
ALTER TABLE `ledger_entries`
  ADD CONSTRAINT `ledger_entries_ibfk_1` FOREIGN KEY (`transaction_id`) REFERENCES `transactions` (`id`);

--
-- Constraints for table `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`transaction_id`) REFERENCES `transactions` (`id`);

--
-- Constraints for table `payouts`
--
ALTER TABLE `payouts`
  ADD CONSTRAINT `payouts_ibfk_1` FOREIGN KEY (`transaction_id`) REFERENCES `transactions` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
