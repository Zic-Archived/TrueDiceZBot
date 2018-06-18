-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Máy chủ: localhost:3306
-- Thời gian đã tạo: Th6 18, 2018 lúc 11:56 AM
-- Phiên bản máy phục vụ: 10.0.34-MariaDB-cll-lve
-- Phiên bản PHP: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `vnziccom_truedice`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `truedice_user`
--

CREATE TABLE `truedice_user` (
  `id` int(11) UNSIGNED NOT NULL,
  `account_id` text NOT NULL,
  `admin_id` int(6) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '0',
  `note` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `fb_addr` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `creation_date` int(10) NOT NULL,
  `last_modified_date` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Đang đổ dữ liệu cho bảng `truedice_user`
--

INSERT INTO `truedice_user` (`id`, `account_id`, `admin_id`, `active`, `note`, `fb_addr`, `creation_date`, `last_modified_date`) VALUES
(9, 'Nightraid142', 195, 1, '', 'https://www.facebook.com/152ME', 1529128218, 1529128218),
(11, 'baolhq1993', 195, 1, '', 'https://www.facebook.com/SpaceMarine4', 1529129219, 1529129219),
(16, 'hoangg', 195, 1, '', 'https://www.facebook.com/imHoangVu', 1529208277, 1529208277),
(17, 'peto', 195, 1, '', 'https://www.facebook.com/profile.php?id=100004417668759', 1529208304, 1529208304),
(19, 'leeryal', 195, 1, '', 'tdz404', 1529211758, 1529211758),
(20, 'daotung0806', 195, 1, '', 'tung beo', 1529212996, 1529212996),
(22, 'dovinh', 195, 1, '', '17/06 test 2 ngay', 1529216150, 1529216150),
(23, 'quocdice1', 195, 1, '', 'https://www.facebook.com/quocanhctv', 1529222831, 1529222831),
(24, 'nguyenduong86', 195, 1, '', '17/06 test 2 ngay', 1529223444, 1529223444),
(25, 'quanglinh36th', 195, 1, '', '17/06 test 2 ngay', 1529232780, 1529232780),
(27, 'vanthuongt9dry', 195, 1, '', '17/06 V.V', 1529241530, 1529241530),
(28, 'tailieudoanhnghiep', 195, 1, '', 'https://www.facebook.com/phamsonnamdirector', 1529250764, 1529250764),
(31, 'nhotran123', 195, 1, '', '17/06 VV', 1529255562, 1529255562),
(32, 'Manh0212', 195, 1, '', '18/06 test 2 ngay', 1529255580, 1529255580),
(34, 'thuantrinh', 195, 1, '', '18/06 test 2 ngay', 1529261541, 1529261541),
(40, 'tienkiem', 195, 1, '', 'tiếng việt', 1529296244, 1529296244),
(42, 'levantung', 195, 1, '', '18/06 test 2 ngay tung.unicore', 1529298309, 1529298309),
(43, 'hieuleuxuan', 195, 1, '', '18/06 test 2 ngay Hieu.IT.Dev', 1529306069, 1529306069),
(44, 'dovinh961999', 195, 1, '', '18/06 test 2 ngay 100026948943985', 1529318225, 1529318225),
(45, 'phucle1109', 195, 1, '', '18/06 test 2 ngay phucbun', 1529329456, 1529329456),
(46, 'thebaocrcr', 195, 1, '', 'https://www.facebook.com/baosaudoi.dinh', 1529331571, 1529331571);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `truedice_user`
--
ALTER TABLE `truedice_user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `truedice_user`
--
ALTER TABLE `truedice_user`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
