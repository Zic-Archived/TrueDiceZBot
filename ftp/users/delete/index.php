<?php
header("Content-Type: application/json");
header('Access-Control-Allow-Origin: *');

require('../connect.php');

if(isset($_GET['accountId'])) {
    $accountId = $_GET['accountId'];
    deleteUser($conn, $accountId);
} else {
    $invalidRespArr = array(
        'message' => "Invalid Params!"
    );
    returnResponse(400, $invalidRespArr);
}

function deleteUser($conn, $accountId) {
    $sql = "DELETE FROM `truedice_user` WHERE `truedice_user`.`account_id` = ?";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$accountId]);
    $deleted = $stmt->rowCount();

    if ($deleted == 1) {
        $deletedRespArr = array('message' => 'Deleted!');
        returnResponse(200, $deletedRespArr);
    } else {
        $notFoundRespArr = array(
            'message' => "404 User Not Found!"
        );
        returnResponse(404, $notFoundRespArr);
    }
}

function returnResponse($respCode, $response) {
    http_response_code($respCode);
    echo json_encode($response, JSON_PRETTY_PRINT);
    die();
}