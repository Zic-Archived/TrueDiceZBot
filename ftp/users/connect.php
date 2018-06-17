<?php
$servername = "localhost";
$db = "vnziccom_truedice";
$user = "vnziccom_truedice";
$pass = "your_password";
$charset = "utf8mb4";

$dsn = "mysql:host=$servername;dbname=$db;charset=$charset";
try {
    $conn = new PDO($dsn, $user, $pass);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $conn->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
} catch (PDOException $e) {
    error_log("SQL failed: " . $e->getMessage());
    die();
}
?>