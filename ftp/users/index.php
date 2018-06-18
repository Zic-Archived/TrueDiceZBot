<?php
header("Content-Type: application/json");
header('Access-Control-Allow-Origin: *');

require('connect.php');

if(isset($_GET["accountId"])) {
    $accounId = $_GET["accountId"];
    showUserInfo($conn, $accounId);
} else {
    showAllUsersInfo($conn);
}

$notFoundRespArr = array('message' => '404 User Not Found!');
returnResponse(404, $notFoundRespArr);

function showAllUsersInfo($conn) {
    $sql = "SELECT id, account_id, active, note, fb_addr, last_modified_date FROM truedice_user ORDER BY last_modified_date DESC";
    $stmt = $conn->query($sql);

    $userListRespArr = [];
    foreach ($stmt as $row) {
        $userObj = new stdClass();
        $userObj->userId = $row['id'];
        $userObj->accountId = $row['account_id'];
        $userObj->active = true ? $row['active'] == '1' : false;
        $userObj->note = $row['note'];
        $userObj->fbAddr = $row['fb_addr'];
        $userObj->lastModified = date('d/m/Y H:i:s', $row['last_modified_date']);

        $userListRespArr[] = $userObj;
    }

    if(count($userListRespArr) == 0) {
        return;
    } else {
        returnResponse(200, $userListRespArr);
    }
}

function showUserInfo($conn, $accounId) {
    $sql = "SELECT * FROM truedice_user WHERE account_id='$accounId'";
    $stmt = $conn->query($sql);

    while ($row = $stmt->fetch()) {

        $userRespArr = array('id' => $row['id'],
            'active' => true ? $row['active'] == '1' : false,
            'note' => $row['note'],
            'fbAddr' => $row['fb_addr'],
            'lastModified' => $row['last_modified_date']
        );

        returnResponse(200, $userRespArr);
    }
}

function returnResponse($respCode, $response) {
  http_response_code($respCode);
  echo json_encode($response, JSON_PRETTY_PRINT);
  die();
}